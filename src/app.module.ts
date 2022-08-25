import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
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
  ],
  providers: [ConfigModule],
})
export class AppModule {}
