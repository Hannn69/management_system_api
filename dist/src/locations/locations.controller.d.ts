import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { LocationsService } from './locations.service';
export declare class LocationsController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
}
