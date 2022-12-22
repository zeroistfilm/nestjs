import { CreateUserDto } from '../../../../users/adapter/dto/create-user.dto';
import { AuthDto } from '../../../adapter/dto/auth.dto';

export interface IAuthService {
  signUp(createUserDto: CreateUserDto): Promise<any>;

  signIn(data: AuthDto);

  logout(userId: string);

  refreshTokens(userUUID: string, accessToken: string, refreshToken: string);

  hasRefreshToken(UUID: string);

  hashData(data: string);

  updateTokens(uuid: string, accessToken: string, refreshToken: string);

  getTokens(userId: string, email: string, userType: string);

  getCookieWithJwtRefreshToken(token: string);
}
