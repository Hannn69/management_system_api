import { Department } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../common/dto/entity.dto';
export declare class DepartmentsService extends BaseService<Department, CreateDepartmentDto, UpdateDepartmentDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
        records: any;
        total: any;
    }>;
    create(data: CreateDepartmentDto, userId: number): Promise<Department>;
}
