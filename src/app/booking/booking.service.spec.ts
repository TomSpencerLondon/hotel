import {BookingService} from './booking.service';
import {IdGenerator} from '../utils/idGenerator';
import {RoomTypes} from '../model/RoomTypes';
import {InsufficientPolicyException} from '../exceptions/insufficientPolicyException';
import {NoRoomsAvailableException} from '../exceptions/noRoomsAvailableException';
import {HotelNotExistsException} from '../exceptions/hotelNotExistsException';
import {Hotel} from '../model/Hotel';

describe('BookingService', () => {
  let bookingService: BookingService;


  let bookingRepositoryStub;
  let policyServiceStub;
  let hotelServiceStub;

  const employeeId = 1;
  const hotelId = 1;
  const roomType = RoomTypes.STANDARD;
  const checkIn = new Date('01/01/2020');
  const checkOut = new Date('10/01/2020');

  beforeEach(() => {

    hotelServiceStub = {
      findHotelById: jest.fn()
    };

    bookingRepositoryStub = {
      persist: jest.fn(),
      findAvailableRooms: jest.fn()
    };

    policyServiceStub = {
      isBookingAllowed: jest.fn()
    };

    const idGenerator = new IdGenerator();
    bookingService = new BookingService(
      idGenerator, bookingRepositoryStub, policyServiceStub, hotelServiceStub);
  });

  it('should persist booking', () => {
    // given
    hotelServiceStub.findHotelById.mockReturnValue(new Hotel());
    policyServiceStub.isBookingAllowed.mockReturnValue(true);
    bookingRepositoryStub.findAvailableRooms.mockReturnValue([]);

    // when
    bookingService.book(employeeId, hotelId, roomType, checkIn, checkOut);

    // then
    expect(bookingRepositoryStub.persist.mock.calls.length).toBe(1);
  });

  it('should not book given insufficient policies', () => {
    // given
    hotelServiceStub.findHotelById.mockReturnValue(new Hotel());
    policyServiceStub.isBookingAllowed.mockReturnValue(false);

    // when
    // then
    expect(() => bookingService.book(
        employeeId, hotelId, roomType, checkIn, checkOut))
      .toThrow(InsufficientPolicyException);
    expect(bookingRepositoryStub.persist.mock.calls.length).toBe(0);
  });

  it('should not book given room taken in date range', () => {
    // given
    hotelServiceStub.findHotelById.mockReturnValue(new Hotel());
    policyServiceStub.isBookingAllowed.mockReturnValue(true);
    bookingRepositoryStub.findAvailableRooms.mockReturnValue(null);

    // when
    // then
    expect(() => bookingService.book(
      employeeId, hotelId, roomType, checkIn, checkOut))
      .toThrow(NoRoomsAvailableException);
    expect(bookingRepositoryStub.persist.mock.calls.length).toBe(0);
  });

  it('should not book hotel does not exist', () => {
    // given
    hotelServiceStub.findHotelById.mockReturnValue(null);

    // when
    // then
    expect(() => bookingService.book(
      employeeId, hotelId, roomType, checkIn, checkOut))
      .toThrow(HotelNotExistsException);
    expect(bookingRepositoryStub.persist.mock.calls.length).toBe(0);
  });
});
