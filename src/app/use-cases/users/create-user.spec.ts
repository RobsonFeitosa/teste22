import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';
import { CreateUser } from './create-user';
import { ConflictException } from '@nestjs/common';
import { User } from '../../entities/user';

describe('CreateUser', () => {
    let createUser: CreateUser;
    let usersRepository: jest.Mocked<TypeormUsersRepository>;

    beforeEach(() => {
        usersRepository = {
            findByEmail: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
        } as any;
        createUser = new CreateUser(usersRepository);
    });

    it('should be able to create a new user', async () => {
        usersRepository.findByEmail.mockResolvedValue(null);
        usersRepository.create.mockResolvedValue(undefined);

        await expect(
            createUser.execute({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            }),
        ).resolves.not.toThrow();

        expect(usersRepository.create).toHaveBeenCalled();
        const createdUser = usersRepository.create.mock.calls[0][0];
        expect(createdUser.name).toBe('John Doe');
        expect(createdUser.email).toBe('john@example.com');
    });

    it('should not be able to create a user with an existing email', async () => {
        usersRepository.findByEmail.mockResolvedValue(new User());

        await expect(
            createUser.execute({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            }),
        ).rejects.toThrow(ConflictException);
    });
});
