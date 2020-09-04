import {HotelService} from './hotel.service';
import {HotelExistsException} from '../exceptions/hotelExistsException';
import {Hotel} from '../model/Hotel';
import {Room} from '../model/Room';
import {HotelNotExistsException} from '../exceptions/hotelNotExistsException';
import {RoomTypes} from '../model/RoomTypes';

describe('HotelService', () => {
  let hotelService: HotelService;
  let hotelRepository;
  let roomRepository;

  const roomNumber = 1;
  const roomType = RoomTypes.STANDARD;
  const hotelId = 1;
  const hotelName = 'Marriott - London';

  beforeEach(() => {
    hotelRepository = {
      persist: jest.fn(),
      findById: jest.fn()
    };

    roomRepository = {
      persist: jest.fn(),
      update: jest.fn(),
      findByHotelAndNumber: jest.fn()
    };

    hotelService = new HotelService(hotelRepository, roomRepository);
  });

  it('should be created', () => {
    expect(hotelService).toBeTruthy();
  });

  it('should add a hotel', () => {
    // when
    hotelService.addHotel(hotelId, hotelName);
    // then
    expect(hotelService.findHotelById(hotelId)).not.toBe(null);
  });

  it('should not add a hotel', () => {
    // given
    hotelRepository.findById.mockReturnValue(new Hotel());

    // when
    // then
    expect(() => hotelService.addHotel(hotelId, hotelName))
      .toThrow(HotelExistsException);
  });

  it('should set a room', () => {
    // when
    hotelRepository.findById.mockReturnValue(true);
    hotelService.setRoom(hotelId, roomNumber, roomType);

    // then
    expect(roomRepository.persist.mock.calls.length).toBe(1);
  });

  it('should update a room', () => {
    // given
    hotelRepository.findById.mockReturnValue(true);
    roomRepository.findByHotelAndNumber.mockReturnValue(new Room(hotelId, roomNumber, roomType));

    // when
    hotelService.setRoom(hotelId, roomNumber, roomType);

    // then
    expect(roomRepository.update.mock.calls.length).toBe(1);
    expect(roomRepository.persist.mock.calls.length).toBe(0);
  });

  it('should ', () => {
    // given
    hotelRepository.findById.mockReturnValue(false);

    // when
    // then
    expect(() => hotelService.setRoom(hotelId, roomNumber, roomType))
      .toThrow(HotelNotExistsException);
  });
});
