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
import { plainToClass, plainToInstance } from 'class-transformer'
import { ResponseDto } from 'src/utils/dto'
import { AddRoomDto, EditRoomDto, RoomDto, RoomsDto } from './dto/rooms.dto'
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
  async getRoom(@Param('roomId') id: string): Promise<RoomDto> {
    const room = await this.roomService.getRoom(id)
    const converted = plainToInstance(RoomDto, room, {
      excludeExtraneousValues: true,
    })
    return converted
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
    @Body() body: EditRoomDto,
  ): Promise<ResponseDto> {
    const room = await this.roomService.updateRoom(id, body)
    return {
      id: room?._id,
      code: 200,
      message: `${body.name} has been edited`,
    }
  }

  @Delete(':roomId')
  async deleteRoom(@Param('roomId') id: string): Promise<ResponseDto> {
    const room = await this.roomService.deleteRoom(id)
    return {
      id: room?._id,
      code: 200,
      message: `The room has been deleted`,
    }
  }
}
