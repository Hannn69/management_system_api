import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
