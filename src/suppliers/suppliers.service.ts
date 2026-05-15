import { Injectable } from '@nestjs/common';
import { Supplier } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { slugify } from '../common/utils/slugify';

@Injectable()
export class SuppliersService extends BaseService<Supplier, CreateSettingDto, UpdateSettingDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'supplier');
  }

  async findAll(query: any = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || '';

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { city: { contains: search } },
      ];
    }

    const [records, total] = await Promise.all([
      this.prisma.supplier.findMany({
        where,
        include: {
          _count: {
            select: {
              assets: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.supplier.count({ where }),
    ]);

    const formatted = records.map((r) => ({
      ...r,
      assets: r._count.assets,
      accessories: 0,
      licenses: 0,
      components: 0,
      consumables: 0,
    }));

    return { records: formatted, total };
  }

  async create(data: any, userId: number): Promise<Supplier> {
    return super.create(data, userId, { slug: slugify(data.name) });
  }
}
