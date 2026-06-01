import { Supplier } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
export declare class SuppliersService extends BaseService<Supplier, CreateSettingDto, UpdateSettingDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
        records: {
            assets: number;
            accessories: number;
            licenses: number;
            components: number;
            consumables: number;
            _count: {
                assets: number;
            };
            name: string;
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string | null;
            fax: string | null;
            notes: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            zip: string | null;
            image: string | null;
            url: string | null;
            contactName: string | null;
        }[];
        total: number;
    }>;
    create(data: CreateSettingDto, userId: number): Promise<Supplier>;
}
