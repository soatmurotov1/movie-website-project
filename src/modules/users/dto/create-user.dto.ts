import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: "ali" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "ali@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "awegqerbg" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "USER", required: false })
  @IsOptional()
  @IsString()
  role?: string

  @ApiProperty({ example: "https://avatar.png", required: false })
  @IsOptional()
  @IsString()
  awatar_url?: string 
}
