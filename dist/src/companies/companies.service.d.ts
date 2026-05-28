import { Company } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../common/dto/entity.dto';
export declare class CompaniesService extends BaseService<Company, CreateCompanyDto, UpdateCompanyDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
        records: any;
        total: any;
    }>;
    create(data: CreateCompanyDto, userId: number): Promise<Company>;
}
