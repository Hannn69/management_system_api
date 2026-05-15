import { AssetModel } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateAssetModelDto, UpdateAssetModelDto } from '../common/dto/entity.dto';
import { AssetModelsService } from './asset-models.service';
export declare class AssetModelsController extends BaseController<AssetModel, CreateAssetModelDto, UpdateAssetModelDto> {
    private readonly assetModelsService;
    constructor(assetModelsService: AssetModelsService);
    findAll(query: any): Promise<{
        records: {
            category: string;
            manufacturer: string;
            modelNo: string | null;
            assets: number;
            assigned: number;
            remaining: number;
            percentRemaining: number;
            archived: number;
            eol: number | null;
            fieldset: string;
            _count: {
                assets: number;
            };
            name: string;
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            image: string | null;
            categoryId: number;
            manufacturerId: number;
            modelNumber: string | null;
            depreciationId: number | null;
            minQty: number | null;
            requireSerialNumber: boolean;
            eolMonths: number | null;
            fieldsetId: number | null;
            isRequestable: boolean;
        }[];
        total: number;
    }>;
}
