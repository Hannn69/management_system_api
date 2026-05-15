import { Injectable } from '@nestjs/common';
import { StatusLabel } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { slugify } from '../common/utils/slugify';

@Injectable()
export class StatusLabelsService extends BaseService<StatusLabel, CreateSettingDto, UpdateSettingDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'statusLabel');
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
      this.prisma.statusLabel.findMany({
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
      this.prisma.statusLabel.count({ where }),
    ]);

    const formatted = records.map((r) => ({
      ...r,
      assets: r._count.assets,
    }));

    return { records: formatted, total };
  }

  async create(data: any, userId: number): Promise<StatusLabel> {
    return super.create(data, userId, { slug: slugify(data.name) });
  }
}
