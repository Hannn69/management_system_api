import { PrismaService } from '../prisma/prisma.service';
import { Permission } from '@prisma/client';
export declare class ModulesService {
    private prisma;
    constructor(prisma: PrismaService);
    private createSlug;
    createModule(data: {
        name: string;
        label: string;
        description?: string;
    }): Promise<Permission>;
    getModule(id: number): Promise<Permission | null>;
    getAllModules(): Promise<Permission[]>;
    updateModule(id: number, data: {
        name?: string;
        label?: string;
        description?: string;
    }): Promise<Permission>;
    deleteModule(id: number): Promise<Permission>;
}
