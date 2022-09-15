import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from 'src/users/users.module'
import { RoomController } from './rooms.controller'
import { RoomService } from './rooms.service'
import { RoomSchema } from './schemas/rooms.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'rooms', schema: RoomSchema }]),
    UserModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
