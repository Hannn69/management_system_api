import { Company } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../common/dto/entity.dto';
export declare class CompaniesService extends BaseService<Company, CreateCompanyDto, UpdateCompanyDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
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
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string | null;
            fax: string | null;
            logo: string | null;
            notes: string | null;
        }[];
        total: number;
    }>;
    create(data: CreateCompanyDto, userId: number): Promise<Company>;
}
