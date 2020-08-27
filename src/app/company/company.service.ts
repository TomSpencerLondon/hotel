import { Injectable } from '@angular/core';
import {CompanyRepository} from '../repository/CompanyRepository';
import {Company} from '../model/Company';
import {Employee} from '../model/Employee';
import {EmployeeRepository} from '../repository/EmployeeRepository';
import {CompanyExistsException} from '../exceptions/companyExistsException';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private companyRepository: CompanyRepository,
              private employeeRepository: EmployeeRepository) { }



addEmployee(companyId: number, employeeId: number): void {
  let company: Company = this.companyRepository.findById(companyId);

  if (!company){
     company = new Company(companyId);
     this.companyRepository.persist(company);
  }

  let employee: Employee = this.employeeRepository.findById(employeeId);

  if (!employee) {
    employee = new Employee(employeeId);
    this.employeeRepository.persist(employee);
  }
  }
}
