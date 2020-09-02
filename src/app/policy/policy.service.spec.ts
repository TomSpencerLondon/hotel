import {PolicyService} from './policy.service';
import {RoomTypes} from '../model/RoomTypes';
import {EmployeePolicy} from '../model/EmployeePolicy';
import {CompanyPolicy} from '../model/CompanyPolicy';
import {Company} from '../model/Company';
import {Employee} from '../model/Employee';

describe('PolicyService', () => {
  let policyService: PolicyService;

  let policyRepository;
  let employeeRepository;

  let employeeId: number;
  let companyId: number;
  let roomTypes: RoomTypes[];

  beforeEach(() => {
    employeeId = 1;
    companyId = 101;
    roomTypes = [RoomTypes.STANDARD];

    employeeRepository = {
      findById: jest.fn()
    };

    policyRepository = {
      persistEmployeePolicy: jest.fn(),
      persistCompanyPolicy: jest.fn(),
      updateEmployeePolicy: jest.fn(),
      updateCompanyPolicy: jest.fn(),
      findForEmployee: jest.fn(),
      findForCompany: jest.fn()
    };

    policyService = new PolicyService(policyRepository, employeeRepository);
  });

  it('should create employee policy for single room type', () => {
    // when
    policyService.setEmployeePolicy(employeeId, roomTypes);

    // then
    expect(policyRepository.persistEmployeePolicy.mock.calls.length).toBe(1);
  });

  it('should create employee policies for many room types', () => {
    // given
    roomTypes = [RoomTypes.STANDARD, RoomTypes.MASTER];

    // when
    policyService.setEmployeePolicy(employeeId, roomTypes);

    // then
    expect(policyRepository.persistEmployeePolicy.mock.calls.length).toBe(2);
  });

  it('should create company policy for single room type', () => {
    // when
    policyService.setCompanyPolicy(companyId, roomTypes);

    // then
    expect(policyRepository.persistCompanyPolicy.mock.calls.length).toBe(1);
  });

  it('should create company policies for multiple room types', () => {
    // given
    roomTypes = [RoomTypes.STANDARD, RoomTypes.MASTER];

    // when
    policyService.setCompanyPolicy(companyId, roomTypes);

    // then
    expect(policyRepository.persistCompanyPolicy.mock.calls.length).toBe(2);
  });

  it('should update employee policy given it already exists', () => {
    // when
    policyRepository.findForEmployee.mockReturnValue(new EmployeePolicy());

    // when
    policyService.setEmployeePolicy(employeeId, roomTypes);

    // then
    expect(policyRepository.updateEmployeePolicy.mock.calls.length).toBe(1);
  });

  it('should update company policy given it already exists', () => {
    // when
    policyRepository.findForCompany.mockReturnValue(new EmployeePolicy());

    // when
    policyService.setCompanyPolicy(employeeId, roomTypes);

    // then
    expect(policyRepository.updateCompanyPolicy.mock.calls.length).toBe(1);
  });

  it('should allow booking given no policies exist', () => {
    // when
    const roomType = RoomTypes.STANDARD;
    policyRepository.findForCompany.mockReturnValue(null);
    policyRepository.findForEmployee.mockReturnValue(null);

    // when
    const isBookingAllowed = policyService.isBookingAllowed(employeeId, roomType);

    // then
    expect(isBookingAllowed).toBeTruthy();
  });

  it('should allow booking given employee policy exists', () => {
    // when
    const roomType = RoomTypes.STANDARD;

    const employeePolicy = new EmployeePolicy();
    employeePolicy.employeeId = employeeId;
    employeePolicy.roomTypes = [RoomTypes.STANDARD];

    policyRepository.findForCompany.mockReturnValue(null);
    policyRepository.findForEmployee.mockReturnValue(employeePolicy);

    // when
    const isBookingAllowed = policyService.isBookingAllowed(employeeId, roomType);

    // then
    expect(isBookingAllowed).toBeTruthy();
  });

  it('should allow booking given company policy exists', () => {
    // when
    const roomType = RoomTypes.STANDARD;

    const companyPolicy = new CompanyPolicy();
    companyPolicy.companyId = companyId;
    companyPolicy.roomTypes = [RoomTypes.STANDARD];

    policyRepository.findForCompany.mockReturnValue(companyPolicy);
    policyRepository.findForEmployee.mockReturnValue(null);

    // when
    const isBookingAllowed = policyService.isBookingAllowed(employeeId, roomType);

    // then
    expect(isBookingAllowed).toBeTruthy();
  });

  it('should not allow booking given insufficient employee policy exists', () => {
    // when
    const roomType = RoomTypes.MASTER;

    const employeePolicy = new EmployeePolicy();
    employeePolicy.employeeId = employeeId;
    employeePolicy.roomTypes = [RoomTypes.STANDARD];

    policyRepository.findForCompany.mockReturnValue(null);
    policyRepository.findForEmployee.mockReturnValue(employeePolicy);

    // when
    const isBookingAllowed = policyService.isBookingAllowed(employeeId, roomType);

    // then
    expect(isBookingAllowed).toBeFalsy();
  });

  it('should not allow booking given insufficient company policy exists', () => {
    // when
    const roomType = RoomTypes.MASTER;

    const companyPolicy = new CompanyPolicy();
    companyPolicy.companyId = companyId;
    companyPolicy.roomTypes = [RoomTypes.STANDARD];

    const company = new Company(companyId);
    const employee = new Employee(employeeId);
    employee.company = company;

    policyRepository.findForCompany.mockReturnValue(companyPolicy);
    policyRepository.findForEmployee.mockReturnValue(null);
    employeeRepository.findById.mockReturnValue(employee);

    // when
    const isBookingAllowed = policyService.isBookingAllowed(employeeId, roomType);

    // then
    expect(isBookingAllowed).toBeFalsy();
  });

  it('employee policy allows but company does not allow', () => {
    // when
    const roomType = RoomTypes.MASTER;

    const companyPolicy = new CompanyPolicy();
    companyPolicy.companyId = companyId;
    companyPolicy.roomTypes = [RoomTypes.STANDARD];

    const employeePolicy = new EmployeePolicy();
    employeePolicy.employeeId = employeeId;
    employeePolicy.roomTypes = [RoomTypes.MASTER];

    const company = new Company(companyId);
    const employee = new Employee(employeeId);
    employee.company = company;

    policyRepository.findForCompany.mockReturnValue(companyPolicy);
    policyRepository.findForEmployee.mockReturnValue(employeePolicy);
    employeeRepository.findById.mockReturnValue(employee);

    // when
    const isBookingAllowed = policyService.isBookingAllowed(employeeId, roomType);

    // then
    expect(isBookingAllowed).toBeTruthy();
  });


});
