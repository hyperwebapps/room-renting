import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}

export class AuthUserDto {
  _id: string
  token: string
  expire: Date
}
