import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { CategoriesService } from './categories.service';
export declare class CategoriesController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
}
