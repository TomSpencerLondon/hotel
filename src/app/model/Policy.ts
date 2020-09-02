import {RoomTypes} from './RoomTypes';

export class Policy{

  private _roomTypes: RoomTypes[];


  get roomTypes(): RoomTypes[] {
    return this._roomTypes;
  }

  set roomTypes(value: RoomTypes[]) {
    this._roomTypes = value;
  }
}
