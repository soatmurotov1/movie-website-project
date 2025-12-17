import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: "ali" })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: "ali@gmail.com"})
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: "qWAEGESN" })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string

  @ApiProperty({ example: "USER"})
  @IsEnum(Role)
  @IsString()
  role: Role

  @ApiProperty({example: "https://afbdfb.com"})
  @IsString()
  @IsNotEmpty()
  awatar_url: string

}