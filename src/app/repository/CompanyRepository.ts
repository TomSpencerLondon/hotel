import {Company} from '../model/Company';

export class CompanyRepository {
  private companies = new Map<number, Company>();

  public persist(company: Company): void {
    this.companies.set(company.id, company);
  }

  public findById(companyId: number): Company {
    return this.companies.get(companyId);
  }
}
