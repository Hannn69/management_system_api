import { AssetModel } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetModelDto, UpdateAssetModelDto } from '../common/dto/entity.dto';
export declare class AssetModelsService extends BaseService<AssetModel, CreateAssetModelDto, UpdateAssetModelDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
        records: any;
        total: any;
    }>;
    create(data: CreateAssetModelDto, userId: number): Promise<AssetModel>;
}
