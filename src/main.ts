import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { getEnv } from './utils'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
  await app.listen(getEnv('PORT'))
}
bootstrap()
