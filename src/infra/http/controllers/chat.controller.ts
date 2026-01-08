import { AuthGuard } from '@app/guards/local-auth.guard';
import { CreateChat } from '@app/use-cases/chats/create-chat';
import { IndexByRoomChat } from '@app/use-cases/chats/index-by-room-chat';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { CreateChatBody } from '../dtos/create-chat-body';

@Controller('chats')
export class ChatController {
  constructor(
    private readonly createChat: CreateChat,
    private readonly indexByRoomChat: IndexByRoomChat,
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('/')
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateChatBody, @Request() req) {
    const { message, room_id } = body;

    const user_id = req.user.sub;

    await this.createChat.execute({ message, user_id, room_id });
  }

  @Get('/room/:roomId')
  @UseGuards(AuthGuard)
  async getAllByRoomId(@Param('roomId') roomId: number) {
    return await this.indexByRoomChat.execute(roomId);
  }
}
