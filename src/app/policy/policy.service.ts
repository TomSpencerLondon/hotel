import { Injectable } from '@angular/core';
import {RoomTypes} from '../model/RoomTypes';
import {PolicyRepository} from '../repository/PolicyRepository';
import {PolicyExistsException} from '../exceptions/policyExistsException';
import {EmployeePolicy} from '../model/EmployeePolicy';
import {EmployeeRepository} from '../repository/EmployeeRepository';
import {Policy} from '../model/Policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private policyRepository: PolicyRepository,
              private employeeRepository: EmployeeRepository) { }

  setEmployeePolicy(employeeId: number, roomTypes: RoomTypes[]): void {
    roomTypes.forEach(roomType => {

      const employeePolicy = this.policyRepository.findForEmployee(employeeId);

      if (employeePolicy){
        this.policyRepository.updateEmployeePolicy(employeeId, roomType);
      }else{
        this.policyRepository.persistEmployeePolicy(employeeId, roomType);
      }

    });
  }

  setCompanyPolicy(companyId: number, roomTypes: RoomTypes[]): void {
    roomTypes.forEach(roomType => {

      const companyPolicy = this.policyRepository.findForCompany(companyId);

      if (companyPolicy){
        this.policyRepository.updateCompanyPolicy(companyId, roomType);
      }else{
        this.policyRepository.persistCompanyPolicy(companyId, roomType);
      }
    });
  }

  isBookingAllowed(employeeId: number, roomType: RoomTypes): boolean {
    const employeePolicy = this.policyRepository.findForEmployee(employeeId);
    let companyPolicy;

    const employee = this.employeeRepository.findById(employeeId);

    if (employee){
      companyPolicy = this.policyRepository.findForCompany(employee.company.id);
    }

    if (companyPolicy){
      return this.isPolicySufficient(companyPolicy, roomType);
    }else if (employeePolicy){
      return this.isPolicySufficient(employeePolicy, roomType);
    }

    return true;
  }

  private isPolicySufficient(policy: Policy, roomType: RoomTypes): boolean {
    return policy && policy.roomTypes.includes(roomType);
  }
}
