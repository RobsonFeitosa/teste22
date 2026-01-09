import { Module } from '@nestjs/common';
import { TypeormUsersRepository } from './typeorm/repositories/typeorm-users-repository';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './typeorm/typeorm.service';
import { TypeormRoomsRepository } from './typeorm/repositories/typeorm-rooms-repository';
import { TypeormChatsRepository } from './typeorm/repositories/typeorm-chats-repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_POSTGRES_HOST || 'localhost',
        port: Number(process.env.DB_POSTGRES_PORT) || 5432,
        username: process.env.DB_POSTGRES_USERNAME || 'postgres',
        password: process.env.DB_POSTGRES_PASSWORD || 'fcac41078f2abd6c272b8601a8511f0c',
        database: process.env.DB_POSTGRES_DATABASE || 'bp-nexus',
        entities: [__dirname + '/../../app/entities/*{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
      }),
    }),
  ],
  providers: [
    TypeOrmService,
    TypeormUsersRepository,
    TypeormRoomsRepository,
    TypeormChatsRepository,
  ],
  exports: [
    TypeOrmService,
    TypeormUsersRepository,
    TypeormRoomsRepository,
    TypeormChatsRepository,
  ],
})
export class DatabaseModule { }
