import { Company } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
export declare class CompaniesService extends BaseService<Company, CreateSettingDto, UpdateSettingDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: any): Promise<{
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
    create(data: CreateSettingDto, userId: number): Promise<Company>;
}
