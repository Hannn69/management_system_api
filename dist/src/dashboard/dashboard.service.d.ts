import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<{
        assetModels: any;
        categories: any;
        manufacturers: any;
        suppliers: any;
        inventoryTracked: any;
        openLicenses: number;
        accessoriesReady: number;
        supplyAlerts: number;
    }>;
}
