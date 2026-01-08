import { Injectable } from '@nestjs/common';
import { TypeormChatsRepository } from '@infra/database/typeorm/repositories/typeorm-chats-repository';
import { Chat } from '@app/entities/chat';

@Injectable()
export class IndexByRoomChat {
  constructor(private typeormChatsRepository: TypeormChatsRepository) {}

  async execute(room_id: number): Promise<Chat[]> {
    const chats = await this.typeormChatsRepository.findByRoomId(room_id);

    return chats;
  }
}
