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
exports.ModulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ModulesService = class ModulesService {
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
    async createModule(data) {
        const permission = await this.prisma.permission.create({
            data: {
                name: data.name,
                label: data.label,
                description: data.description,
                slug: this.createSlug(data.name),
            },
        });
        const roles = await this.prisma.role.findMany();
        for (const role of roles) {
            const permissionSlug = `${this.createSlug(role.name)}-${this.createSlug(permission.name)}`;
            await this.prisma.rolePermission.create({
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
        }
        return permission;
    }
    async getModule(id) {
        return this.prisma.permission.findUnique({
            where: { id },
        });
    }
    async getAllModules() {
        return this.prisma.permission.findMany({
            include: {
                rolePermissions: true,
            },
        });
    }
    async updateModule(id, data) {
        return this.prisma.permission.update({
            where: { id },
            data: {
                ...data,
                ...(data.name && { slug: this.createSlug(data.name) }),
            },
        });
    }
    async deleteModule(id) {
        return this.prisma.permission.delete({
            where: { id },
        });
    }
};
exports.ModulesService = ModulesService;
exports.ModulesService = ModulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModulesService);
//# sourceMappingURL=modules.service.js.map