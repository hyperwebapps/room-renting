import { Module } from '@nestjs/common';
import { RoomModule } from './rooms/rooms.module';
import { AuthModule } from './users/auth/auth.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [UserModule, AuthModule, RoomModule],
})
export class AppModule {}
