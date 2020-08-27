import {async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HotelService} from './hotel/hotel.service';
import {CompanyService} from './company/company.service';
import {BookingService} from './booking/booking.service';
import {Booking} from './model/Booking';
import {PolicyService} from './policy/policy.service';
import {InsufficientCompanyPolicyException} from './exceptions/insufficientCompanyPolicyException';
import {InsufficientEmployeePolicyException} from './exceptions/insufficientEmployeePolicyException';
import {HotelRepository} from './repository/HotelRepository';
import {RoomRepository} from './repository/RoomRepository';
import {CompanyRepository} from './repository/CompanyRepository';
import {EmployeeRepository} from "./repository/EmployeeRepository";
describe('AppComponent', () => {

  let hotelService: HotelService;
  let companyService: CompanyService;
  let bookingService: BookingService;
  let policyService: PolicyService;
  let hotelRepository: HotelRepository;
  let roomRepository: RoomRepository;
  let companyRepository: CompanyRepository;
  let employeeRepository: EmployeeRepository;

  const hotelId = 1;
  const employeeId = 2;
  const roomType = 'STANDARD';
  const checkIn = new Date('01/01/2020');
  const checkOut = new Date('10/01/2020');
  const hotelName = 'Mariott - London';

  beforeEach(async(() => {
    hotelRepository = new HotelRepository();
    roomRepository = new RoomRepository();
    hotelService = new HotelService(hotelRepository, roomRepository);
    companyRepository = new CompanyRepository();
    employeeRepository = new EmployeeRepository();
    companyService = new CompanyService(companyRepository, employeeRepository);
    policyService = new PolicyService();
    bookingService = new BookingService();
  }));

  it('should allow booking for an employee', () => {
    // given

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



  it(`should fail booking given insufficient company policy`, () => {
    // Given

    hotelService.addHotel(hotelId, hotelName);
    const roomNumber = 1;
    const companyId = 1;
    hotelService.setRoom(hotelId, roomNumber, 'MASTER');

    companyService.addEmployee(companyId, employeeId);

    const roomTypes = ['STANDARD'];
    policyService.setCompany(companyId, roomTypes);

    // When
    // Then
    expect(() => bookingService.book(employeeId, hotelId, roomType, checkIn, checkOut))
      .toThrow(InsufficientCompanyPolicyException);
  });

  it('should fail booking given insufficient employee policy', () => {
    // Given
    hotelService.addHotel(hotelId, hotelName);
    const roomNumber = 1;
    const companyId = 1;
    hotelService.setRoom(hotelId, roomNumber, 'MASTER');

    companyService.addEmployee(companyId, employeeId);

    const companyRoomTypes = ['STANDARD', 'MASTER'];
    policyService.setCompany(companyId, companyRoomTypes);

    const employeeRoomTypes = ['STANDARD'];
    policyService.setEmployee(employeeId, employeeRoomTypes);
    // when
    // Then
    expect(() => bookingService.book(employeeId, hotelId, roomType, checkIn, checkOut))
      .toThrow(InsufficientEmployeePolicyException);
  });

});
