import {RoomTypes} from '../model/RoomTypes';
import {EmployeePolicy} from '../model/EmployeePolicy';
import {CompanyPolicy} from '../model/CompanyPolicy';

export class PolicyRepository{
  private employeePolicies = new Map<number, EmployeePolicy>();
  private companyPolicies  = new Map<number, CompanyPolicy>();

  public persistEmployeePolicy(employeeId: number, roomType: RoomTypes): void{
    const employeePolicy = new EmployeePolicy();
    employeePolicy.employeeId = employeeId;
    employeePolicy.addRoomType(roomType);

    this.employeePolicies.set(employeeId, employeePolicy);
  }

  persistCompanyPolicy(companyId: number, roomType: RoomTypes): void {
    const companyPolicy = new CompanyPolicy();
    companyPolicy.companyId = companyId;
    companyPolicy.addRoomType(roomType);

    this.companyPolicies.set(companyId, companyPolicy);
  }


  findForEmployee(employeeId: number): EmployeePolicy {
    return this.employeePolicies.get(employeeId);
  }

  updateEmployeePolicy(employeeId: number, roomType: RoomTypes): void {
    const employeePolicy = this.employeePolicies.get(employeeId);
    employeePolicy.addRoomType(roomType);
  }

  findForCompany(companyId: number): CompanyPolicy {
    return this.companyPolicies.get(companyId);
  }

  updateCompanyPolicy(companyId: number, roomType: RoomTypes): void {
    const companyPolicy = this.findForCompany(companyId);
    companyPolicy.addRoomType(roomType);
  }

  deleteEmployee(employeeId: number): void {
    this.employeePolicies.delete(employeeId);
  }
}
