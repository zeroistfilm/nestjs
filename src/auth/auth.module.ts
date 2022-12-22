import { Module } from '@nestjs/common';
import { AuthService } from './application/service/auth.service';
import { AuthController } from './adapter/in/web/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
