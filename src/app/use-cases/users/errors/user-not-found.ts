import { NotFoundException } from '@nestjs/common';

export class UserNotFound extends NotFoundException {
  constructor() {
    super('User does not exist in the database');
  }
}
