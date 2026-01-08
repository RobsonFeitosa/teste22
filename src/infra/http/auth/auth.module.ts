import { AuthLogin } from '@app/use-cases/users/auth-login';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';
import { TypeOrmService } from '@infra/database/typeorm/typeorm.service';
import { jwtConstants } from '@helpers/constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthLogin, TypeormUsersRepository, TypeOrmService],
  controllers: [AuthController],
  exports: [AuthLogin],
})
export class AuthModule {}
