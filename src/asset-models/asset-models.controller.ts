import { Controller } from '@nestjs/common';
import { AssetModel } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import {
  CreateAssetModelDto,
  UpdateAssetModelDto,
} from '../common/dto/entity.dto';
import { AssetModelsService } from './asset-models.service';

@Controller('asset-models')
export class AssetModelsController extends BaseController<
  AssetModel,
  CreateAssetModelDto,
  UpdateAssetModelDto
> {
  constructor(private readonly assetModelsService: AssetModelsService) {
    super(assetModelsService);
  }
}
