import { Injectable } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from '../common/dto/entity.dto';

@Injectable()
export class DepartmentsService extends BaseService<
  Department,
  CreateDepartmentDto,
  UpdateDepartmentDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'department');
  }

  async findAll(query: BaseQuery = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || '';
    const sort = query.sort || 'createdAt';
    const order = (query.order as 'asc' | 'desc') || 'desc';

    const where: Prisma.DepartmentWhereInput = {};
    if (search) {
      where.name = { contains: search };
    }

    const [records, total] = await Promise.all([
      this.prisma.department.findMany({
        where,
        include: {
          location: true,
        },
        orderBy: { [sort]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.department.count({ where }),
    ]);

    const formatted = records.map((r) => ({
      ...r,
      manager: r.managerId ? `User #${r.managerId}` : 'N/A',
      location: r.location ? r.location.name : 'N/A',
      people: 0, // Placeholder
    }));

    return { records: formatted, total };
  }

  async create(data: CreateDepartmentDto, userId: number): Promise<Department> {
    return super.create(data, userId);
  }
}
