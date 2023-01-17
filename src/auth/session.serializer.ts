import { PassportSerializer } from '@nestjs/passport';

export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.id);
  }

  deserializeUser(payload: any, done: (err: Error, user: any) => void): any {
    done(null, payload);
  }
}
