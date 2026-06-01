import { PrismaService } from '../prisma/prisma.service';
import { Role, RolePermission } from '@prisma/client';
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    private createSlug;
    createRole(data: {
        name: string;
        description?: string;
    }): Promise<Role>;
    getRole(id: number): Promise<Role | null>;
    getAllRoles(): Promise<Role[]>;
    getRoleUsers(id: number): Promise<{
        users: {
            id: number;
            slug: string;
            email: string;
            username: string;
            firstName: string | null;
            lastName: string | null;
            displayName: string | null;
            loginEnabled: boolean;
        }[];
        _count: {
            users: number;
        };
    } & {
        name: string;
        id: number;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    assignUsers(id: number, userIds: number[]): Promise<{
        users: {
            id: number;
            slug: string;
            email: string;
            username: string;
            firstName: string | null;
            lastName: string | null;
            displayName: string | null;
            loginEnabled: boolean;
        }[];
        _count: {
            users: number;
        };
    } & {
        name: string;
        id: number;
        description: string | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateRole(id: number, data: {
        name?: string;
        description?: string;
    }): Promise<Role>;
    deleteRole(id: number): Promise<Role>;
    getRolePermissions(roleId: number): Promise<RolePermission[]>;
    updateRolePermission(roleId: number, permissionId: number, data: {
        create?: boolean;
        read?: boolean;
        update?: boolean;
        delete?: boolean;
    }): Promise<RolePermission>;
}
