import { AssetModel } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateAssetModelDto, UpdateAssetModelDto } from '../common/dto/entity.dto';
import { AssetModelsService } from './asset-models.service';
export declare class AssetModelsController extends BaseController<AssetModel, CreateAssetModelDto, UpdateAssetModelDto> {
    private readonly assetModelsService;
    constructor(assetModelsService: AssetModelsService);
}
