import { IsNotEmpty } from 'class-validator';

export class CreateChatBody {
  @IsNotEmpty()
  message: string;
  room_id: number;
}
