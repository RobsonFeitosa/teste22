import { Injectable } from '@nestjs/common';
import { TypeormRoomsRepository } from '@infra/database/typeorm/repositories/typeorm-rooms-repository';
import { Room } from '@app/entities/room';

@Injectable()
export class IndexRoom {
  constructor(private typeormRoomsRepository: TypeormRoomsRepository) {}

  async execute(): Promise<Room[]> {
    const rooms = await this.typeormRoomsRepository.findAll();

    return rooms;
  }
}
