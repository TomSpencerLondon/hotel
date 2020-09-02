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
import {EmployeeRepository} from './repository/EmployeeRepository';
import {PolicyRepository} from './repository/PolicyRepository';
import {RoomTypes} from './model/RoomTypes';
describe('AppComponent', () => {

  let hotelService: HotelService;
  let companyService: CompanyService;
  let bookingService: BookingService;
  let policyService: PolicyService;
  let hotelRepository: HotelRepository;
  let roomRepository: RoomRepository;
  let companyRepository: CompanyRepository;
  let employeeRepository: EmployeeRepository;
  let policyRepository: PolicyRepository;

  const hotelId = 1;
  const employeeId = 2;
  const roomType = RoomTypes.STANDARD;
  const checkIn = new Date('01/01/2020');
  const checkOut = new Date('10/01/2020');
  const hotelName = 'Mariott - London';

  beforeEach(async(() => {
    hotelRepository = new HotelRepository();
    roomRepository = new RoomRepository();
    policyRepository = new PolicyRepository();
    hotelService = new HotelService(hotelRepository, roomRepository);
    companyRepository = new CompanyRepository();
    employeeRepository = new EmployeeRepository();
    companyService = new CompanyService(companyRepository, employeeRepository);
    policyService = new PolicyService(policyRepository, employeeRepository);
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
    hotelService.setRoom(hotelId, roomNumber, RoomTypes.MASTER);

    companyService.addEmployee(companyId, employeeId);

    const roomTypes = [RoomTypes.STANDARD];
    policyService.setCompanyPolicy(companyId, roomTypes);

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
    hotelService.setRoom(hotelId, roomNumber, RoomTypes.MASTER);

    companyService.addEmployee(companyId, employeeId);

    const companyRoomTypes = [RoomTypes.STANDARD, RoomTypes.MASTER];
    policyService.setCompanyPolicy(companyId, companyRoomTypes);

    const employeeRoomTypes = [RoomTypes.STANDARD];
    policyService.setEmployeePolicy(employeeId, employeeRoomTypes);
    // when
    // Then
    expect(() => bookingService.book(employeeId, hotelId, roomType, checkIn, checkOut))
      .toThrow(InsufficientEmployeePolicyException);
  });

});
