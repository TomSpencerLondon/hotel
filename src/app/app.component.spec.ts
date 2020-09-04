import {async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HotelService} from './hotel/hotel.service';
import {CompanyService} from './company/company.service';
import {BookingService} from './booking/booking.service';
import {Booking} from './model/Booking';
import {PolicyService} from './policy/policy.service';
import {InsufficientPolicyException} from './exceptions/insufficientPolicyException';
import {HotelRepository} from './repository/HotelRepository';
import {RoomRepository} from './repository/RoomRepository';
import {CompanyRepository} from './repository/CompanyRepository';
import {EmployeeRepository} from './repository/EmployeeRepository';
import {PolicyRepository} from './repository/PolicyRepository';
import {RoomTypes} from './model/RoomTypes';
import {BookingRepository} from './repository/BookingRepository';
import {NoRoomsAvailableException} from './exceptions/noRoomsAvailableException';

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
  let bookingRepository: BookingRepository;

  const hotelId = 1;
  const employeeId = 2;
  const roomNumber = 1;
  const companyId = 10;
  const standardRoomType = RoomTypes.STANDARD;
  const masterRoomType = RoomTypes.MASTER;
  const checkIn = new Date('01/01/2020');
  const checkOut = new Date('10/01/2020');
  const hotelName = 'Mariott - London';

  beforeEach(async(() => {
    const idGenerator = {
      generate: jest.fn()
    };

    hotelRepository = new HotelRepository();
    roomRepository = new RoomRepository();
    policyRepository = new PolicyRepository();
    hotelService = new HotelService(hotelRepository, roomRepository);
    companyRepository = new CompanyRepository();
    employeeRepository = new EmployeeRepository();
    bookingRepository = new BookingRepository();
    companyService = new CompanyService(companyRepository, employeeRepository, policyRepository);
    policyService = new PolicyService(policyRepository, employeeRepository);
    bookingService = new BookingService(idGenerator,
      bookingRepository, policyService, hotelService, roomRepository);
  }));

  it('should booking contain all expected data', () => {
    // given
    const idGenerator = {
      generate: jest.fn()
    };

    hotelService.addHotel(hotelId, hotelName);
    hotelService.setRoom(hotelId, roomNumber, standardRoomType);

    idGenerator.generate.mockReturnValue(123);
    bookingService = new BookingService(idGenerator,
      bookingRepository, policyService, hotelService, roomRepository);

    // when
    const booking: Booking = bookingService.book(employeeId, hotelId, standardRoomType, checkIn, checkOut);

    // then
    expect(booking.uuid).toBe(123);
    expect(booking.employeeId).toBe(employeeId);
    expect(booking.hotelId).toBe(hotelId);
    expect(booking.roomType).toBe(standardRoomType);
    expect(booking.checkIn).toBe(checkIn);
    expect(booking.checkOut).toBe(checkOut);
  });

  it('should allow booking if employee was deleted', () => {
    // Given
    companyService.addEmployee(companyId, employeeId);
    const roomTypes = [standardRoomType];
    policyService.setEmployeePolicy(employeeId, roomTypes);

    // guard assert
    expect(policyService.isBookingAllowed(employeeId, standardRoomType)).toBeTruthy();

    // When
    companyService.deleteEmployee(employeeId);

    // Then
    expect(policyService.isBookingAllowed(employeeId, standardRoomType)).toBeTruthy();

  });

  it('should add and find a hotel', () => {
    // given
    hotelService.addHotel(hotelId, hotelName);

    // when
    const hotel = hotelService.findHotelById(hotelId);

    //
    expect(hotel.id).toBe(hotelId);
    expect(hotel.name).toBe(hotelName);
  });

  it(`should book a room given sufficient company policy`, () => {
    // Given

    hotelService.addHotel(hotelId, hotelName);
    hotelService.setRoom(hotelId, roomNumber, masterRoomType);

    companyService.addEmployee(companyId, employeeId);

    const roomTypes = [masterRoomType];
    policyService.setCompanyPolicy(companyId, roomTypes);

    // When
    const booking = bookingService
      .book(employeeId, hotelId, masterRoomType, checkIn, checkOut);

    // Then
    expect(booking).not.toBeNull();
  });

  it(`should fail booking given insufficient company policy`, () => {
    // Given

    hotelService.addHotel(hotelId, hotelName);
    hotelService.setRoom(hotelId, roomNumber, masterRoomType);

    companyService.addEmployee(companyId, employeeId);

    const roomTypes = [standardRoomType];
    policyService.setCompanyPolicy(companyId, roomTypes);

    // When
    // Then
    expect(() => bookingService.book(employeeId, hotelId, masterRoomType, checkIn, checkOut))
      .toThrow(InsufficientPolicyException);
  });

  it('should fail booking given insufficient employee policy', () => {
    // Given
    hotelService.addHotel(hotelId, hotelName);
    hotelService.setRoom(hotelId, roomNumber, masterRoomType);

    companyService.addEmployee(companyId, employeeId);

    const companyRoomTypes = [standardRoomType, masterRoomType];
    policyService.setCompanyPolicy(companyId, companyRoomTypes);

    const employeeRoomTypes = [standardRoomType];
    policyService.setEmployeePolicy(employeeId, employeeRoomTypes);
    // when
    // Then
    expect(() => bookingService.book(employeeId, hotelId, masterRoomType, checkIn, checkOut))
      .toThrow(InsufficientPolicyException);
  });

  it('should not book if the dates are already taken', () => {
    // given
    const idGenerator = {
      generate: jest.fn()
    };

    hotelService.addHotel(hotelId, hotelName);
    hotelService.setRoom(hotelId, roomNumber, standardRoomType);

    idGenerator.generate.mockReturnValue(123);
    bookingService = new BookingService(idGenerator,
      bookingRepository, policyService, hotelService, roomRepository);

    bookingService.book(employeeId, hotelId, standardRoomType, checkIn, checkOut);

    expect(() => bookingService.book(employeeId, hotelId, standardRoomType, checkIn, checkOut))
      .toThrow(NoRoomsAvailableException);
  });

  it('should not book if hotel does not have rooms of given type', () => {
    // given
    const idGenerator = {
      generate: jest.fn()
    };

    hotelService.addHotel(hotelId, hotelName);

    idGenerator.generate.mockReturnValue(123);
    bookingService = new BookingService(idGenerator,
      bookingRepository, policyService, hotelService, roomRepository);

    expect(() => bookingService.book(employeeId, hotelId, standardRoomType, checkIn, checkOut))
      .toThrow(NoRoomsAvailableException);
  });
});
