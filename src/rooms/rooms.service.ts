import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  async addRoom(username: string): Promise<string> {
    return `${username} your account has been created`;
  }

  async getRoom(id: string): Promise<{}> {
    return {
      email: '',
      username: '',
      imageUrl: '',
    };
  }

  async updateRoom(): Promise<string> {
    return 'The room has been edited';
  }

  async disableRoom(): Promise<string> {
    return 'The room has been disabled';
  }
}
