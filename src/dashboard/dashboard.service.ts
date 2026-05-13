import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SettingKind } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const [assetModels, categories, manufacturers, suppliers] = await Promise.all([
      this.prisma.settingRecord.count({ where: { kind: SettingKind.ASSET_MODEL } }),
      this.prisma.settingRecord.count({ where: { kind: SettingKind.CATEGORY } }),
      this.prisma.settingRecord.count({ where: { kind: SettingKind.MANUFACTURER } }),
      this.prisma.settingRecord.count({ where: { kind: SettingKind.SUPPLIER } }),
    ]);

    return {
      assetModels,
      categories,
      manufacturers,
      suppliers,
      inventoryTracked: assetModels * 10, // Mocking some value based on real counts
      openLicenses: categories * 2,
      accessoriesReady: manufacturers + suppliers,
      supplyAlerts: 3, // Hardcoded for now
    };
  }
}
