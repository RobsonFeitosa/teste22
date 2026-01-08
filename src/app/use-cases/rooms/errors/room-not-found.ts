import { NotFoundException } from '@nestjs/common';

export class RoomNotFound extends NotFoundException {
  constructor() {
    super('Room does not exist in the database');
  }
}
