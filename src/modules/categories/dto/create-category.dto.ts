import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsTaxId } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: "qasoskorlar"})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({example: "qasos1"})
    @IsString()
    @IsNotEmpty()
    slug: string

    @ApiProperty({ example:  "jangari, qo'rqinchli"})
    @IsString()
    @IsNotEmpty()
    description: string

}
