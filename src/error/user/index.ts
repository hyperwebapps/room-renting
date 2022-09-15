import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      {
        code: HttpStatus.FORBIDDEN,
        message: 'Invalid email or password',
      },
      HttpStatus.FORBIDDEN,
    )
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        code: HttpStatus.BAD_REQUEST,
        message: 'User not found',
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
