import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.id);
  }

  deserializeUser(payload: any, done: (err: Error, user: any) => void): any {
    done(null, payload);
  }
}
