import { IsString, IsNotEmpty, IsInt, IsUrl, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { SubscriptionType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
    @ApiProperty({example: "dfdsff"})
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({example: "qwe3"})
    @IsString()
    @IsNotEmpty()
    slug: string

    @ApiProperty({example: "dfghjh wefg"})
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({example: 2343})
    @IsNumber()
    @IsNotEmpty()
    release_year: number

    @ApiProperty({ example: 123 })
    @IsNotEmpty()
    @IsNumber()
    duration_minutes: number


    @ApiProperty({ example: "wertggfdsa"})
    @IsString()
    @IsNotEmpty()
    poster_url: string

    @ApiProperty({example: "free"})
    @IsEnum(SubscriptionType)
    @IsOptional()
    subscription_type?: SubscriptionType

    @ApiProperty({example: 0})
    @IsNumber()
    @IsOptional()
    view_count?: number

}
