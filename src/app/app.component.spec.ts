import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HotelService} from './hotel/hotel.service';
import {CompanyService} from './company/company.service';
import {BookingService} from './booking/booking.service';
import {Booking} from './model/Booking';
import {IdGenerator} from './utils/idGenerator';

describe('AppComponent', () => {

  let hotelService: HotelService;
  let companyService: CompanyService;
  let bookingService: BookingService;

  beforeEach(async(() => {
    hotelService = new HotelService();
    companyService = new CompanyService();

  }));

  it('should allow booking for an employee', () => {
    // given
    const hotelId = 1;
    const employeeId = 2;
    const roomType = 'Standard';
    const checkIn = new Date('01/01/2020');
    const checkOut = new Date('10/01/2020');

    const idGenerator = {
      generate: jest.fn()
    };

    idGenerator.generate.mockReturnValue(123);
    bookingService = new BookingService(idGenerator);

    // when
    const booking: Booking = bookingService.book(employeeId, hotelId, roomType, checkIn, checkOut);

    // then
    expect(booking.uuid).toBe(123);
    expect(booking.employeeId).toBe(employeeId);
    expect(booking.hotelId).toBe(hotelId);
    expect(booking.roomType).toBe(roomType);
    expect(booking.checkIn).toBe(checkIn);
    expect(booking.checkOut).toBe(checkOut);
  });

  it(`should '`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('hotel');
  });

});
