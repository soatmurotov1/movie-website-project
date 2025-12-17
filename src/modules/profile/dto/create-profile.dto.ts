import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsPhoneNumber } from 'class-validator';

export class CreateProfileDto {
    @ApiProperty({example: "wert-qwer-qwert-awdfg"})
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    userId: string


    @ApiProperty({example: "ozod"})
    @IsString()
    @IsNotEmpty()
    full_name: string
    
    @ApiProperty({example: "23454321"})
    @IsString()
    @IsNotEmpty()
    phone: string
    
    @ApiProperty({example: "uzbekistan"})
    @IsString()
    @IsNotEmpty()
    country: string
    
}
