import { Asset } from '@prisma/client';
import { Request } from 'express';
import { BaseController } from '../common/base.controller';
import { CreateAssetDto, UpdateAssetDto } from './dto/assets.dto';
import { AssetsService, AssetQuery } from './assets.service';
export declare class AssetsController extends BaseController<Asset, CreateAssetDto, UpdateAssetDto> {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    findAll(query: AssetQuery): Promise<{
        records: any;
        total: any;
    }>;
    findOne(idOrSlug: string): Promise<{
        record: any;
    }>;
    update(idOrSlug: string, body: UpdateAssetDto, req: Request): Promise<{
        record: $Result.DefaultSelection<import(".prisma/client").Prisma.$AssetPayload<$Extensions.DefaultArgs>>;
    }>;
}
