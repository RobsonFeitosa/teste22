import { Injectable } from '@nestjs/common';
import { TypeOrmService } from '../typeorm.service';
import { ChatsRepository } from '@app/repositories/chats-repository';
import { Chat } from '@app/entities/chat';

@Injectable()
export class TypeormChatsRepository implements ChatsRepository {
  constructor(private typeorm: TypeOrmService) {}

  async create(chat: Omit<Chat, 'id'>): Promise<void> {
    this.typeorm.getEntityManager().save(chat);
  }

  async findById(id: number): Promise<Chat | null> {
    return this.typeorm.getEntityManager().findOne(Chat, {
      where: {
        id,
      },
    });
  }

  async findByRoomId(room_id: number): Promise<Chat[]> {
    return this.typeorm.getEntityManager().find(Chat, {
      where: {
        room: {
          id: room_id,
        },
      },
      relations: ['room', 'user'],
    });
  }
}
