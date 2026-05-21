import { Injectable } from '@nestjs/common';
import { Location, Prisma } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from '../common/dto/entity.dto';

@Injectable()
export class LocationsService extends BaseService<
  Location,
  CreateLocationDto,
  UpdateLocationDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'location');
  }

  async findAll(query: BaseQuery = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || '';
    const sort = query.sort || 'createdAt';
    const order = query.order || 'desc';

    const where: Prisma.LocationWhereInput = {};
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
          company: true,
          _count: {
            select: {
              assets: true,
              children: true,
            },
          },
        },
        orderBy: { [sort as any]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.location.count({ where }),
    ]);

    const formatted = records.map((r) => ({
      ...r,
      parent: r.parent ? r.parent.name : 'None',
      company: r.company ? r.company.name : 'N/A',
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

  async create(data: CreateLocationDto, userId: number): Promise<Location> {
    return super.create(data, userId);
  }
}
