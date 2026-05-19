import { Injectable } from '@nestjs/common';
import { Manufacturer, Prisma } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';

@Injectable()
export class ManufacturersService extends BaseService<
  Manufacturer,
  CreateSettingDto,
  UpdateSettingDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'manufacturer');
  }

  async findAll(query: BaseQuery = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || '';
    const sort = query.sort || 'createdAt';
    const order = query.order || 'desc';

    const where: Prisma.ManufacturerWhereInput = {};
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
        orderBy: { [sort as any]: order },
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

  async create(data: CreateSettingDto, userId: number): Promise<Manufacturer> {
    return super.create(data, userId);
  }
}
