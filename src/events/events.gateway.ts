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

  users = [];

  afterInit() {
    this.logger.debug('init');
  }
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.debug(
      `client(${socket.id}) connected on namespace(${socket.nsp.name})`,
    );
    this.users.push(socket.id);
    this.server.emit('users', { numOfUsers: this.users.length });
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.debug(
      `client(${socket.id}) disconnected on namespace(${socket.nsp.name})`,
    );
    this.users = this.users.filter((val) => val !== socket.id);
    this.server.emit('users', { numOfUsers: this.users.length });
  }

  @SubscribeMessage('chat')
  async onChat(@MessageBody() message: string) {
    this.logger.debug(message);
    this.server.emit('chat', message);
  }
}
