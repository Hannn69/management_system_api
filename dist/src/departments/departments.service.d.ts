import { Department } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../common/dto/entity.dto';
export declare class DepartmentsService extends BaseService<Department, CreateDepartmentDto, UpdateDepartmentDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
        records: {
            manager: string;
            location: string;
            people: number;
            name: string;
            id: number;
            slug: string;
            companyId: number | null;
            locationId: number | null;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            fax: string | null;
            notes: string | null;
            managerId: number | null;
            image: string | null;
        }[];
        total: number;
    }>;
    create(data: CreateDepartmentDto, userId: number): Promise<Department>;
}
