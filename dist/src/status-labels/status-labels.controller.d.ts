import { StatusLabel } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { StatusLabelsService } from './status-labels.service';
export declare class StatusLabelsController extends BaseController<StatusLabel, CreateSettingDto, UpdateSettingDto> {
    private readonly statusLabelsService;
    constructor(statusLabelsService: StatusLabelsService);
}
