import { Exclude } from '@nestjs/class-transformer'
import { Expose } from 'class-transformer'
import { ObjectId } from 'mongoose'

export class AddRoomDto {
  name: string
  price: number
  guest: number
  bedrooms: number
  beds: number
  baths: number
  description: string
  address: string
  imageUrl: string
}

@Exclude()
export class RoomsDto {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  price: number

  @Expose()
  address: string

  @Expose()
  imageUrl: string

  constructor(partial: Partial<RoomsDto>) {
    Object.assign(this, partial)
  }
}

export class EditRoomDto {
  name: string
  price: number
  guest: number
  bedrooms: number
  beds: number
  baths: number
  description: string
  address: string
  imageUrl: string
}

export class RoomDto {
  @Expose({ name: '_id' })
  id: string
  @Expose()
  name: string
  @Expose()
  price: number
  @Expose()
  guest: number
  @Expose()
  bedrooms: number
  @Expose()
  beds: number
  @Expose()
  baths: number
  @Expose()
  description: string
  @Expose()
  address: string
  @Expose({ name: 'imageUrl' })
  avatar: string
}
