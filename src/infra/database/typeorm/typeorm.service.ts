import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class TypeOrmService implements OnModuleInit {
  private entityManager: EntityManager;

  constructor(private readonly entityManagerr: EntityManager) {}

  async onModuleInit() {
    this.entityManager = this.entityManagerr;
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('SIGINT', async () => {
      await app.close();
    });
  }

  getEntityManager(): EntityManager {
    return this.entityManager;
  }
}
