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
    findAll(query?: AssetQuery): Promise<{
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
                username: string;
                passwordHash: string;
                firstName: string | null;
                lastName: string | null;
                displayName: string | null;
                loginEnabled: boolean;
                companyId: number | null;
                locationId: number | null;
                refreshTokenHash: string | null;
                refreshTokenExpiresAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
            } | null;
            name: string | null;
            id: number;
            slug: string;
            companyId: number | null;
            locationId: number | null;
            createdAt: Date;
            updatedAt: Date;
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
            eolDate: Date | null;
            modelId: number;
            statusId: number;
            supplierId: number | null;
            checkedOutUserId: number | null;
        }[];
        total: number;
    }>;
    findOne(idOrSlug: string | number): Promise<Asset>;
    create(data: CreateAssetDto, userId: number): Promise<Asset>;
    update(idOrSlug: string | number, data: UpdateAssetDto, _userId: number): Promise<Asset>;
}
