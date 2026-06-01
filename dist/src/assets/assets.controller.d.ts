import { Asset } from '@prisma/client';
import { Request } from 'express';
import { BaseController } from '../common/base.controller';
import { CreateAssetDto, UpdateAssetDto } from './dto/assets.dto';
import { AssetsService, AssetQuery } from './assets.service';
export declare class AssetsController extends BaseController<Asset, CreateAssetDto, UpdateAssetDto> {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    findAll(query: AssetQuery): Promise<{
        records: any[];
        total: number;
    }>;
    findOne(idOrSlug: string): Promise<{
        record: any;
    }>;
    update(idOrSlug: string, body: UpdateAssetDto, req: Request): Promise<{
        record: {
            name: string | null;
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: number | null;
            locationId: number | null;
            notes: string | null;
            image: string | null;
            isRequestable: boolean;
            assetTag: string;
            serial: string | null;
            isByod: boolean;
            warrantyMonths: number | null;
            expectedCheckin: Date | null;
            nextAuditDate: Date | null;
            orderNumber: string | null;
            purchaseDate: Date | null;
            purchaseCost: import("@prisma/client/runtime/library").Decimal | null;
            eolDate: Date | null;
            modelId: number;
            statusId: number;
            supplierId: number | null;
            checkedOutUserId: number | null;
        };
    }>;
}
