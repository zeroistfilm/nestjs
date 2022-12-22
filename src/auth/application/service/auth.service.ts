import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/adapter/dto/create-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../../adapter/dto/auth.dto';
import { User, UserStatus } from "../../../users/domain/user.domain";
import { UserService } from '../../../users/application/service/user.service';
import { IAuthService } from '../port/in/IAuthService';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.usersService.findOneByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const hash = await this.hashData(createUserDto.password);
    try {
      const newUser: User = await this.usersService.create({ ...createUserDto, password: hash });
      const tokens = await this.getTokens(newUser.uuid, newUser.email, newUser.userType);
      await this.updateTokens(newUser.uuid, tokens.accessToken, tokens.refreshToken);
      return tokens;
    } catch (e) {
      throw new BadRequestException('User create failed', e.message);
    }
  }

  async signIn(data: AuthDto) {
    const user: User = await this.usersService.findOneByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    if (user.status == UserStatus.BLOCKED) {
      throw new ForbiddenException('User is blocked');
    }
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches) throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.uuid, user.email, user.userType);
    await this.updateTokens(user.uuid, tokens.accessToken, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    return await this.usersService.update(userId, { accessToken: null, refreshToken: null });
  }

  async refreshTokens(userUUID: string, accessToken: string, refreshToken: string) {
    const user = await this.usersService.findById(userUUID);
    if (!user || !user.refreshToken || !user.accessToken) {
      throw new ForbiddenException('Access Denied - User not found or No refresh token, please login again');
    }

    const accessTokenMatches = await argon2.verify(user.accessToken, accessToken);
    const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);

    if (!accessTokenMatches) {
      throw new ForbiddenException('Access Denied - accessToken mismatch');
    }
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied - refreshToken mismatch');
    }
    const tokens = await this.getTokens(user.uuid, user.email, user.userType);
    await this.updateTokens(user.uuid, tokens.accessToken, tokens.refreshToken);
    return tokens;
  }

  async hasRefreshToken(UUID: string) {
    const user = await this.usersService.findById(UUID);
    return !!user.refreshToken;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateTokens(uuid: string, accessToken: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    const hashedAccessToken = await this.hashData(accessToken);
    await this.usersService.update(uuid, {
      refreshToken: hashedRefreshToken,
      accessToken: hashedAccessToken,
    });
  }

  async getTokens(userId: string, email: string, userType: string) {
    const payload = { sub: userId, email, userType };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: `${+process.env.JWT_ACCESS_TOKEN_EXPIRATION_SECONDS}s`,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: `${+process.env.JWT_REFRESH_TOKEN_EXPIRATION_SECONDS}s`,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  getCookieWithJwtRefreshToken(token: string) {
    return token;
  }
}
