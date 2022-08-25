import { Injectable } from '@nestjs/common'
import { UserDto } from './dto/users.dto'

@Injectable()
export class UserService {
  async addUser(username: string): Promise<string> {
    return `${username} your account has been created`
  }

  async getUser(token: string): Promise<UserDto> {
    return {
      email: '',
      username: '',
      imageUrl: '',
    }
  }
}
