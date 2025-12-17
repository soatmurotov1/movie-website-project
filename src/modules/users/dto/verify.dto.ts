
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyDto {
  @ApiProperty({ example: "ali@gmail.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: "542224" })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string
}

