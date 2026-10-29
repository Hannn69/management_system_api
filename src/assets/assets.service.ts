import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Asset, Prisma } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/assets.dto';

const assetInclude = {
  model: { include: { category: true } },
  status: true,
  company: true,
  location: true,
  checkedOutUser: true,
  supplier: true,
} satisfies Prisma.AssetInclude;

type AssetWithRelations = Prisma.AssetGetPayload<{
  include: typeof assetInclude;
}>;

export interface AssetQuery extends BaseQuery {
  category?: string;
}

@Injectable()
export class AssetsService extends BaseService<
  Asset,
  CreateAssetDto,
  UpdateAssetDto
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'asset');
  }

  private formatAssetRecord(record: AssetWithRelations) {
    const purchaseCost = record.purchaseCost ? Number(record.purchaseCost) : 0;

    return {
      ...record,
      model: record.model.name,
      category: record.model.category.name,
      status: record.status.name,
      checkedOutTo: record.checkedOutUser?.email ?? null,
      location: record.location?.name ?? 'N/A',
      purchaseCost,
      currentValue: purchaseCost * 0.8,
    };
  }

  async findAll(query: AssetQuery = {}) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const sort = query.sort || 'createdAt';
    const order = (query.order as 'asc' | 'desc') || 'desc';
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

    // Tabs are driven by the status label type, not by hard-coded status names.
    // "Deployed" and "Ready" are both Deployable: they differ by whether a user holds the asset.
    if (categoryFilter) {
      if (categoryFilter === 'deployed') {
        where.status = { type: 'Deployable' };
        where.checkedOutUserId = { not: null };
      } else if (categoryFilter === 'ready') {
        where.status = { type: 'Deployable' };
        where.checkedOutUserId = null;
      } else if (categoryFilter === 'pending') {
        where.status = { type: 'Pending' };
      } else if (categoryFilter === 'undeployable') {
        where.status = { type: 'Undeployable' };
      } else if (categoryFilter === 'byod') {
        where.isByod = true;
      } else if (categoryFilter === 'archive') {
        where.status = { type: 'Archived' };
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
        include: assetInclude,
        orderBy: { [sort]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.asset.count({ where }),
    ]);

    const formattedRecords = records.map((r) => this.formatAssetRecord(r));

    return { records: formattedRecords, total };
  }

  private async loadAsset(idOrSlug: string | number) {
    const isNumeric = typeof idOrSlug === 'number' || /^\d+$/.test(idOrSlug);

    const where: Prisma.AssetWhereInput = isNumeric
      ? { id: Number(idOrSlug) }
      : { slug: String(idOrSlug) };

    const record = await this.prisma.asset.findFirst({
      where,
      include: assetInclude,
    });

    if (!record) {
      throw new NotFoundException(`Asset not found`);
    }
    return record;
  }

  // The base signature returns the raw model, but assets are returned in display form.

  override async findOne(idOrSlug: string | number): Promise<any> {
    return this.formatAssetRecord(await this.loadAsset(idOrSlug));
  }

  // Only Deployable statuses can be checked out to a user.
  private async assertCheckoutAllowed(
    statusId: number,
    checkedOutUserId: number | null | undefined,
  ) {
    if (!checkedOutUserId) return;
    const status = await this.prisma.statusLabel.findUnique({
      where: { id: statusId },
    });
    if (status && status.type !== 'Deployable') {
      throw new BadRequestException(
        `Status "${status.name}" is ${status.type}, so the asset cannot be checked out to a user. Clear "Checkout to" or pick a Deployable status.`,
      );
    }
  }

  async create(data: CreateAssetDto, userId: number): Promise<Asset> {
    await this.assertCheckoutAllowed(data.statusId, data.checkedOutUserId);
    const assetTag = data.assetTag || `AST-${Date.now()}`;
    return super.create(
      {
        ...data,
      },
      userId,
      {
        assetTag,
      },
    );
  }

  async update(
    idOrSlug: string | number,
    data: UpdateAssetDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _userId: number,
  ): Promise<Asset> {
    const record = await this.loadAsset(idOrSlug);

    await this.assertCheckoutAllowed(
      data.statusId ?? record.statusId,
      data.checkedOutUserId === undefined
        ? record.checkedOutUserId
        : data.checkedOutUserId,
    );

    return this.prisma.asset.update({
      where: { id: record.id },
      data: {
        ...data,
        assetTag: data.assetTag || record.assetTag,
      },
    });
  }
}
