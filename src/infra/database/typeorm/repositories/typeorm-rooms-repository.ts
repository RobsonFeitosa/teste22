import { Injectable } from '@nestjs/common';
import { TypeOrmService } from '../typeorm.service';
import { RoomsRepository } from '@app/repositories/rooms-repository';
import { Room } from '@app/entities/room';

@Injectable()
export class TypeormRoomsRepository implements RoomsRepository {
  constructor(private typeorm: TypeOrmService) {}

  async create(room: Room): Promise<Room> {
    return this.typeorm.getEntityManager().save(room);
  }

  async findById(id: number): Promise<Room | null> {
    return this.typeorm.getEntityManager().findOne(Room, {
      where: {
        id,
      },
    });
  }

  async findByUser(user_id: string): Promise<Room[]> {
    return this.typeorm.getEntityManager().find(Room, {
      where: {
        user: {
          id: user_id,
        },
      },
    });
  }

  async findAll(): Promise<Room[]> {
    return this.typeorm.getEntityManager().find(Room);
  }
}
