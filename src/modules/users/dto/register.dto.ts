import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: "ali" })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: "ali@gmail.com"})
  @IsEmail()
  email: string

  @ApiProperty({ example: "qWAEGESN" })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string
}