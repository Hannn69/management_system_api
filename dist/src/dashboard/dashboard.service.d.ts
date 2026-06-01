import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<{
        assetModels: number;
        categories: number;
        manufacturers: number;
        suppliers: number;
        inventoryTracked: number;
        openLicenses: number;
        accessoriesReady: number;
        supplyAlerts: number;
    }>;
}
