
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: "ali" })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: "erfgnxgfn" })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string
}
