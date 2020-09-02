import {Policy} from './Policy';

export class EmployeePolicy extends Policy{

  private _employeeId: number;

  get employeeId(): number {
    return this._employeeId;
  }

  set employeeId(value: number) {
    this._employeeId = value;
  }
}
