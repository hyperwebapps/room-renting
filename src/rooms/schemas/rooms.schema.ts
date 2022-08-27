import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'

export type RoomDocument = Room & Document

@Schema()
export class Room {
  _id: string

  @Prop()
  name: string

  @Prop()
  price: number

  @Prop()
  guest: number

  @Prop()
  bedrooms: number

  @Prop()
  beds: number

  @Prop()
  baths: number

  @Prop()
  description: string

  @Prop()
  address: string

  @Prop({
    default:
      'https://a0.muscache.com/im/pictures/miso/Hosting-3524556/original/24e9b114-7db5-4fab-8994-bc16f263ad1d.jpeg?im_w=960',
  })
  imageUrl: string

  @Prop({ default: true })
  isEnabled: boolean
}

export const RoomSchema = SchemaFactory.createForClass(Room)
