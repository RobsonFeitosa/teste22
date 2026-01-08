import { Chat } from '@app/entities/chat';

export abstract class ChatsRepository {
  abstract create(room: Chat): Promise<void>;
  abstract findById(id: number): Promise<Chat | null>;
  abstract findByRoomId(room_id: number): Promise<Chat[] | null>;
}
