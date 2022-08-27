import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AddRoomDto, RoomsDto } from './dto/rooms.dto'
import { Room, RoomDocument } from './schemas/rooms.schema'

@Injectable()
export class RoomService {
  constructor(@InjectModel('rooms') private roomModel: Model<RoomDocument>) {}

  async addRoom(body: AddRoomDto): Promise<Room> {
    const createdRoom = new this.roomModel(body)
    return createdRoom.save()
  }

  async getRooms(): Promise<RoomsDto[]> {
    const rooms = await this.roomModel
      .find({ isEnabled: true }, { __v: 0 })
      .exec()
    return rooms.map((room) => {
      const { name, price, address, imageUrl } = room
      return new RoomsDto({
        id: room._id.toString(),
        name,
        price,
        address,
        imageUrl,
      })
    })
  }

  async updateRoom(): Promise<string> {
    return 'The room has been edited'
  }

  async deleteRoom(): Promise<string> {
    return 'The room has been disabled'
  }
}
