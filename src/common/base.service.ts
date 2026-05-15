import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export abstract class BaseService<T, CreateDto, UpdateDto> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelName: string,
  ) {}

  async findAll(query: any = {}): Promise<{ records: any[]; total: number }> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const where = query.where || {};

    const [records, total] = await Promise.all([
      (this.prisma[this.modelName] as any).findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      (this.prisma[this.modelName] as any).count({ where }),
    ]);

    return { records, total };
  }

  async findOne(idOrSlug: number | string, where: any = {}): Promise<T> {
    const id = typeof idOrSlug === 'string' ? parseInt(idOrSlug, 10) : idOrSlug;
    const finalWhere: any = isNaN(id)
      ? { ...where, slug: idOrSlug }
      : { ...where, id };

    const record = await (this.prisma[this.modelName] as any).findFirst({
      where: finalWhere,
    });
    if (!record) {
      throw new NotFoundException(`${this.modelName} not found`);
    }
    return record;
  }

  async create(data: CreateDto, userId: number, extra: any = {}): Promise<T> {
    return (this.prisma[this.modelName] as any).create({
      data: {
        ...data,
        ...extra,
      },
    });
  }

  async update(
    idOrSlug: number | string,
    data: UpdateDto,
    userId: number,
    where: any = {},
  ): Promise<T> {
    const existing = await this.findOne(idOrSlug, where);
    return (this.prisma[this.modelName] as any).update({
      where: { id: (existing as any).id },
      data: {
        ...(data as any),
      },
    });
  }

  async remove(
    id: number,
    userId: number,
    where: any = {},
  ): Promise<{ success: boolean }> {
    const existing = await this.findOne(id, where);
    
    // Simple ownership check if the model has a userId field
    if ((existing as any).userId && (existing as any).userId !== userId) {
        throw new ForbiddenException('Forbidden');
    }

    await (this.prisma[this.modelName] as any).delete({
      where: { id },
    });
    return { success: true };
  }
}
