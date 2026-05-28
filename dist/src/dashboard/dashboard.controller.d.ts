import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
