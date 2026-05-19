import { Injectable } from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../common/dto/entity.dto';

@Injectable()
export class CompaniesService extends BaseService<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'company');
  }

  async findAll(query: BaseQuery = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || '';

    const where: Prisma.CompanyWhereInput = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const sort = query.sort || 'createdAt';
    const order = (query.order as 'asc' | 'desc') || 'desc';

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
        orderBy: { [sort]: order },
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

  async create(data: CreateCompanyDto, userId: number): Promise<Company> {
    return super.create(data, userId);
  }
}
