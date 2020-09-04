import {RoomTypes} from './RoomTypes';

export class Room{
  private _roomNumber: number;
  private _hotelId: number;
  private _roomType: RoomTypes;

  constructor(hotelId: number, roomNumber: number, roomType: RoomTypes) {
    this._hotelId = hotelId;
    this._roomType = roomType;
    this._roomNumber = roomNumber;
  }

  get roomNumber(): number {
    return this._roomNumber;
  }

  get hotelId(): number {
    return this._hotelId;
  }

  get roomType(): RoomTypes {
    return this._roomType;
  }

  set roomNumber(value: number) {
    this._roomNumber = value;
  }

  set hotelId(value: number) {
    this._hotelId = value;
  }

  set roomType(value: RoomTypes) {
    this._roomType = value;
  }
}
