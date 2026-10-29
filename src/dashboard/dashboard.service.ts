import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const STATUS_TYPES = ['Deployable', 'Pending', 'Archived', 'Undeployable'];

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      assetModels,
      categories,
      manufacturers,
      suppliers,
      inventoryTracked,
      addedThisMonth,
      deployed,
      readyToDeploy,
      dueForAudit,
      overdueCheckin,
      byType,
      recentAssets,
      recentTasks,
    ] = await Promise.all([
      this.prisma.assetModel.count(),
      this.prisma.category.count(),
      this.prisma.manufacturer.count(),
      this.prisma.supplier.count(),
      this.prisma.asset.count(),
      this.prisma.asset.count({ where: { createdAt: { gte: startOfMonth } } }),
      this.prisma.asset.count({
        where: {
          status: { type: 'Deployable' },
          checkedOutUserId: { not: null },
        },
      }),
      this.prisma.asset.count({
        where: { status: { type: 'Deployable' }, checkedOutUserId: null },
      }),
      this.prisma.asset.count({ where: { nextAuditDate: { lt: now } } }),
      this.prisma.asset.count({ where: { expectedCheckin: { lt: now } } }),
      this.prisma.asset.groupBy({
        by: ['statusId'],
        _count: { _all: true },
      }),
      this.prisma.asset.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 6,
        include: { status: true, checkedOutUser: true },
      }),
      this.prisma.task.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 6,
        include: { user: true },
      }),
    ]);

    // Status mix by status label type (Deployable / Pending / Archived / Undeployable).
    const labels = await this.prisma.statusLabel.findMany({
      select: { id: true, type: true },
    });
    const typeById = new Map(labels.map((l) => [l.id, l.type]));
    const typeCounts = Object.fromEntries(STATUS_TYPES.map((t) => [t, 0]));
    for (const row of byType) {
      const type = typeById.get(row.statusId);
      if (type && type in typeCounts) typeCounts[type] += row._count._all;
    }

    const activity = [
      ...recentAssets.map((a) => ({
        at: a.updatedAt,
        title: `Asset ${a.assetTag} ${
          a.updatedAt.getTime() - a.createdAt.getTime() < 1000
            ? 'added'
            : 'updated'
        }`,
        meta: `${a.status.name}${
          a.checkedOutUser ? ` · held by ${a.checkedOutUser.email}` : ''
        }`,
      })),
      ...recentTasks.map((t) => ({
        at: t.updatedAt,
        title: `Task ${t.key}: ${t.summary}`,
        meta: `${t.status} · ${t.user.email}`,
      })),
    ]
      .sort((a, b) => b.at.getTime() - a.at.getTime())
      .slice(0, 6);

    return {
      assetModels,
      categories,
      manufacturers,
      suppliers,
      inventoryTracked,
      addedThisMonth,
      deployed,
      readyToDeploy,
      pending: typeCounts.Pending,
      undeployable: typeCounts.Undeployable,
      archived: typeCounts.Archived,
      dueForAudit,
      overdueCheckin,
      statusMix: STATUS_TYPES.map((type) => ({
        type,
        count: typeCounts[type],
      })),
      activity,
      recentAssets: recentAssets.map((a) => ({
        name: a.name || a.assetTag,
        owner: a.checkedOutUser?.email ?? null,
        state: a.status.name,
        updatedAt: a.updatedAt,
      })),
    };
  }
}
