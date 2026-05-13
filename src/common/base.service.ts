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

  async findAll(where: any = {}): Promise<T[]> {
    return (this.prisma[this.modelName] as any).findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, where: any = {}): Promise<T> {
    const record = await (this.prisma[this.modelName] as any).findFirst({
      where: { ...where, id },
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
        createdBy: userId,
        updatedBy: userId,
      },
    });
  }

  async update(
    id: number,
    data: UpdateDto,
    userId: number,
    where: any = {},
  ): Promise<T> {
    await this.findOne(id, where);
    return (this.prisma[this.modelName] as any).update({
      where: { id },
      data: {
        ...(data as any),
        updatedBy: userId,
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
