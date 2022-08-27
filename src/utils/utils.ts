import { ConfigService } from '@nestjs/config'
import UIDGenerator from 'uid-generator'

const configService: ConfigService = new ConfigService()

export const hashSlice = (hash: string): string => {
  const sliced = hash.slice(hash.indexOf('p=') + 2, hash.length)
  return sliced
}

export const generateToken = async (): Promise<string> => {
  const uidgen = new UIDGenerator(512, UIDGenerator.BASE62)
  return await uidgen.generate()
}

export const tokenExpiration = (): Date => {
  const currentData = new Date()
  currentData.setDate(currentData.getDate() + 1)
  return currentData
}

export const getEnv = (envName: string): string => {
  const env = configService.get<string>(envName)
  if (!env) throw new Error(`${envName} is not defined`)
  return env
}
