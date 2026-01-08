import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthLogin } from '@app/use-cases/users/auth-login';

describe('AuthController', () => {
    let authController: AuthController;
    let authLogin: AuthLogin;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthLogin,
                    useValue: {
                        signIn: jest.fn(),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authLogin = module.get<AuthLogin>(AuthLogin);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    describe('signIn', () => {
        it('should call authLogin.signIn with correct parameters', async () => {
            const signInDto = {
                email: 'john@example.com',
                password: 'password123',
            };
            const expectedResponse = { access_token: 'token' };

            jest.spyOn(authLogin, 'signIn').mockResolvedValue(expectedResponse as any);

            const result = await authController.signIn(signInDto);

            expect(authLogin.signIn).toHaveBeenCalledWith(signInDto.email, signInDto.password);
            expect(result).toEqual(expectedResponse);
        });
    });
});
