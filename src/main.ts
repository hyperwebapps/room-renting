import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
  const configService = app.get(ConfigService)
  await app.listen(configService.getOrThrow<number>('PORT'))
}
bootstrap()
