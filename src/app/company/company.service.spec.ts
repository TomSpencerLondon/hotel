import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';
import {Company} from '../model/Company';
import {Employee} from '../model/Employee';
import {HotelNotExistsException} from "../exceptions/hotelNotExistsException";
import {CompanyExistsException} from "../exceptions/companyExistsException";

describe('CompanyService', () => {
  let companyService: CompanyService;
  const companyId = 1;
  const employeeId = 1;
  const companyRepository = {
    persist: jest.fn(),
    findById: jest.fn()
  };

  const employeeRepository = {
    persist: jest.fn()
  };

  beforeEach(() => {
    companyService = new CompanyService(companyRepository, employeeRepository);
  });

  it('should add company when adding an employee', () => {
    // given
    // when
    companyService.addEmployee(companyId, employeeId);
    // then
    expect(companyRepository.persist.mock.calls.length).toBe(1);

    expect(companyRepository.persist.mock.calls[0][0] instanceof Company).toBeTruthy();
  });

  it('should add employee without adding company', () => {
    // given
    companyRepository.findById.mockReturnValue(new Company(companyId));
    // when
    // then
    expect(() => companyService.addEmployee(companyId, employeeId))
      .toThrow(CompanyExistsException);
    expect(companyRepository.persist.mock.calls.length).toBe(0);
    expect(employeeRepository.persist.mock.calls[0][0] instanceof Employee).toBeTruthy();

  });

  it('should add employee', () => {
    // given
    // when
    companyService.addEmployee(companyId, employeeId);
    // then
    expect(employeeRepository.persist.mock.calls[0][0] instanceof Employee).toBeTruthy();
  });
});
