import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isString, IsString, IsUUID } from "class-validator";

export class CreateMovieCategoryDto {
    @ApiProperty({example: "avsdfb-awvarv-awevg-azv"})
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    movieId: string

    @ApiProperty({example: "sdfgd-fsdgxz-awvszdf-zbvaerv"})
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    categoryId: string

}
