import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const [assetModels, categories, manufacturers, suppliers, assets] =
      await Promise.all([
        this.prisma.assetModel.count(),
        this.prisma.category.count(),
        this.prisma.manufacturer.count(),
        this.prisma.supplier.count(),
        this.prisma.asset.count(),
      ]);

    return {
      assetModels,
      categories,
      manufacturers,
      suppliers,
      inventoryTracked: assets,
      openLicenses: 0, // Placeholder
      accessoriesReady: 0, // Placeholder
      supplyAlerts: 3, // Hardcoded for now
    };
  }
}
