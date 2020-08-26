import {Hotel} from '../model/Hotel';

export class HotelRepository{

  private hotels: Map<number, Hotel> = new Map();

  public persist(hotelId: number, hotelName: string): void{
    const hotel = new Hotel();
    hotel.id = hotelId;
    hotel.name = hotelName;

    this.hotels.set(hotelId, hotel);
  }

  public findById(hotelId: number): Hotel {
    return this.hotels.get(hotelId);
  }
}
