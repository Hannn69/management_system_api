import { Asset } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/assets.dto';
export interface AssetQuery extends BaseQuery {
    category?: string;
}
export declare class AssetsService extends BaseService<Asset, CreateAssetDto, UpdateAssetDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    private formatAssetRecord;
    findAll(query?: AssetQuery): Promise<{
        records: any[];
        total: number;
    }>;
    findOne(idOrSlug: string | number): Promise<any>;
    create(data: CreateAssetDto, userId: number): Promise<Asset>;
    update(idOrSlug: string | number, data: UpdateAssetDto, _userId: number): Promise<Asset>;
}
