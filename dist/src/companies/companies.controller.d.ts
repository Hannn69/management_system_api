import { Company } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateCompanyDto, UpdateCompanyDto } from '../common/dto/entity.dto';
import { CompaniesService } from './companies.service';
export declare class CompaniesController extends BaseController<Company, CreateCompanyDto, UpdateCompanyDto> {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
}
