import { Injectable, NotFoundException } from '@nestjs/common';
import { Asset, Prisma } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/assets.dto';
import { slugify } from '../common/utils/slugify';

@Injectable()
export class AssetsService extends BaseService<Asset, CreateAssetDto, UpdateAssetDto> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'asset');
  }

  async findAll(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const sort = query.sort || 'assetTag';
    const order = query.order || 'asc';
    const search = query.search || '';
    const categoryFilter = query.category;

    const where: Prisma.AssetWhereInput = {};

    if (search) {
      where.OR = [
        { assetTag: { contains: search } },
        { name: { contains: search } },
        { serial: { contains: search } },
      ];
    }

    if (categoryFilter) {
      if (categoryFilter === 'deployed') {
        where.checkedOutUserId = { not: null };
      } else if (categoryFilter === 'ready') {
        where.status = { name: 'Ready to Deploy' };
        where.checkedOutUserId = null;
      } else if (categoryFilter === 'pending') {
        where.status = { name: 'Pending' };
      } else if (categoryFilter === 'undeployable') {
        where.status = { name: { in: ['Broken - Not Fixable', 'Lost/Stolen'] } };
      } else if (categoryFilter === 'byod') {
        where.isByod = true;
      } else if (categoryFilter === 'archive') {
        where.status = { name: 'Archive' };
      } else if (categoryFilter === 'requestable') {
        where.isRequestable = true;
      } else if (categoryFilter === 'audit') {
        where.nextAuditDate = { lt: new Date() };
      } else if (categoryFilter === 'checkin') {
        where.expectedCheckin = { lt: new Date() };
      }
    }

    const [records, total] = await Promise.all([
      this.prisma.asset.findMany({
        where,
        include: {
          model: true,
          status: true,
          company: true,
          location: true,
          checkedOutUser: true,
        },
        orderBy: { [sort]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.asset.count({ where }),
    ]);

    // Format for frontend
    const formattedRecords = records.map((r) => ({
      ...r,
      model: r.model.name,
      category: 'Asset', 
      status: r.status.name,
      checkedOutTo: r.checkedOutUser ? r.checkedOutUser.email : null,
      location: r.location ? r.location.name : 'N/A',
      purchaseCost: r.purchaseCost ? Number(r.purchaseCost) : 0,
      currentValue: r.purchaseCost ? Number(r.purchaseCost) * 0.8 : 0, 
    }));

    return { records: formattedRecords, total };
  }

  async findOne(idOrSlug: string | number): Promise<Asset> {
    const id = typeof idOrSlug === 'string' ? parseInt(idOrSlug, 10) : idOrSlug;
    const where: Prisma.AssetWhereInput = isNaN(id)
      ? { slug: idOrSlug as string }
      : { id };

    const record = await this.prisma.asset.findFirst({
      where,
      include: {
        model: true,
        status: true,
        company: true,
        location: true,
        checkedOutUser: true,
        supplier: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Asset not found`);
    }

    return record;
  }

  async create(data: CreateAssetDto, userId: number): Promise<Asset> {
    const assetTag = data.assetTag || `AST-${Date.now()}`;
    return super.create(
      {
        ...data,
      },
      userId,
      { 
        assetTag,
        slug: slugify(assetTag)
      },
    );
  }

  async update(idOrSlug: string | number, data: UpdateAssetDto, userId: number): Promise<Asset> {
    const record = await this.findOne(idOrSlug);
    
    return this.prisma.asset.update({
      where: { id: record.id },
      data: {
        ...data,
        assetTag: data.assetTag || record.assetTag,
        slug: data.assetTag ? slugify(data.assetTag) : record.slug,
      },
    });
  }
}
