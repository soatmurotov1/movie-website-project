import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: "ali@gmail.com" })
  @IsEmail()
  email: string

  @ApiProperty({ example: "12345" })
  @IsString()
  @Length(6, 6)
  otp: string

  @ApiProperty({ example: "ezrbxttn" })
  @IsString()
  @MinLength(6)
  new_password: string
}
