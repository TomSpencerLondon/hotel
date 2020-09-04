import {Booking} from '../model/Booking';
import {Room} from '../model/Room';
import {RoomTypes} from '../model/RoomTypes';

export class BookingRepository{
  private bookings: Booking[] = [];

  public persist(booking: Booking): void{
    this.bookings.push(booking);
  }

  findBookings(roomType: RoomTypes, checkIn: Date, checkOut: Date): Booking[] {
    return this.bookings.filter(booking => {
      if ((booking.roomType === roomType) && this.doDatesOverlap(booking, checkIn, checkOut)){
        return true;
      }else {
        return false;
      }
    });
  }

  doDatesOverlap(booking: Booking, checkIn: Date, checkOut: Date): boolean {
    return !(this.isRangeBeforeBooking(booking, checkIn, checkOut)
    || this.isRangeAfterBooking(booking, checkIn, checkOut));
  }

  isRangeBeforeBooking(booking: Booking, checkIn: Date, checkOut: Date): boolean {
    return (booking.checkIn > checkOut) && (booking.checkOut > checkOut);
  }

  isRangeAfterBooking(booking: Booking, checkIn: Date, checkOut: Date): boolean {
    return (booking.checkIn < checkIn) && (booking.checkOut < checkIn);
  }
}
