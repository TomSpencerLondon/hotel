import {Employee} from '../model/Employee';

export class EmployeeRepository {
  private employees = new Map<number, Employee>();

  public persist(employee: Employee): void {
    this.employees.set(employee.id, employee);
  }

  public findById(employeeId: number): Employee {
    return this.employees.get(employeeId);
  }

  delete(employeeId: number): void {
    this.employees.delete(employeeId);
  }
}
