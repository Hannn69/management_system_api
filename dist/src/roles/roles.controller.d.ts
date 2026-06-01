import { RolesService } from './roles.service';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    createRole(data: {
        name: string;
        description?: string;
    }): Promise<{
        name: string;
        id: number;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllRoles(): Promise<{
        name: string;
        id: number;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getRole(id: string): Promise<{
        name: string;
        id: number;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateRole(id: string, data: {
        name?: string;
        description?: string;
    }): Promise<{
        name: string;
        id: number;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteRole(id: string): Promise<{
        name: string;
        id: number;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getRolePermissions(id: string): Promise<{
        id: number;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        create: boolean;
        update: boolean;
        roleId: number;
        permissionId: number;
        read: boolean;
        delete: boolean;
    }[]>;
    updateRolePermission(roleId: string, permissionId: string, data: {
        create?: boolean;
        read?: boolean;
        update?: boolean;
        delete?: boolean;
    }): Promise<{
        id: number;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        create: boolean;
        update: boolean;
        roleId: number;
        permissionId: number;
        read: boolean;
        delete: boolean;
    }>;
}
