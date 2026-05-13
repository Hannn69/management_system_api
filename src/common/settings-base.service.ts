import { Injectable, BadRequestException } from '@nestjs/common';
import { SettingKind } from '@prisma/client';
import { BaseService } from './base.service';
import { PrismaService } from '../prisma/prisma.service';

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

@Injectable()
export abstract class SettingsBaseService<T, CreateDto, UpdateDto> extends BaseService<T, CreateDto, UpdateDto> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly kind: SettingKind,
  ) {
    super(prisma, 'settingRecord');
  }

  async findAll(): Promise<T[]> {
    return super.findAll({ kind: this.kind });
  }

  async findOne(id: number): Promise<T> {
    return super.findOne(id, { kind: this.kind });
  }

  async create(data: any, userId: number): Promise<T> {
    const name = data.name?.trim();
    if (!name) {
      throw new BadRequestException('Name is required');
    }
    return super.create(data, userId, {
      kind: this.kind,
      slug: slugify(name),
    });
  }

  async update(id: number, data: any, userId: number): Promise<T> {
    const updateData = { ...data };
    if (data.name) {
      updateData.slug = slugify(data.name);
    }
    return super.update(id, updateData, userId, { kind: this.kind });
  }

  async remove(id: number, userId: number): Promise<{ success: boolean }> {
    return super.remove(id, userId, { kind: this.kind });
  }
}
