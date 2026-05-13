import { Controller } from '@nestjs/common';
import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
  constructor(private readonly suppliersService: SuppliersService) {
    super(suppliersService);
  }
}
