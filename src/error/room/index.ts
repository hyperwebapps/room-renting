import { HttpException, HttpStatus } from '@nestjs/common'

export class RoomNotFoundException extends HttpException {
  constructor() {
    super(
      {
        code: HttpStatus.BAD_REQUEST,
        message: 'The room does not exist',
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
