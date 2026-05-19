import { Controller } from '@nestjs/common';
import { Supplier } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController extends BaseController<
  Supplier,
  CreateSettingDto,
  UpdateSettingDto
> {
  constructor(private readonly suppliersService: SuppliersService) {
    super(suppliersService);
  }
}
