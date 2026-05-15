import { Asset } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/assets.dto';
export declare class AssetsService extends BaseService<Asset, CreateAssetDto, UpdateAssetDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query: any): Promise<{
        records: {
            model: string;
            category: string;
            status: string;
            checkedOutTo: string | null;
            location: string;
            purchaseCost: number;
            currentValue: number;
            company: {
                name: string;
                id: number;
                slug: string;
                email: string | null;
                createdAt: Date;
                updatedAt: Date;
                phone: string | null;
                fax: string | null;
                logo: string | null;
                notes: string | null;
            } | null;
            checkedOutUser: {
                id: number;
                slug: string;
                email: string;
                passwordHash: string;
                refreshTokenHash: string | null;
                refreshTokenExpiresAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
            } | null;
            name: string | null;
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            companyId: number | null;
            image: string | null;
            isRequestable: boolean;
            assetTag: string;
            serial: string | null;
            modelId: number;
            statusId: number;
            locationId: number | null;
            supplierId: number | null;
            checkedOutUserId: number | null;
            isByod: boolean;
            warrantyMonths: number | null;
            expectedCheckin: Date | null;
            nextAuditDate: Date | null;
            orderNumber: string | null;
            purchaseDate: Date | null;
            eolDate: Date | null;
        }[];
        total: number;
    }>;
    findOne(idOrSlug: string | number): Promise<Asset>;
    create(data: CreateAssetDto, userId: number): Promise<Asset>;
    update(idOrSlug: string | number, data: UpdateAssetDto, userId: number): Promise<Asset>;
}
