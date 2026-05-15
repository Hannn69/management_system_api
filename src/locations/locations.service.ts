import { Injectable } from '@nestjs/common';
import { Location } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { slugify } from '../common/utils/slugify';

@Injectable()
export class LocationsService extends BaseService<Location, CreateSettingDto, UpdateSettingDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'location');
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
      this.prisma.location.findMany({
        where,
        include: {
          parent: true,
          _count: {
            select: {
              assets: true,
              children: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.location.count({ where }),
    ]);

    const formatted = records.map((r) => ({
      ...r,
      parent: r.parent ? r.parent.name : 'None',
      people: 0, // Placeholder
      currentLocation: r.name,
      assignAsset: r._count.assets,
      accessories: 0,
      assignAccessories: 0,
      components: 0,
      consumables: 0,
      childLocation: r._count.children,
    }));

    return { records: formatted, total };
  }

  async create(data: any, userId: number): Promise<Location> {
    return super.create(data, userId, { slug: slugify(data.name) });
  }
}
