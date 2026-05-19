import { Location } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { LocationsService } from './locations.service';
export declare class LocationsController extends BaseController<Location, CreateSettingDto, UpdateSettingDto> {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
}
