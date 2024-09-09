import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ProfileUserDto } from './dto/profile-user.dto';
import { ObjectIdPipe } from 'src/utils/pipes/object-id.pipe';
import { ObjectId } from 'mongoose';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) { }

    @ApiOperation({
        summary: 'Update User',
        description: 'API update data user',
    })
    @Version('1')
    @Post('profile')
    async update(@Body() dto: ProfileUserDto) {
        return await this.userService.update(dto);
    }

    @ApiOperation({
        summary: 'Register',
        description: 'Create new User',
    })
    @Version('1')
    @ApiParam({
        name: "id",
        required: true,
        type: "string",
        example: "64fcb26814862ce1d787958a",
    })
    @Get(":id")
    async get(@Param("id", ObjectIdPipe) id: ObjectId) {
        return await this.userService.findOneById(id);
    }
}
