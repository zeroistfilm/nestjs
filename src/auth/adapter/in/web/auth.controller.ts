import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/util/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/util/common/guards/refreshToken.guard';
import { CreateUserDto } from 'src/users/adapter/dto/create-user.dto';
import { AuthService } from '../../../application/service/auth.service';
import { AuthDto } from '../../dto/auth.dto';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import * as argon2 from 'argon2';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '가입' })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() Response): Promise<any> {
    const tokens = await this.authService.signUp(createUserDto);
    const cookie = this.authService.getCookieWithJwtRefreshToken(tokens.refreshToken);

    //TODO: cookie 설정 간단하게  리펙터링 하기
    Response.cookie('RefreshToken', cookie, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_SECONDS) * 1000,
    });
    return Response.send({ accessToken: tokens.accessToken });
  }

  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  async signin(@Body() data: AuthDto, @Res() Response) {
    const tokens = await this.authService.signIn(data);
    const cookie = this.authService.getCookieWithJwtRefreshToken(tokens.refreshToken);
    Response.cookie('RefreshToken', cookie, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_SECONDS) * 1000,
    });
    return Response.status(200).send({ accessToken: tokens.accessToken });
  }

  @ApiOperation({ summary: '(AccessToken) 유저 인증 여부' })
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessTokenGuard)
  @Get('isAuthenticated')
  async isAuth(@Req() req: Request) {
    const hasRefreshToken = await this.authService.hasRefreshToken(req.user['sub']);
    if (!hasRefreshToken) {
      throw new UnauthorizedException('User is not authenticated');
    }
    const userId = req.user['sub'];
    return `${userId} you are authenticated`;
  }

  @ApiOperation({ summary: '(AccessToken) 로그아웃' })
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: Request, @Res() Response) {
    const hasRefreshToken = await this.authService.hasRefreshToken(req.user['sub']);
    if (!hasRefreshToken) {
      throw new UnauthorizedException('User is not authenticated');
    }
    await this.authService.logout(req.user['sub']);
    Response.cookie('RefreshToken', '', { maxAge: 0 });
    return Response.send({ message: 'Logout success' });
  }

  @ApiOperation({ summary: '(RefreshToken) AccessToken 재발급' })
  @ApiForbiddenResponse({ description: 'RefreshToken 만료 및 오류' })
  @ApiOkResponse({ description: 'AccessToken 재발급' })
  @ApiBearerAuth('accessToken')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request, @Res() Response) {
    const userId = req.user['sub'];
    const refreshToken = req.cookies['RefreshToken'];
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    const tokens = await this.authService.refreshTokens(userId, accessToken, refreshToken);
    const cookie = this.authService.getCookieWithJwtRefreshToken(tokens.refreshToken);

    Response.cookie('RefreshToken', cookie, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_SECONDS) * 1000,
    });
    return Response.send({ accessToken: tokens.accessToken });
  }

  @Get('passwordtest')
  async get() {
    const inputPassword = '$2a$10$STZsLN64.jjDD4s2BWMuY.L/V1c2o83SHkzuK4UnKx3P/XUKAog8i';
    const hashed = await argon2.hash(inputPassword);
    console.log(hashed);
    const passwordMatches = await argon2.verify(hashed, inputPassword);
    console.log(passwordMatches);
  }
}
