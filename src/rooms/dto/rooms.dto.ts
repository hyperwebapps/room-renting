import { Exclude } from '@nestjs/class-transformer'
import { Expose } from 'class-transformer'

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
