import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @ApiProperty({ example: "ali" })
  @IsOptional()
  @IsString()
  username?: string

  @ApiProperty({ example: "ali@gmail.com" })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiProperty({ example: "EAsgBZXDFB" })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password?: string

  @ApiProperty({ example: 'ADMIN' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role

  @ApiProperty({ example: "https://aszfb.com"})
  @IsOptional()
  @IsString()
  awatar_url: string
  
}
