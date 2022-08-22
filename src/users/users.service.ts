import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async addUser(username: string): Promise<string> {
    return `${username} your account has been created`;
  }
}
