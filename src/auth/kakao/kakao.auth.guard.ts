import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoAuthGuard extends AuthGuard('kakao') {}
