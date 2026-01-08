import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controllers/users.controller';
import { CreateUser } from '@app/use-cases/users/create-user';
import { AuthLogin } from '@app/use-cases/users/auth-login';
import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from '@app/guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateRoom } from '@app/use-cases/rooms/create-room';
import { RoomController } from './controllers/room.controller';
import { ChatController } from './controllers/chat.controller';
import { CreateChat } from '@app/use-cases/chats/create-chat';
import { IndexRoom } from '@app/use-cases/rooms/index-room';
import { IndexByRoomChat } from '@app/use-cases/chats/index-by-room-chat';

@Module({
  imports: [DatabaseModule],
  controllers: [
    UsersController,
    AuthController,
    RoomController,
    ChatController,
  ],
  providers: [
    CreateUser,
    AuthLogin,
    JwtService,
    AuthGuard,
    CreateRoom,
    IndexRoom,
    CreateChat,
    IndexByRoomChat,
  ],
})
export class HttpModule {}
