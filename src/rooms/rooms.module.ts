import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RoomController } from './rooms.controller'
import { RoomService } from './rooms.service'
import { RoomSchema } from './schemas/rooms.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'rooms', schema: RoomSchema }])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
