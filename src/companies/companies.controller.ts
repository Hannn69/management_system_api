import { Controller } from '@nestjs/common';
import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
  constructor(private readonly companiesService: CompaniesService) {
    super(companiesService);
  }
}
