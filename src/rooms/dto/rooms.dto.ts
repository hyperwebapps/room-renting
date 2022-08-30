import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddRoomDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsNumber()
  guest: number

  @IsNotEmpty()
  @IsNumber()
  bedrooms: number

  @IsNotEmpty()
  @IsNumber()
  beds: number

  @IsNotEmpty()
  @IsNumber()
  baths: number

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  address: string

  @IsNotEmpty()
  @IsString()
  imageUrl: string
}

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
  isEnabled: boolean
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

  @Expose()
  imageUrl: string
}
