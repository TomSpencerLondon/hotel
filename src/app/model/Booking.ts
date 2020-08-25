export class Booking{

  private _employeeId: number;
  private _hotelId: number;
  private _roomType: string;
  private _checkIn: Date;
  private _checkOut: Date;
  private _uuid: number;

  get uuid(): number {
    return this._uuid;
  }

  set uuid(value: number) {
    this._uuid = value;
  }

  get employeeId(): number {
    return this._employeeId;
  }

  set employeeId(value: number) {
    this._employeeId = value;
  }

  get hotelId(): number {
    return this._hotelId;
  }

  set hotelId(value: number) {
    this._hotelId = value;
  }

  get roomType(): string {
    return this._roomType;
  }

  set roomType(value: string) {
    this._roomType = value;
  }

  get checkIn(): Date {
    return this._checkIn;
  }

  set checkIn(value: Date) {
    this._checkIn = value;
  }

  get checkOut(): Date {
    return this._checkOut;
  }

  set checkOut(value: Date) {
    this._checkOut = value;
  }
}
