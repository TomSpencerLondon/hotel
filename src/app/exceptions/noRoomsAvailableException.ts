export class NoRoomsAvailableException extends Error{

  constructor(message: string) {
    super(message);
  }
}
