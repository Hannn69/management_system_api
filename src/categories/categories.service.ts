import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { slugify } from '../common/utils/slugify';

@Injectable()
export class CategoriesService extends BaseService<Category, CreateSettingDto, UpdateSettingDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'category');
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
      this.prisma.category.findMany({
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
      this.prisma.category.count({ where }),
    ]);

    const formatted = records.map((r) => ({
      ...r,
      qty: r._count.assetModels, // Just as a placeholder for now
      sendEmail: r.emailNotification,
      acceptance: r.requireConfirmation,
    }));

    return { records: formatted, total };
  }

  async create(data: any, userId: number): Promise<Category> {
    return super.create(data, userId, { slug: slugify(data.name) });
  }
}
