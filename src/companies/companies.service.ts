import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { slugify } from '../common/utils/slugify';

@Injectable()
export class CompaniesService extends BaseService<Company, CreateSettingDto, UpdateSettingDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'company');
  }

  async findAll(query: any = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || '';

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [records, total] = await Promise.all([
      this.prisma.company.findMany({
        where,
        include: {
          _count: {
            select: {
              assets: true,
              locations: true,
              departments: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.company.count({ where }),
    ]);

    const formatted = records.map((r) => ({
      ...r,
      assets: r._count.assets,
      users: 0, // Placeholder
      licenses: 0, // Placeholder
      accessories: 0, // Placeholder
      consumables: 0, // Placeholder
      components: 0, // Placeholder
    }));

    return { records: formatted, total };
  }

  async create(data: CreateSettingDto, userId: number): Promise<Company> {
    return super.create(data, userId, { slug: slugify(data.name) });
  }
}
