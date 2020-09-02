import {CompanyService} from './company.service';
import {Company} from '../model/Company';
import {Employee} from '../model/Employee';

describe('CompanyService', () => {
  let companyService: CompanyService;
  const companyId = 1;
  const employeeId = 1;
  let companyRepository;
  let employeeRepository;

  beforeEach(() => {
    companyRepository = {
      persist: jest.fn(),
      findById: jest.fn()
    };

    employeeRepository = {
      persist: jest.fn(),
      findById: jest.fn(),
      delete: jest.fn()
    };
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
    companyService.addEmployee(companyId, employeeId);
    // then
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

  it('should not add employee if already exists in the same company', () => {
    // given
    companyRepository.findById.mockReturnValue(new Company(companyId));
    employeeRepository.findById.mockReturnValue(new Employee(employeeId));
    // when
    companyService.addEmployee(companyId, employeeId);
    // then

    expect(employeeRepository.persist.mock.calls.length).toBe(0);
  });

  it('should delete an employee', () => {
    // given
    employeeRepository.findById.mockReturnValue(new Employee(employeeId));

    // when
    companyService.deleteEmployee(employeeId);

    expect(employeeRepository.delete.mock.calls.length).toBe(1);
  });

  it('should not delete an employee', () => {
    // when
    companyService.deleteEmployee(employeeId);

    // then
    expect(employeeRepository.delete.mock.calls.length).toBe(0);

  });
});
