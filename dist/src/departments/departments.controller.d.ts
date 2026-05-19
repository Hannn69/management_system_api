import { Department } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../common/dto/entity.dto';
import { DepartmentsService } from './departments.service';
export declare class DepartmentsController extends BaseController<Department, CreateDepartmentDto, UpdateDepartmentDto> {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
}
