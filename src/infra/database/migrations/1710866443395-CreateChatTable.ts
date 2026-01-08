import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChatTable1710866443395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chat',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'message',
            type: 'text',
          },
          {
            name: 'room_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['room_id'],
            referencedTableName: 'room',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chat');
  }
}
