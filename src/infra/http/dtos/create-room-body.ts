import { IsNotEmpty } from 'class-validator';

export class CreateRoomBody {
  @IsNotEmpty()
  name: string;
}
