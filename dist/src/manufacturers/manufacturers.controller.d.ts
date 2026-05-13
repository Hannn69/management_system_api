import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { ManufacturersService } from './manufacturers.service';
export declare class ManufacturersController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
    private readonly manufacturersService;
    constructor(manufacturersService: ManufacturersService);
}
