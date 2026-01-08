import { Injectable } from '@nestjs/common';

import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';
import { TypeormRoomsRepository } from '@infra/database/typeorm/repositories/typeorm-rooms-repository';
import { UserNotFound } from '../users/errors/user-not-found';
import { RoomNotFound } from '../rooms/errors/room-not-found';
import { Chat } from '@app/entities/chat';
import { TypeormChatsRepository } from '@infra/database/typeorm/repositories/typeorm-chats-repository';

interface CreateChatRequest {
  message: string;
  user_id: string;
  room_id: number;
}

@Injectable()
export class CreateChat {
  constructor(
    private typeormUsersRepository: TypeormUsersRepository,
    private typeormRoomsRepository: TypeormRoomsRepository,
    private typeormChatsRepository: TypeormChatsRepository,
  ) { }

  async execute(request: CreateChatRequest): Promise<void> {
    const { message, user_id, room_id } = request;

    const user = await this.typeormUsersRepository.findById(user_id);

    if (!user) {
      throw new UserNotFound();
    }

    const room = await this.typeormRoomsRepository.findById(room_id);

    if (!room) {
      throw new RoomNotFound();
    }

    const chat = new Chat();

    chat.message = message;
    chat.user = user;
    chat.room = room;

    await this.typeormChatsRepository.create(chat);
  }
}
