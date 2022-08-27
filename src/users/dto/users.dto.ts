import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  username: string

  @MinLength(8)
  password: string
}

export class UserDto {
  id: string
  _id?: string
  email: string
  username: string
  token?: string
  expire?: Date
  avatar: string
}
