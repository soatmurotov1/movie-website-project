import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateFavoriteDto {
    @ApiProperty({ example: "wertyh-awergseg-aewrgbsdf"})
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    userId: string

    @ApiProperty({ example: "wert-wert-agerhs-aerhgsrg"})
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    movieId: string

}
