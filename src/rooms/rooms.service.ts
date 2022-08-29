import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AddRoomDto, EditRoomDto, RoomDto, RoomsDto } from './dto/rooms.dto'
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

  async getRoom(id: string): Promise<{} | null> {
    const room = await this.roomModel.findById(id, { __v: 0 }).exec()
    return room
  }

  async updateRoom(id: string, body: EditRoomDto): Promise<Room | null> {
    const updatedRoom = await this.roomModel.findByIdAndUpdate(id, body)
    return updatedRoom
  }

  async deleteRoom(id: string): Promise<Room | null> {
    const deletedRoom = await this.roomModel.findByIdAndUpdate(id, {
      isEnabled: false,
    })
    return deletedRoom
  }
}
