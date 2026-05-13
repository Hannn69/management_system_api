import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { CompaniesService } from './companies.service';
export declare class CompaniesController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
}
