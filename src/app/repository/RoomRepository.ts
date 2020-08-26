import {Room} from '../model/Room';

export class RoomRepository{

  public persist(hotelId: number, roomNumber: number, roomType: string): void {

  }

  public findByHotelAndNumber(hotelId: number, roomNumber: number): Room{
    return null;
  }

  update(hotelId: number, roomNumber: number, roomType: string): void {

  }
}
