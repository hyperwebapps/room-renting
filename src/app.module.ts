import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { RoomModule } from './rooms/rooms.module'
import { AuthModule } from './users/auth/auth.module'
import { UserModule } from './users/users.module'

@Module({
  imports: [
    UserModule,
    AuthModule,
    RoomModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('DB_ENDPOINT'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ConfigModule],
})
export class AppModule {}
