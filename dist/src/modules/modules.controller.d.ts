import { ModulesService } from './modules.service';
export declare class ModulesController {
    private modulesService;
    constructor(modulesService: ModulesService);
    createModule(data: {
        name: string;
        label: string;
        description?: string;
    }): Promise<$Result.DefaultSelection<import(".prisma/client").Prisma.$PermissionPayload<$Extensions.DefaultArgs>>>;
    getAllModules(): Promise<$Result.DefaultSelection<import(".prisma/client").Prisma.$PermissionPayload<$Extensions.DefaultArgs>>[]>;
    getModule(id: string): Promise<any>;
    updateModule(id: string, data: {
        name?: string;
        label?: string;
        description?: string;
    }): Promise<$Result.DefaultSelection<import(".prisma/client").Prisma.$PermissionPayload<$Extensions.DefaultArgs>>>;
    deleteModule(id: string): Promise<$Result.DefaultSelection<import(".prisma/client").Prisma.$PermissionPayload<$Extensions.DefaultArgs>>>;
}
