import { ApiProperty } from "@nestjs/swagger";
import { Quality } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateMovieFileDto {
  @ApiProperty({ example: "warestymn-AWZRDTN-awrzhbnxfgg-awzrb" })
  @IsUUID()
  @IsNotEmpty()
  movieId: string

  @ApiProperty({ enum: Quality })
  @IsEnum(Quality)
  quality: Quality

  @ApiProperty({ example: "uz" })
  @IsString()
  @IsNotEmpty()
  language: string

  @ApiProperty({ type: "string", format: "binary" })
  file: any
}
