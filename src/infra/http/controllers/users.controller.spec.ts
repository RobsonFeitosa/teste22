import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUser } from '@app/use-cases/users/create-user';

describe('UsersController', () => {
    let usersController: UsersController;
    let createUser: CreateUser;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: CreateUser,
                    useValue: {
                        execute: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        }).compile();

        usersController = app.get<UsersController>(UsersController);
        createUser = app.get<CreateUser>(CreateUser);
    });

    it('should be defined', () => {
        expect(usersController).toBeDefined();
    });

    describe('create', () => {
        it('should call createUser.execute with correct parameters', async () => {
            const body = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            };

            await usersController.create(body);

            expect(createUser.execute).toHaveBeenCalledWith(body);
        });
    });
});
