import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { DepartmentsService } from './departments.service';
export declare class DepartmentsController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
}
