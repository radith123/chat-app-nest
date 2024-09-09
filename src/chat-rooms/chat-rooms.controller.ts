import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  Version,
} from "@nestjs/common";
import { ChatRoomsService } from "./chat-rooms.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { ObjectIdPipe } from "src/utils/pipes/object-id.pipe";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateChatRoomDto } from "./dto/create-chat-room.dto";

@ApiTags("Chat Room")
@ApiBearerAuth('jwt')
@Controller("chat-rooms")
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) { }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Get all chat rooms",
  })
  @Version("1")
  @Get()
  async findAll() {
    return await this.chatRoomsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Get chat room by id",
  })
  @Version("1")
  @ApiParam({
    name: "id",
    required: true,
    type: "string",
    example: "64fcb26814862ce1d787958a",
  })
  @Get(":id")
  async findOne(@Param("id", ObjectIdPipe) id: ObjectId) {
    const result = await this.chatRoomsService.findOneById(id);
    if (!result) {
      throw new NotFoundException("Chat Room not found");
    }
    return result;
  }

  @ApiOperation({
    summary: 'Add Chat Room',
    description: 'Create new Chat Room',
  })
  @Version('1')
  @Post('new')
  async register(@Body() dto: CreateChatRoomDto) {
    return await this.chatRoomsService.create(dto);
  }
}
