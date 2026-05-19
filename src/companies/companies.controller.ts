import { Controller } from '@nestjs/common';
import { Company } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateCompanyDto, UpdateCompanyDto } from '../common/dto/entity.dto';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController extends BaseController<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  constructor(private readonly companiesService: CompaniesService) {
    super(companiesService);
  }
}
