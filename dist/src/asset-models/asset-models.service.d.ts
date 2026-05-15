import { AssetModel } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetModelDto, UpdateAssetModelDto } from '../common/dto/entity.dto';
export declare class AssetModelsService extends BaseService<AssetModel, CreateAssetModelDto, UpdateAssetModelDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: any): Promise<{
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
    create(data: CreateAssetModelDto, userId: number): Promise<AssetModel>;
}
