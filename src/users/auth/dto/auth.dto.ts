import { Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}

export class AuthUserDto {
  @Expose()
  id: string

  @Expose()
  token: string

  @Expose()
  expire: string
}
