import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type RoomDocument = Room & Document

@Schema()
export class Room {
  id: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  price: number

  @Prop({ required: true })
  guest: number

  @Prop({ required: true })
  bedrooms: number

  @Prop({ required: true })
  beds: number

  @Prop({ required: true })
  baths: number

  @Prop({ default: 'No description has been given' })
  description: string

  @Prop({ required: true })
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
