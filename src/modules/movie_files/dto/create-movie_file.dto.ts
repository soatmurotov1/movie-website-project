import { ApiProperty } from "@nestjs/swagger";
import { Quality } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateMovieFileDto {
  @ApiProperty({ example: "uuid-movie-id" })
  @IsUUID()
  @IsNotEmpty()
  movieId: string;

  @ApiProperty({ enum: Quality, example: "p1080" })
  @IsEnum(Quality)
  quality: Quality

  @ApiProperty({ example: "uz" })
  @IsString()
  @IsNotEmpty()
  language: string;
}
