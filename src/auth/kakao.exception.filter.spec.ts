import { KakaoExceptionFilter } from './kakao.exception.filter';

describe('AuthExceptionFilter', () => {
  it('should be defined', () => {
    expect(new KakaoExceptionFilter()).toBeDefined();
  });
});
