import { Controller } from '@nestjs/common';
import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { ManufacturersService } from './manufacturers.service';

@Controller('manufacturers')
export class ManufacturersController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
  constructor(private readonly manufacturersService: ManufacturersService) {
    super(manufacturersService);
  }
}
