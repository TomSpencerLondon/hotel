export class CompanyExistsException extends Error{

  constructor(message: string) {
    super(message);
  }
}
