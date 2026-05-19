import { Injectable } from '@nestjs/common';
import { AssetModel, Prisma } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAssetModelDto,
  UpdateAssetModelDto,
} from '../common/dto/entity.dto';

@Injectable()
export class AssetModelsService extends BaseService<
  AssetModel,
  CreateAssetModelDto,
  UpdateAssetModelDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'assetModel');
  }

  async findAll(query: BaseQuery = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search || '';
    const sort = query.sort || 'createdAt';
    const order = query.order || 'desc';

    const where: Prisma.AssetModelWhereInput = {};
    if (search) {
      where.name = { contains: search };
    }

    const [records, total] = await Promise.all([
      this.prisma.assetModel.findMany({
        where,
        include: {
          category: true,
          manufacturer: true,
          assets: {
            where: {
              checkedOutUserId: { not: null },
            },
            select: {
              id: true,
            },
          },
          _count: {
            select: {
              assets: true,
            },
          },
        },
        orderBy: { [sort as any]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.assetModel.count({ where }),
    ]);

    const formatted = records.map((r) => {
      const assignedCount = r.assets.length;
      const totalCount = r._count.assets;
      return {
        ...r,
        category: r.category.name,
        manufacturer: r.manufacturer.name,
        modelNo: r.modelNumber,
        assets: totalCount,
        assigned: assignedCount,
        remaining: totalCount - assignedCount,
        percentRemaining:
          totalCount > 0
            ? ((totalCount - assignedCount) / totalCount) * 100
            : 100,
        archived: 0,
        eol: r.eolMonths,
        fieldset: r.fieldsetId ? `Fieldset #${r.fieldsetId}` : 'None',
      };
    });

    return { records: formatted, total };
  }

  async create(data: CreateAssetModelDto, userId: number): Promise<AssetModel> {
    return super.create(data, userId);
  }
}
