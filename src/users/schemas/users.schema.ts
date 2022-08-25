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
}

export const UserSchema = SchemaFactory.createForClass(User)
