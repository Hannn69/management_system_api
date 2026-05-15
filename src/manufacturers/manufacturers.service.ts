import { Injectable } from '@nestjs/common';
import { Manufacturer } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { slugify } from '../common/utils/slugify';

@Injectable()
export class ManufacturersService extends BaseService<Manufacturer, CreateSettingDto, UpdateSettingDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'manufacturer');
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
      this.prisma.manufacturer.findMany({
        where,
        include: {
          _count: {
            select: {
              assetModels: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.manufacturer.count({ where }),
    ]);

    const formatted = records.map((r) => ({
      ...r,
      assets: r._count.assetModels, // Placeholder
      licenses: 0,
      consumables: 0,
      accessories: 0,
      components: 0,
    }));

    return { records: formatted, total };
  }

  async create(data: any, userId: number): Promise<Manufacturer> {
    return super.create(data, userId, { slug: slugify(data.name) });
  }
}
