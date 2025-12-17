import { ApiProperty } from "@nestjs/swagger";
import { Quality } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateMovieFileDto {
    @ApiProperty({example: "sdfgfd-dfgfdcx-zdfbdbz-zdfb"})
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    movieId: string

    @ApiProperty({example: "file_url"})
    @IsString()
    @IsNotEmpty()
    file_url: string

    @ApiProperty({example: "p1080"})
    @IsEnum(Quality)
    @IsString()
    quality: Quality

    @ApiProperty({ example: "uz"})
    @IsString()
    @IsNotEmpty()
    language: string

}
