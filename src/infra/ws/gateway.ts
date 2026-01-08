import { CreateChat } from '@app/use-cases/chats/create-chat';
import { Logger, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateRoom } from '@app/use-cases/rooms/create-room';
import { EntityTypeEnum } from '@infra/enum/entity-type';
import { Room } from '@app/entities/room';

interface ChatBody {
  msg: string;
  user: {
    id: string;
    name: string;
  };
  room_id: number;
}

interface RoomBody {
  id: number;
  name: string;
}

interface Message {
  type: EntityTypeEnum;
  user_id: string;
  chat_body: ChatBody;
  room_body: RoomBody;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private createChat: CreateChat,
    private createRoom: CreateRoom,
  ) {}

  onModuleInit() {
    this.server.on('connection', (socket) => this.handleConnection(socket));
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: Message) {
    try {
      await this.handleNewMessage(body);
    } catch (error: any) {
      this.logger.error(`Error processing new message: ${error.message}`);
    }
  }

  private async handleConnection(socket: Socket) {
    this.logger.log(`Client connected: ${socket.id}`);
  }

  private async handleNewMessage(message: Message) {
    this.logger.log(`Received new message from user ${message.user_id}`);

    switch (message.type) {
      case EntityTypeEnum.CHAT:
        await this.saveChat(message.chat_body);
        break;
      case EntityTypeEnum.ROOM:
        const room = await this.saveRoom(message.room_body, message.user_id);

        message.room_body.id = room.id;
        break;
      default:
        this.logger.warn('Unknown entity type');
        break;
    }

    this.server.emit('onMessage', {
      msg: 'New Message',
      content: message,
    });
  }

  private async saveChat(message: ChatBody) {
    await this.createChat.execute({
      message: message.msg,
      room_id: message.room_id,
      user_id: message.user.id,
    });

    this.logger.log('Chat message saved successfully');
  }

  private async saveRoom(message: RoomBody, user_id: string): Promise<Room> {
    const room = await this.createRoom.execute({
      name: message.name,
      user_id,
    });

    this.logger.log('Room message saved successfully');

    return room;
  }
}
