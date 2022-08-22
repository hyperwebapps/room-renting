import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResponseDto } from 'src/utils/dto';
import { CreateUserDto } from './dto/users.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<ResponseDto> {
    const userAddedMessage = await this.appService.addUser(body.username);

    return {
      id: body.email,
      code: 200,
      message: userAddedMessage,
    };
  }
}
