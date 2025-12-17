import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @ApiProperty({ example: "ali", required: false })
  @IsOptional()
  @IsString()
  username?: string

  @ApiProperty({ example: "ali@gmail.com", required: false })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiProperty({ example: "EAsgBZXDFB", required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password?: string

  @ApiProperty({ example: 'ADMIN', required: false })
  @IsOptional()
  @IsEnum(Role)
  role?: Role

  
}
