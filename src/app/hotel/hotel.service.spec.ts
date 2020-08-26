import { TestBed } from '@angular/core/testing';

import { HotelService } from './hotel.service';

describe('HotelService', () => {
  let hotelService: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    hotelService = TestBed.inject(HotelService);
  });

  it('should be created', () => {
    expect(hotelService).toBeTruthy();
  });

  it('should add a hotel', () => {
    // given
    const hotelId = 1;
    const hotelName = 'Marriott - London';

    // when
    hotelService.addHotel(hotelId, hotelName);
    // then
    expect(hotelService.findHotelById(hotelId)).not.toBe(null);
  });
});
