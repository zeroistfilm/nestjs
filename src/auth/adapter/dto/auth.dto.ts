import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsEmail()
  @ApiProperty({
    default: 'tpx1@tpxlab.com',
    description: 'Require Email format',
  })
  email: string;

  @ApiProperty({ default: 'tpx1', description: 'Require String format' })
  @IsString()
  password: string;
}
