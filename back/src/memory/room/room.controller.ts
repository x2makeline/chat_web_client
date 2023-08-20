import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
// import { Room } from '../room.entity';
import { RoomService } from './room.service';

/***
 * room hashtable 로 만들어서
 * 안에 user 에대한 정보를 저장한다.
 * 기본 room 인 대기실을 만든다.
 */

@Controller()
export class RoomController {
  // constructor(private roomService: RoomService) {}
  //
  // @Get('api/rooms')
  // async getAllRooms(): Promise<Room[]> {
  //   return await this.roomService.getRooms();
  // }
  //
  // @Get('api/rooms/:room')
  // async getRoom(@Param() params): Promise<Room> {
  //   const room = await this.roomService.getRoomByName(params.room);
  //   if (room === 'Not Exists') {
  //     throw new NotFoundException();
  //   }
  //   return room;
  // }
}
