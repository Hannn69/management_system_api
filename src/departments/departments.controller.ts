import { Controller } from '@nestjs/common';
import { Department } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from '../common/dto/entity.dto';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController extends BaseController<
  Department,
  CreateDepartmentDto,
  UpdateDepartmentDto
> {
  constructor(private readonly departmentsService: DepartmentsService) {
    super(departmentsService);
  }
}
