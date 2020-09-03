import { Injectable } from '@angular/core';
import {Booking} from '../model/Booking';
import {IdGenerator} from '../utils/idGenerator';
import {RoomTypes} from '../model/RoomTypes';
import {BookingRepository} from '../repository/BookingRepository';
import {PolicyService} from '../policy/policy.service';
import {InsufficientPolicyException} from '../exceptions/insufficientPolicyException';
import {NoRoomsAvailableException} from '../exceptions/noRoomsAvailableException';
import {HotelService} from '../hotel/hotel.service';
import {HotelNotExistsException} from '../exceptions/hotelNotExistsException';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private idGenerator: IdGenerator,
              private bookingRepository: BookingRepository,
              private policyService: PolicyService,
              private hotelService: HotelService) { }

  book(employeeId: number, hotelId: number, roomType: RoomTypes, checkIn: Date, checkOut: Date): Booking {
    this.validate(employeeId, hotelId, roomType, checkIn, checkOut);

    const booking = new Booking();

    if (this.idGenerator) {
      booking.uuid = this.idGenerator.generate();
    }

    booking.employeeId = employeeId;
    booking.hotelId = hotelId;
    booking.roomType = roomType;
    booking.checkOut = checkOut;
    booking.checkIn = checkIn;

    this.bookingRepository.persist(booking);

    return booking;
  }

  private validate(employeeId: number, hotelId: number, roomType: RoomTypes, checkIn: Date, checkOut: Date): void {
    if (!this.hotelService.findHotelById(hotelId)){
      throw new HotelNotExistsException();
    }

    if (!this.policyService.isBookingAllowed(employeeId, roomType)){
      throw new InsufficientPolicyException('');
    }

    if (!this.bookingRepository.findAvailableRooms(roomType, checkIn, checkOut)){
      throw new NoRoomsAvailableException('');
    }
  }
}
