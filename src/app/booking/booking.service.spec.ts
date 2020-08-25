import { TestBed } from '@angular/core/testing';

import { BookingService } from './booking.service';
import {IdGenerator} from '../utils/idGenerator';

describe('BookingService', () => {
  let bookingService: BookingService;

  beforeEach(() => {
    const idGenerator = new IdGenerator();
    bookingService = new BookingService(idGenerator);
    TestBed.configureTestingModule({});
    bookingService = TestBed.inject(BookingService);
  });

  it('should be created', () => {
    expect(bookingService).toBeTruthy();
  });
});
