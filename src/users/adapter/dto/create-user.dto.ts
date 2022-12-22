import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ description: 'Login시 사용' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsString()
  password: string;

  @IsOptional()
  refreshToken?: string;

  @IsOptional()
  accessToken?: string;

  @IsOptional()
  userType?: string;

  @IsOptional()
  status?: string;
}
