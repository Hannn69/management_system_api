"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RolesService = class RolesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    createSlug(name) {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }
    async createRole(data) {
        const role = await this.prisma.role.create({
            data: {
                name: data.name,
                description: data.description,
                slug: this.createSlug(data.name),
            },
        });
        const permissions = await this.prisma.permission.findMany();
        const rolePermissions = [];
        for (const permission of permissions) {
            const permissionSlug = `${this.createSlug(role.name)}-${this.createSlug(permission.name)}`;
            const rolePermission = await this.prisma.rolePermission.create({
                data: {
                    roleId: role.id,
                    permissionId: permission.id,
                    slug: permissionSlug,
                    create: false,
                    read: false,
                    update: false,
                    delete: false,
                },
            });
            rolePermissions.push(rolePermission);
        }
        return role;
    }
    async getRole(id) {
        return this.prisma.role.findUnique({
            where: { id },
        });
    }
    async getAllRoles() {
        return this.prisma.role.findMany({
            include: {
                rolePermissions: true,
                _count: {
                    select: { users: true },
                },
            },
        });
    }
    async getRoleUsers(id) {
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: {
                users: {
                    select: {
                        id: true,
                        slug: true,
                        email: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        displayName: true,
                        loginEnabled: true,
                    },
                    orderBy: { username: 'asc' },
                },
                _count: {
                    select: { users: true },
                },
            },
        });
        if (!role) {
            throw new common_1.NotFoundException('Role not found');
        }
        return role;
    }
    async assignUsers(id, userIds) {
        if (!Array.isArray(userIds) || userIds.some((userId) => !Number.isInteger(userId))) {
            throw new common_1.BadRequestException('userIds must be an array of integers');
        }
        const role = await this.prisma.role.findUnique({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException('Role not found');
        }
        const uniqueUserIds = [...new Set(userIds)];
        await this.prisma.$transaction([
            this.prisma.user.updateMany({
                where: { roleId: id },
                data: { roleId: null },
            }),
            this.prisma.user.updateMany({
                where: { id: { in: uniqueUserIds } },
                data: { roleId: id },
            }),
        ]);
        return this.getRoleUsers(id);
    }
    async updateRole(id, data) {
        return this.prisma.role.update({
            where: { id },
            data: {
                ...data,
                ...(data.name && { slug: this.createSlug(data.name) }),
            },
        });
    }
    async deleteRole(id) {
        return this.prisma.role.delete({
            where: { id },
        });
    }
    async getRolePermissions(roleId) {
        return this.prisma.rolePermission.findMany({
            where: { roleId },
            include: {
                permission: true,
            },
        });
    }
    async updateRolePermission(roleId, permissionId, data) {
        return this.prisma.rolePermission.update({
            where: {
                roleId_permissionId: {
                    roleId,
                    permissionId,
                },
            },
            data,
        });
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
//# sourceMappingURL=roles.service.js.map