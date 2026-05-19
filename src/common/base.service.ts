/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

export interface BaseQuery {
  page?: string | number;
  limit?: string | number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  where?: any;
}

@Injectable()
export abstract class BaseService<T, CreateDto, UpdateDto> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelName: string,
  ) {}

  async findAll(
    query: BaseQuery = {},
  ): Promise<{ records: any[]; total: number }> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const where = query.where || {};
    const sort = query.sort || 'createdAt';
    const order = query.order || 'desc';

    const model = (this.prisma as any)[this.modelName];

    const [records, total]: [T[], number] = await Promise.all([
      model.findMany({
        where,
        orderBy: { [sort]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      model.count({ where }),
    ]);

    return { records, total };
  }

  async findOne(idOrSlug: number | string, where: any = {}): Promise<T> {
    // Check if idOrSlug is a pure numeric string/number
    const isNumeric =
      typeof idOrSlug === 'number' ||
      (typeof idOrSlug === 'string' && /^\d+$/.test(idOrSlug));

    const model = (this.prisma as any)[this.modelName];

    if (isNumeric) {
      const id =
        typeof idOrSlug === 'string' ? parseInt(idOrSlug, 10) : idOrSlug;
      const record = await model.findFirst({
        where: { ...(where || {}), id },
      });
      if (!record) throw new NotFoundException(`${this.modelName} not found`);
      return record;
    }

    // Otherwise lookup by Slug (e.g. UUID)
    const record = await model.findFirst({
      where: { ...(where || {}), slug: idOrSlug },
    });

    if (!record) {
      throw new NotFoundException(`${this.modelName} not found`);
    }
    return record;
  }

  async create(data: CreateDto, userId: number, extra: any = {}): Promise<T> {
    const model = (this.prisma as any)[this.modelName];
    try {
      return await model.create({
        data: {
          slug: randomUUID(),
          ...(data as any),
          ...(extra || {}),
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        const field = error.meta?.target?.[0] || 'field';
        throw new BadRequestException(`${field} must be unique`);
      }
      throw error;
    }
  }

  async update(
    idOrSlug: number | string,
    data: UpdateDto,
    userId: number,
    where: any = {},
  ): Promise<T> {
    const existing = await this.findOne(idOrSlug, where);
    const model = (this.prisma as any)[this.modelName];
    return await model.update({
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
    await this.findOne(id, where);
    const model = (this.prisma as any)[this.modelName];

    await model.delete({
      where: { id },
    });
    return { success: true };
  }
}
