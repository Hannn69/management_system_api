import { Manufacturer } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
export declare class ManufacturersService extends BaseService<Manufacturer, CreateSettingDto, UpdateSettingDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: any): Promise<{
        records: {
            assets: number;
            licenses: number;
            consumables: number;
            accessories: number;
            components: number;
            _count: {
                assetModels: number;
            };
            name: string;
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            image: string | null;
            url: string | null;
            supportUrl: string | null;
            warrantyLookupUrl: string | null;
            supportPhone: string | null;
            supportEmail: string | null;
        }[];
        total: number;
    }>;
    create(data: any, userId: number): Promise<Manufacturer>;
}
