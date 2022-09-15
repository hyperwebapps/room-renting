import { ConfigService } from '@nestjs/config'
import { TokenGenerator, TokenBase } from 'ts-token-generator'

const configService: ConfigService = new ConfigService()

export const hashSlice = (hash: string): string => {
  const sliced = hash.slice(hash.indexOf('p=') + 2, hash.length)
  return sliced
}

export const generateToken = (): string => {
  const uidgen = new TokenGenerator({
    bitSize: 512,
    baseEncoding: TokenBase.BASE62,
  })
  return uidgen.generate()
}

export const tokenExpiration = (): string => {
  const currentData = new Date()
  currentData.setDate(currentData.getDate() + 1)
  return currentData.toISOString()
}

export const getEnv = (envName: string): string => {
  const env = configService.get<string>(envName)
  if (!env) throw new Error(`${envName} is not defined`)
  return env
}
