import { Injectable } from '@angular/core';
import {RoomTypes} from '../model/RoomTypes';
import {PolicyRepository} from '../repository/PolicyRepository';
import {PolicyExistsException} from '../exceptions/policyExistsException';
import {EmployeePolicy} from '../model/EmployeePolicy';
import {EmployeeRepository} from '../repository/EmployeeRepository';
import {Policy} from '../model/Policy';
import {CompanyPolicy} from "../model/CompanyPolicy";

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

    if (employeePolicy){
      return this.isPolicySufficient(employeePolicy, roomType);
    }else {
      const companyPolicy = this.findCompanyPolicy(employeeId);
      if (companyPolicy){
        return this.isPolicySufficient(companyPolicy, roomType);
      }
    }

    return true;
  }

  private isPolicySufficient(policy: Policy, roomType: RoomTypes): boolean {
    return policy && policy.roomTypes.includes(roomType);
  }

  private findCompanyPolicy(employeeId: number): CompanyPolicy{
    const employee = this.employeeRepository.findById(employeeId);

    if (employee){
      return this.policyRepository.findForCompany(employee.company.id);
    }
    return null;
  }
}
