import { Injectable } from '@angular/core';
import {Booking} from '../model/Booking';
import {IdGenerator} from '../utils/idGenerator';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private idGenerator: IdGenerator) { }

  book(employeeId: number, hotelId: number, roomType: string, checkIn: Date, checkOut: Date): Booking {
    const booking = new Booking();
    booking.uuid = this.idGenerator.generate();
    booking.employeeId = employeeId;
    booking.hotelId = hotelId;
    booking.roomType = roomType;
    booking.checkOut = checkOut;
    booking.checkIn = checkIn;

    return booking;
  }
}