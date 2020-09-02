import {RoomTypes} from '../model/RoomTypes';
import {EmployeePolicy} from '../model/EmployeePolicy';
import {CompanyPolicy} from '../model/CompanyPolicy';

export class PolicyRepository{
  private employeePolicies = new Map<number, EmployeePolicy>();

  public persistEmployeePolicy(employeeId: number, roomType: RoomTypes): void{
    const employeePolicy = new EmployeePolicy();
    employeePolicy.employeeId = employeeId;
    employeePolicy.addRoomType(roomType);

    this.employeePolicies.set(employeeId, employeePolicy);
  }

  persistCompanyPolicy(companyId: number, roomType: RoomTypes): void {

  }


  findForEmployee(employeeId: number): EmployeePolicy {
    return this.employeePolicies.get(employeeId);
  }

  updateEmployeePolicy(employeeId: number, roomType: RoomTypes): void {
    const employeePolicy = this.employeePolicies.get(employeeId);
    employeePolicy.addRoomType(roomType);
  }

  findForCompany(companyId: number): CompanyPolicy {
    return null;
  }

  updateCompanyPolicy(companyId: number, roomType: RoomTypes): void {

  }

  deleteEmployee(employeeId: number): void {
    this.employeePolicies.delete(employeeId);
  }
}
