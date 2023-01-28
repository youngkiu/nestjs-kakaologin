import { User } from '../users/users.entities';

export type JwtPayload = Pick<User, 'provider' | 'id' | 'username'>;
