import { Body, Controller, Get, Post } from '@nestjs/common'
import { ResponseDto } from 'src/utils/dto'
import { UserService } from '../users.service'
import { AuthDto, AuthUserDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async authUser(@Body() body: AuthDto): Promise<ResponseDto> {
    const user: AuthUserDto = await this.userService.authUser(body.email)
    const { _id, token, expire } = user

    return {
      id: _id,
      code: 200,
      token,
      expire,
    }
  }
}
