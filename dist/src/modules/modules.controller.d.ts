import { ModulesService } from './modules.service';
export declare class ModulesController {
    private modulesService;
    constructor(modulesService: ModulesService);
    createModule(data: {
        name: string;
        label: string;
        description?: string;
    }): Promise<{
        name: string;
        id: number;
        label: string;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllModules(): Promise<{
        name: string;
        id: number;
        label: string;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getModule(id: string): Promise<{
        name: string;
        id: number;
        label: string;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateModule(id: string, data: {
        name?: string;
        label?: string;
        description?: string;
    }): Promise<{
        name: string;
        id: number;
        label: string;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteModule(id: string): Promise<{
        name: string;
        id: number;
        label: string;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
