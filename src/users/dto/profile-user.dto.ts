import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class ProfileUserDto {
    @ApiProperty({
        required: true,
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    _id: ObjectId;

    @ApiProperty({
        required: true,
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    occupation: string;
}