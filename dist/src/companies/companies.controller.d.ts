import { Company } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateCompanyDto, UpdateCompanyDto } from '../common/dto/entity.dto';
import { CompaniesService } from './companies.service';
export declare class CompaniesController extends BaseController<Company, CreateCompanyDto, UpdateCompanyDto> {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    findAll(query: any): Promise<{
        records: {
            assets: number;
            users: number;
            licenses: number;
            accessories: number;
            consumables: number;
            components: number;
            _count: {
                locations: number;
                departments: number;
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
            logo: string | null;
            notes: string | null;
        }[];
        total: number;
    }>;
}
