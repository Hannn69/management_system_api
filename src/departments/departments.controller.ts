import { Controller } from '@nestjs/common';
import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
  constructor(private readonly departmentsService: DepartmentsService) {
    super(departmentsService);
  }
}
