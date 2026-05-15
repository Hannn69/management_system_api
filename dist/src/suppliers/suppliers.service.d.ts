import { Supplier } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
export declare class SuppliersService extends BaseService<Supplier, CreateSettingDto, UpdateSettingDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: any): Promise<{
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
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
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
    create(data: any, userId: number): Promise<Supplier>;
}
