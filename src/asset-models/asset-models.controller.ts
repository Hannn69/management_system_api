import { Controller } from '@nestjs/common';
import { SettingRecord } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { AssetModelsService } from './asset-models.service';

@Controller('asset-models')
export class AssetModelsController extends BaseController<SettingRecord, CreateSettingDto, UpdateSettingDto> {
  constructor(private readonly assetModelsService: AssetModelsService) {
    super(assetModelsService);
  }
}
