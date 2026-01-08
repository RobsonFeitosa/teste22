import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';
import { AuthLogin } from './auth-login';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthLogin', () => {
    let authLogin: AuthLogin;
    let usersRepository: jest.Mocked<TypeormUsersRepository>;
    let jwtService: jest.Mocked<JwtService>;

    beforeEach(() => {
        usersRepository = {
            findByEmail: jest.fn(),
        } as any;
        jwtService = {
            signAsync: jest.fn(),
        } as any;
        authLogin = new AuthLogin(usersRepository, jwtService);
    });

    it('should be able to sign in with valid credentials', async () => {
        const user = {
            id: 'user-id',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashed-password',
        };

        usersRepository.findByEmail.mockResolvedValue(user as any);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        jwtService.signAsync.mockResolvedValue('jwt-token');

        const response = await authLogin.signIn('john@example.com', 'password123');

        expect(response).toEqual({
            user: {
                id: 'user-id',
                name: 'John Doe',
                email: 'john@example.com',
            },
            access_token: 'jwt-token',
        });
    });

    it('should not be able to sign in with invalid password', async () => {
        const user = {
            id: 'user-id',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashed-password',
        };

        usersRepository.findByEmail.mockResolvedValue(user as any);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(
            authLogin.signIn('john@example.com', 'wrong-password'),
        ).rejects.toThrow(UnauthorizedException);
    });

    it('should not be able to sign in if user does not exist', async () => {
        usersRepository.findByEmail.mockResolvedValue(null);

        await expect(
            authLogin.signIn('nonexistent@example.com', 'password123'),
        ).rejects.toThrow(UnauthorizedException);
    });
});
