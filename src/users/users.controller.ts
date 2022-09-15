import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth'
import { ResponseDto } from 'src/utils/dto'
import { CreateUserDto, UserDto } from './dto/users.dto'
import { UserService } from './users.service'

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<ResponseDto> {
    const user = await this.appService.addUser(body)
    return new ResponseDto({
      id: user.id,
      code: 200,
      message: 'The account has been created',
    })
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  async getUser(@Param('userId') id: string): Promise<UserDto> {
    const user = await this.appService.getUser(id)

    return user
  }
}
