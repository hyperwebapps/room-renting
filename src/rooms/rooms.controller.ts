import { deserializeArray } from '@nestjs/class-transformer'
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common'
import {
  instanceToInstance,
  instanceToPlain,
  plainToClass,
  plainToInstance,
} from 'class-transformer'
import { ResponseDto } from 'src/utils/dto'
import { AddRoomDto, RoomsDto } from './dto/rooms.dto'
import { RoomService } from './rooms.service'

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async addRoom(@Body() body: AddRoomDto): Promise<ResponseDto> {
    const room = await this.roomService.addRoom(body)

    return {
      id: String(room._id),
      code: 200,
      message: 'The room has been created',
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
  @UseInterceptors(ClassSerializerInterceptor)
  async getRooms(): Promise<RoomsDto[]> {
    const rooms = await this.roomService.getRooms()
    return rooms
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
