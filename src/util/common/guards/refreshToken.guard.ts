import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor(private jwtService: JwtService) {
    super();
  }
  //리프레시 토큰에서 액세스 토큰을 확인한다.
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;

    if (authorization === undefined) {
      throw new HttpException('AccessToken not found', 401);
    }

    // const token = authorization.replace('Bearer ', '');
    //
    try {
      req.user = this.validateToken(req.cookies['RefreshToken']);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
    return true;
  }

  validateToken(token: string) {
    try {
      const result = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });
      console.log('validateToken verify result', result);
      return result;
    } catch (e) {
      console.log('validateToken error', e);
      switch (e.message) {
        case 'jwt must be provided': //토큰이 만료되서 빈값으로 오는 경우
          throw new HttpException(
            'refreshTokenGuard - refresh token is null',
            410,
          );

        case 'jwt expired':
          throw new HttpException(
            'refreshTokenGuard - refresh token expired',
            410,
          );
        //
        default:
          throw new HttpException(
            'refreshTokenGuard - other error : ' + e.message,
            410,
          );
      }
    }
  }
}
