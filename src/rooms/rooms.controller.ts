import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ResponseDto } from 'src/utils/dto'
import { AddRoomDto } from './dto/rooms.dto'
import { RoomService } from './rooms.service'

@Controller('rooms')
export class RoomController {
  constructor(private readonly appService: RoomService) {}

  @Post()
  async addRoom(@Body() body: AddRoomDto): Promise<ResponseDto> {
    return {
      id: body.name,
      code: 200,
      message: '',
    }
  }

  @Get(':roomId')
  async getRoom(@Param('roomId') id: string): Promise<ResponseDto> {
    return {
      id: id,
      code: 200,
      message: `Room is occupied`,
    }
  }

  @Get()
  async getRooms(): Promise<ResponseDto> {
    return {
      code: 200,
      message: 'All rooms',
    }
  }

  @Put(':roomId')
  async editRoom(
    @Param('roomId') id: string,
    @Body() body: AddRoomDto,
  ): Promise<ResponseDto> {
    return {
      id: id,
      code: 200,
      message: `${body.name} has been edited`,
    }
  }

  @Delete('roomId')
  async deleteRoom(@Param('roomId') id: string): Promise<ResponseDto> {
    return {
      id: id,
      code: 200,
      message: `The room has been deleted`,
    }
  }
}
