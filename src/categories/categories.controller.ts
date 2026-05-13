import { Controller } from '@nestjs/common';
import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
  constructor(private readonly categoriesService: CategoriesService) {
    super(categoriesService);
  }
}
