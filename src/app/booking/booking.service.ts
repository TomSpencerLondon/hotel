import { Injectable } from '@angular/core';
import {Booking} from '../model/Booking';
import {IdGenerator} from '../utils/idGenerator';
import {RoomTypes} from '../model/RoomTypes';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private idGenerator?: IdGenerator) { }

  book(employeeId: number, hotelId: number, roomType: RoomTypes, checkIn: Date, checkOut: Date): Booking {
    const booking = new Booking();

    if (this.idGenerator) {
      booking.uuid = this.idGenerator.generate();
    }

    booking.employeeId = employeeId;
    booking.hotelId = hotelId;
    booking.roomType = roomType;
    booking.checkOut = checkOut;
    booking.checkIn = checkIn;

    return booking;
  }
}
