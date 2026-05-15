import { Location } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
export declare class LocationsService extends BaseService<Location, CreateSettingDto, UpdateSettingDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: any): Promise<{
        records: {
            parent: string;
            people: number;
            currentLocation: string;
            assignAsset: number;
            accessories: number;
            assignAccessories: number;
            components: number;
            consumables: number;
            childLocation: number;
            _count: {
                assets: number;
                children: number;
            };
            name: string;
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            fax: string | null;
            notes: string | null;
            parentId: number | null;
            managerId: number | null;
            companyId: number | null;
            currency: string | null;
            address: string | null;
            address2: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            zip: string | null;
            image: string | null;
        }[];
        total: number;
    }>;
    create(data: any, userId: number): Promise<Location>;
}
