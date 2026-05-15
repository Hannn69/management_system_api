import { Department } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../common/dto/entity.dto';
import { DepartmentsService } from './departments.service';
export declare class DepartmentsController extends BaseController<Department, CreateDepartmentDto, UpdateDepartmentDto> {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    findAll(query: any): Promise<{
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
}
