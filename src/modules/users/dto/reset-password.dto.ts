
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: "alijon@gmail.com" })
  @IsEmail()
  email: string
}