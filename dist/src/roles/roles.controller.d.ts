import { RolesService } from './roles.service';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    createRole(data: {
        name: string;
        description?: string;
    }): Promise<$Result.DefaultSelection<import(".prisma/client").Prisma.$RolePayload<$Extensions.DefaultArgs>>>;
    getAllRoles(): Promise<$Result.DefaultSelection<import(".prisma/client").Prisma.$RolePayload<$Extensions.DefaultArgs>>[]>;
    getRole(id: string): Promise<any>;
    updateRole(id: string, data: {
        name?: string;
        description?: string;
    }): Promise<$Result.DefaultSelection<import(".prisma/client").Prisma.$RolePayload<$Extensions.DefaultArgs>>>;
    deleteRole(id: string): Promise<$Result.DefaultSelection<import(".prisma/client").Prisma.$RolePayload<$Extensions.DefaultArgs>>>;
    getRolePermissions(id: string): Promise<$Result.DefaultSelection<import(".prisma/client").Prisma.$RolePermissionPayload<$Extensions.DefaultArgs>>[]>;
    updateRolePermission(roleId: string, permissionId: string, data: {
        create?: boolean;
        read?: boolean;
        update?: boolean;
        delete?: boolean;
    }): Promise<$Result.DefaultSelection<import(".prisma/client").Prisma.$RolePermissionPayload<$Extensions.DefaultArgs>>>;
}
