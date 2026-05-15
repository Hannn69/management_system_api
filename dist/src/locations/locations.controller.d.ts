import { Location } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateLocationDto, UpdateLocationDto } from '../common/dto/entity.dto';
import { LocationsService } from './locations.service';
export declare class LocationsController extends BaseController<Location, CreateLocationDto, UpdateLocationDto> {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    findAll(query: any): Promise<{
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
}
