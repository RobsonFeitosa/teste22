import { AuthGuard } from '@app/guards/local-auth.guard';
import { CreateRoom } from '@app/use-cases/rooms/create-room';
import { IndexRoom } from '@app/use-cases/rooms/index-room';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { CreateRoomBody } from '../dtos/create-room-body';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly createRoom: CreateRoom,
    private readonly indexRoom: IndexRoom,
  ) { }

  @Post('/')
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateRoomBody, @Request() req) {
    const { name } = body;

    const user_id = req.user.sub;

    return await this.createRoom.execute({ name, user_id });
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll() {
    return await this.indexRoom.execute();
  }
}
