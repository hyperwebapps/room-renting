import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResponseDto } from 'src/utils/dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post()
  async createUser(@Body() body: AuthDto): Promise<ResponseDto> {
    const token = await this.appService.authUser(body);

    return {
      id: body.email,
      code: 200,
      token: token,
    };
  }
}
