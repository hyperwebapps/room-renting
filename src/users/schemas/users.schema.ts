import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Date, ObjectId } from 'mongoose'
import { tokenExpiration } from 'src/utils'

export type UserDocument = User & Document

@Schema()
export class User {
  _id: ObjectId

  @Prop({ unique: true })
  email: string

  @Prop({ unique: true })
  username: string

  @Prop()
  password: string

  @Prop({ unique: true, default: '' })
  token: string

  @Prop(raw({ type: Date, default: tokenExpiration() }))
  expire: Date

  @Prop({
    default:
      'https://img.seadn.io/files/3b793ffdf7bfbc21290f5d3f43950254.png?fit=max&w=600',
  })
  avatar: string
}

export const UserSchema = SchemaFactory.createForClass(User)
