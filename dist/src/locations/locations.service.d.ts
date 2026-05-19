import { Location } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from '../common/dto/entity.dto';
export declare class LocationsService extends BaseService<Location, CreateLocationDto, UpdateLocationDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
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
    create(data: CreateLocationDto, userId: number): Promise<Location>;
}
