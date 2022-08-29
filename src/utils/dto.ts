export class ResponseDto {
  id?: string
  code: number
  message?: string
  token?: string
  expire?: string

  constructor(partial: Partial<ResponseDto>) {
    Object.assign(this, partial)
  }
}

export class ErrorDto {
  id: string
  message: string
  details?: string
}
