import { Injectable } from '@nestjs/common';
import { IAuthDto } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  async authUser(authBody: IAuthDto): Promise<string> {
    return `token`;
  }
}
