import { Injectable } from '@angular/core';
import {Hotel} from '../model/Hotel';
import {HotelExistsException} from '../exceptions/hotelExistsException';
import {HotelRepository} from '../repository/HotelRepository';
import {RoomRepository} from '../repository/RoomRepository';
import {HotelNotExistsException} from '../exceptions/hotelNotExistsException';
import {RoomTypes} from '../model/RoomTypes';



@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private hotelRepository: HotelRepository,
              private roomRepository: RoomRepository) { }

  addHotel(hotelId: number, hotelName: string): void {
    if (this.findHotelById(hotelId)) {
      throw new HotelExistsException('');
    }

    this.hotelRepository.persist(hotelId, hotelName);
  }

  setRoom(hotelId: number, roomNumber: number, roomType: RoomTypes): void {
    if (!this.hotelRepository.findById(hotelId)){
      throw new HotelNotExistsException();
    }

    if (this.roomRepository.findByHotelAndNumber(hotelId, roomNumber)){
      this.roomRepository.update(hotelId, roomNumber, roomType);
    }else{
      this.roomRepository.persist(hotelId, roomNumber, roomType);
    }

  }

  findHotelById(hotelId: number): Hotel {
    return this.hotelRepository.findById(hotelId);
  }
}
