import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ResponseDto } from 'src/utils/dto'
import { CreateUserDto, UserDto } from './dto/users.dto'
import { UserService } from './users.service'
import { hashSlice } from 'src/utils'
import * as argon2 from 'argon2'

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<ResponseDto> {
    const hash = await argon2.hash(body.password)
    const user = await this.appService.addUser({
      ...body,
      password: hashSlice(hash),
    })

    return {
      id: String(user._id),
      code: 200,
      message: 'The account has been created',
    }
  }

  @Get(':userId')
  async getUser(@Param('userId') id: string): Promise<UserDto> {
    const user = await this.appService.getUser(id)

    return { ...user }
  }
}
