import { Injectable } from '@nestjs/common';
import { AssetModel } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetModelDto, UpdateAssetModelDto } from '../common/dto/entity.dto';
import { slugify } from '../common/utils/slugify';

@Injectable()
export class AssetModelsService extends BaseService<AssetModel, CreateAssetModelDto, UpdateAssetModelDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'assetModel');
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
      this.prisma.assetModel.findMany({
        where,
        include: {
          category: true,
          manufacturer: true,
          _count: {
            select: {
              assets: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.assetModel.count({ where }),
    ]);

    const formatted = records.map((r) => ({
      ...r,
      category: r.category.name,
      manufacturer: r.manufacturer.name,
      modelNo: r.modelNumber,
      assets: r._count.assets,
      assigned: 0, // Placeholder logic needed
      remaining: r._count.assets,
      percentRemaining: 100,
      archived: 0,
      eol: r.eolMonths,
      fieldset: r.fieldsetId ? `Fieldset #${r.fieldsetId}` : 'None',
    }));

    return { records: formatted, total };
  }

  async create(data: CreateAssetModelDto, userId: number): Promise<AssetModel> {
    return super.create(data, userId, { slug: slugify(data.name) });
  }
}
