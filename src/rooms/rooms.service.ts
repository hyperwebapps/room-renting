import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AddRoomDto, EditRoomDto, RoomDto, RoomsDto } from './dto/rooms.dto'
import { Room, RoomDocument } from './schemas/rooms.schema'
import { plainToInstance } from 'class-transformer'

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
      const mappedRoom = plainToInstance(RoomsDto, room, {
        excludeExtraneousValues: true,
      })
      return mappedRoom
    })
  }

  async getRoom(id: string): Promise<RoomDto> {
    const room = await this.roomModel.findById(id, { __v: 0 }).exec()
    if (room !== null) {
      const mappedRoom = plainToInstance(RoomDto, room, {
        excludeExtraneousValues: true,
      })
      return mappedRoom
    }

    throw new Error(`${id} doesn't exist`)
  }

  async updateRoom(id: string, body: EditRoomDto): Promise<Room> {
    const updatedRoom = await this.roomModel.findOneAndUpdate(
      { _id: id, isEnabled: true },
      body,
    )

    if (updatedRoom !== null) {
      return updatedRoom
    }

    throw new Error(`${id} room can't be updated`)
  }

  async deleteRoom(id: string): Promise<Room> {
    const deletedRoom = await this.roomModel.findOneAndUpdate(
      { _id: id, isEnabled: true },
      {
        isEnabled: false,
      },
    )

    if (deletedRoom !== null) {
      return deletedRoom
    }

    throw new Error(`${id} room can't be deleted`)
  }
}
