import { Module } from '@nestjs/common';
import { RoomController } from './rooms.controller';
import { RoomService } from './rooms.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
