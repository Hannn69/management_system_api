import { Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { slugify } from '../common/utils/slugify';

@Injectable()
export class DepartmentsService extends BaseService<Department, CreateSettingDto, UpdateSettingDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'department');
  }

  async findAll(query: any = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || '';

    const where: any = {};
    if (search) {
      where.name = { contains: search };
    }

    const [records, total] = await Promise.all([
      this.prisma.department.findMany({
        where,
        include: {
          location: true,
          // manager: true, // We don't have this relation defined yet
        },
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

  async create(data: any, userId: number): Promise<Department> {
    return super.create(data, userId, { slug: slugify(data.name) });
  }
}
