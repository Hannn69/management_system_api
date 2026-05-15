import { Manufacturer } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateManufacturerDto, UpdateManufacturerDto } from '../common/dto/entity.dto';
import { ManufacturersService } from './manufacturers.service';
export declare class ManufacturersController extends BaseController<Manufacturer, CreateManufacturerDto, UpdateManufacturerDto> {
    private readonly manufacturersService;
    constructor(manufacturersService: ManufacturersService);
    findAll(query: any): Promise<{
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
}
