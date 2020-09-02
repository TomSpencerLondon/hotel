import {Room} from '../model/Room';
import {RoomTypes} from '../model/RoomTypes';

export class RoomRepository{

  public persist(hotelId: number, roomNumber: number, roomType: RoomTypes): void {

  }

  public findByHotelAndNumber(hotelId: number, roomNumber: number): Room{
    return null;
  }

  update(hotelId: number, roomNumber: number, roomType: RoomTypes): void {

  }
}
