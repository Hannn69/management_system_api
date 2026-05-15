import { Supplier } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSupplierDto, UpdateSupplierDto } from '../common/dto/entity.dto';
import { SuppliersService } from './suppliers.service';
export declare class SuppliersController extends BaseController<Supplier, CreateSupplierDto, UpdateSupplierDto> {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    findAll(query: any): Promise<{
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
}
