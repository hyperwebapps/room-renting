export class ResponseDto {
  id?: string
  code: number
  message?: string
  token?: string
  expire?: Date
}

export class ErrorDto {
  id: string
  message: string
  details?: string
}
