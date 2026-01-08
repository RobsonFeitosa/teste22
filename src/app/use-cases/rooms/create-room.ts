import { Injectable } from '@nestjs/common';

import { TypeormRoomsRepository } from '@infra/database/typeorm/repositories/typeorm-rooms-repository';
import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';
import { Room } from '@app/entities/room';
import { UserNotFound } from '../users/errors/user-not-found';

interface CreateRoomRequest {
  name: string;
  user_id: string;
}

@Injectable()
export class CreateRoom {
  constructor(
    private typeormUsersRepository: TypeormUsersRepository,
    private typeormRoomsRepository: TypeormRoomsRepository,
  ) {}

  async execute(request: CreateRoomRequest): Promise<Room> {
    const { name, user_id } = request;
    const user = await this.typeormUsersRepository.findById(user_id);

    if (!user) {
      throw new UserNotFound();
    }

    const room = new Room();

    room.name = name;
    room.user = user;

    const newRoom = await this.typeormRoomsRepository.create(room);
    return newRoom;
  }
}
