import {RoomTypes} from '../model/RoomTypes';
import {EmployeePolicy} from '../model/EmployeePolicy';
import {CompanyPolicy} from '../model/CompanyPolicy';

export class PolicyRepository{

  public persistEmployeePolicy(employeeId: number, roomType: RoomTypes): void{

  }

  persistCompanyPolicy(companyId: number, roomType: RoomTypes): void {

  }

  findForEmployee(employeeId: number): EmployeePolicy {
    return null;
  }

  updateEmployeePolicy(employeeId: number, roomType: RoomTypes): void {


  }

  findForCompany(companyId: number): CompanyPolicy {
    return null;
  }

  updateCompanyPolicy(companyId: number, roomType: RoomTypes): void {

  }
}
