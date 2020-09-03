import {Booking} from '../model/Booking';
import {Room} from '../model/Room';
import {RoomTypes} from '../model/RoomTypes';

export class BookingRepository{

  public persist(booking: Booking): void{

  }

  findAvailableRooms(roomType: RoomTypes, checkIn: Date, checkOut: Date): Room[] {
    return [];
  }
}
