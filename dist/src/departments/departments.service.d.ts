import { Department } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
export declare class DepartmentsService extends BaseService<Department, CreateSettingDto, UpdateSettingDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: any): Promise<{
        records: {
            manager: string;
            location: string;
            people: number;
            name: string;
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            fax: string | null;
            notes: string | null;
            managerId: number | null;
            companyId: number | null;
            image: string | null;
            locationId: number | null;
        }[];
        total: number;
    }>;
    create(data: any, userId: number): Promise<Department>;
}
