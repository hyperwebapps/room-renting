import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongoose'
import { generateToken, tokenExpiration } from 'src/utils'

export type UserDocument = User & Document

@Schema()
export class User {
  id: string

  @Prop({ unique: true })
  email: string

  @Prop({ unique: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({ unique: true, default: generateToken() })
  token: string

  @Prop({ default: tokenExpiration() })
  expire: string

  @Prop({
    default:
      'https://img.seadn.io/files/3b793ffdf7bfbc21290f5d3f43950254.png?fit=max&w=600',
  })
  avatar: string
}

export const UserSchema = SchemaFactory.createForClass(User)
