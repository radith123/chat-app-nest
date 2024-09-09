import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatRoomDto {
  @ApiProperty({
    required: true,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
