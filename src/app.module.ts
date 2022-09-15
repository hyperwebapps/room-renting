import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { RoomModule } from './rooms/rooms.module'
import { AuthModule } from './users/auth/auth.module'
import { UserModule } from './users/users.module'
import { getEnv } from './utils'
import 'reflect-metadata'

@Module({
  imports: [
    UserModule,
    AuthModule,
    RoomModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: getEnv('DB_ENDPOINT'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ConfigModule],
})
export class AppModule {}
