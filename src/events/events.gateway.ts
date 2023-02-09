import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer() public server: Server;

  onlineMap = {};

  afterInit() {
    this.logger.debug('init');
  }
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.debug(
      `client(${socket.id}) connected on namespace(${socket.nsp.name})`,
    );
    if (!this.onlineMap[socket.nsp.name]) {
      this.onlineMap[socket.nsp.name] = {};
    }
    this.onlineMap[socket.nsp.name][socket.id] = '';
    this.server.emit(
      'onlineList',
      Object.values(this.onlineMap[socket.nsp.name]),
    );
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.debug(
      `client(${socket.id}) disconnected on namespace(${socket.nsp.name})`,
    );
    delete this.onlineMap[socket.nsp.name][socket.id];
    this.server.emit(
      'onlineList',
      Object.values(this.onlineMap[socket.nsp.name]),
    );
  }

  @SubscribeMessage('login')
  handleLogin(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    const newNamespace = socket.nsp;
    this.logger.debug(`login, ${socket.nsp.name}`);
    this.onlineMap[socket.nsp.name][socket.id] = data;
    newNamespace.emit(
      'onlineList',
      Object.values(this.onlineMap[socket.nsp.name]),
    );

    const channel = 'all';
    this.logger.debug(`join, ${socket.nsp.name}, ${channel}`);
    socket.join(`${socket.nsp.name}-${channel}`);
  }

  @SubscribeMessage('chat')
  async onChat(@MessageBody() message: string) {
    this.logger.debug(message);
    this.server.emit('chat', message);
  }
}
