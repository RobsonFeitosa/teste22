import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway';
import { CreateChat } from '@app/use-cases/chats/create-chat';
import { TypeOrmService } from '@infra/database/typeorm/typeorm.service';
import { TypeormChatsRepository } from '@infra/database/typeorm/repositories/typeorm-chats-repository';
import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';
import { TypeormRoomsRepository } from '@infra/database/typeorm/repositories/typeorm-rooms-repository';
import { CreateRoom } from '@app/use-cases/rooms/create-room';

@Module({
  providers: [
    ChatGateway,
    TypeOrmService,
    TypeormChatsRepository,
    TypeormUsersRepository,
    TypeormRoomsRepository,
    CreateChat,
    CreateRoom,
  ],
})
export class GatewayModule {}
