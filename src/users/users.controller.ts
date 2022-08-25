import { Body, Controller, Get, Post } from '@nestjs/common'
import { ResponseDto } from 'src/utils/dto'
import { CreateUserDto } from './dto/users.dto'
import { UserService } from './users.service'
import * as argon2 from 'argon2'

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<ResponseDto> {
    const userAddedMessage = await this.appService.addUser(body.username)
    const hash = await argon2.hash(body.password)
    return {
      id: body.email,
      code: 200,
      message: userAddedMessage,
    }
  }
}
