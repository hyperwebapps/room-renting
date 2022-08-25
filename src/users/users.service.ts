import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto, UserDto } from './dto/users.dto'
import { User, UserDocument } from './schemas/users.schema'
import UIDGenerator = require('uid-generator')

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  async addUser(body: CreateUserDto): Promise<User> {
    const uidgen = new UIDGenerator(512, UIDGenerator.BASE62)
    const token = await uidgen.generate()
    const createdUser = new this.userModel({ ...body, token })
    return createdUser.save()
  }

  async getUser(token: string): Promise<UserDto> {
    return {
      email: '',
      username: '',
      imageUrl: '',
    }
  }
}
