import {Company} from './Company';

export class Employee {
  private _id: number;
  private _company: Company;


  get company(): Company {
    return this._company;
  }

  set company(value: Company) {
    this._company = value;
  }

  constructor(id: number) {
    this._id = id;
  }


  get id(): number {
    return this._id;
  }
}
