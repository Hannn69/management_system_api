import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../common/dto/entity.dto';

@Injectable()
export class CategoriesService extends BaseService<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'category');
  }

  async findAll(query: BaseQuery = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || '';
    const sort = query.sort || 'createdAt';
    const order = (query.order as 'asc' | 'desc') || 'desc';

    const where: Prisma.CategoryWhereInput = {};
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
        orderBy: { [sort]: order },
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

  async create(data: CreateCategoryDto, userId: number): Promise<Category> {
    return super.create(data, userId);
  }
}
