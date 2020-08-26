import { Injectable } from '@angular/core';
import {Hotel} from '../model/Hotel';



@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor() { }


  addHotel(hotelId: number, hotelName: string): void {
  }

  setRoom(hotelId: number, roomNumber: number, master: string): void {
  }

  findHotelById(hotelId: number): Hotel {
    return new Hotel();
  }
}
