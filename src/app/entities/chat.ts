import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Room } from './room';
import { User } from './user';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  message: string;

  @ManyToOne('Room', 'chats')
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne('User', 'chats')
  @JoinColumn({ name: 'user_id' })
  user: User;
}
