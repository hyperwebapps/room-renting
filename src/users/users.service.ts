import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto, UserDto } from './dto/users.dto'
import { User, UserDocument } from './schemas/users.schema'
import { AuthDto, AuthUserDto } from './auth/dto/auth.dto'
import { plainToInstance } from 'class-transformer'
import { tokenExpiration } from 'src/utils'
import * as argon2 from 'argon2'
import { InvalidCredentialsException, UserNotFoundException } from 'src/error'

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  async addUser(body: CreateUserDto): Promise<User> {
    const hash = await argon2.hash(body.password, { type: argon2.argon2id })
    const passwordHashedBody = { ...body, password: hash }
    const createdUser = new this.userModel(passwordHashedBody)
    return createdUser.save()
  }

  async getUser(id: string): Promise<UserDto> {
    const user = await this.userModel
      .findById(id, { token: 0, expire: 0, password: 0, __v: 0 })
      .exec()

    if (user === null) throw new UserNotFoundException()

    const mappedUser = plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    })
    return mappedUser
  }

  async getUserByToken(token: string): Promise<boolean> {
    const user = await this.userModel.findOne({ token: token }).exec()
    if (user === null)
      throw new UnauthorizedException({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      })
    return true
  }

  async authUser(body: AuthDto): Promise<AuthUserDto> {
    const user = await this.userModel
      .findOne({ email: body.email }, { __v: 0 })
      .exec()

    if (user !== null) {
      if (await argon2.verify(user.password, body.password)) {
        const loggedUser = await this.userModel.findByIdAndUpdate(user.id, {
          expire: tokenExpiration(),
        })
        const authenticatedUser = plainToInstance(AuthUserDto, loggedUser, {
          excludeExtraneousValues: true,
        })
        return authenticatedUser
      }
      throw new InvalidCredentialsException()
    }
    throw new InvalidCredentialsException()
  }
}
