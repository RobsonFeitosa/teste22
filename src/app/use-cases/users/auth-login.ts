import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

interface AuthLoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  access_token: string;
}

@Injectable()
export class AuthLogin {
  constructor(
    private typeormUsersRepository: TypeormUsersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthLoginResponse> {
    const user = await this.typeormUsersRepository.findByEmail(email);
    console.log({ email });

    const isPassValid = await compare(pass, user?.password);

    if (!isPassValid || !user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.name };

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
