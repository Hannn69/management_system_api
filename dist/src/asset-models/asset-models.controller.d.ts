import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { AssetModelsService } from './asset-models.service';
export declare class AssetModelsController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
    private readonly assetModelsService;
    constructor(assetModelsService: AssetModelsService);
}
