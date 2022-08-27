import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto, UserDto } from './dto/users.dto'
import { User, UserDocument } from './schemas/users.schema'
import { AuthUserDto } from './auth/dto/auth.dto'
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

  async getUser(id: string): Promise<UserDto> {
    const user = (await this.userModel
      .findById(id, { token: 0, expire: 0, password: 0, __v: 0 })
      .exec()) as unknown as UserDto

    return {
      id: String(user._id),
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    }
  }

  async authUser(email: string): Promise<AuthUserDto> {
    //Change mapping with models

    const user = (await this.userModel
      .findOne(
        { email },
        { email: 0, username: 0, password: 0, avatar: 0, __v: 0 },
      )
      .exec()) as unknown as AuthUserDto

    return {
      _id: user._id,
      token: user.token,
      expire: user.expire,
    }
  }
}
