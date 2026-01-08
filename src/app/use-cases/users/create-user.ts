import { User } from '../../entities/user';
import { hash } from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';

import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';
import { randomUUID } from 'crypto';

interface CreateUserRequest {
  name: string;
  password: string;
  email: string;
}

@Injectable()
export class CreateUser {
  constructor(private typeormUsersRepository: TypeormUsersRepository) {}

  async execute(request: CreateUserRequest): Promise<void> {
    const { name, password, email } = request;
    const userCheck = await this.typeormUsersRepository.findByEmail(email);

    if (userCheck) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User();

    user.id = randomUUID();
    user.name = name;
    user.password = hashedPassword;
    user.email = email;

    await this.typeormUsersRepository.create(user);
  }
}
