import {Policy} from './Policy';

export class CompanyPolicy extends Policy{

  private _companyId: number;

  get companyId(): number {
    return this._companyId;
  }

  set companyId(value: number) {
    this._companyId = value;
  }
}
