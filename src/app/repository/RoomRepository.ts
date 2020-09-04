import {Room} from '../model/Room';
import {RoomTypes} from '../model/RoomTypes';

export class RoomRepository{
  private rooms: Room[] = [];

  public persist(hotelId: number, roomNumber: number, roomType: RoomTypes): void {
    this.rooms.push(new Room(hotelId, roomNumber, roomType));
  }

  public findByHotelAndNumber(hotelId: number, roomNumber: number): Room{
    return this.rooms.find(room => (room.hotelId === hotelId) && (room.roomNumber === roomNumber));
  }

  update(hotelId: number, roomNumber: number, roomType: RoomTypes): void {
    const room = this.findByHotelAndNumber(hotelId, roomNumber);
    room.hotelId = hotelId;
    room.roomNumber = roomNumber;
    room.roomType = roomType;
  }

  findByHotelAndType(hotelId: number, roomTypes: RoomTypes): Room[] {
    return this.rooms.filter(r => (r.hotelId === hotelId) && (r.roomType === roomTypes));
  }
}
