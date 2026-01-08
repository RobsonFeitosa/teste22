import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';
import { Chat } from './chat';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne('User', 'rooms')
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany('Chat', 'room')
  chats: Chat[];
}
