import { IsNotEmpty } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
