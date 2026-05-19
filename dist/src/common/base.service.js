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
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../prisma/prisma.service");
let BaseService = class BaseService {
    prisma;
    modelName;
    constructor(prisma, modelName) {
        this.prisma = prisma;
        this.modelName = modelName;
    }
    async findAll(query = {}) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const where = query.where || {};
        const sort = query.sort || 'createdAt';
        const order = query.order || 'desc';
        const model = this.prisma[this.modelName];
        const [records, total] = await Promise.all([
            model.findMany({
                where,
                orderBy: { [sort]: order },
                skip: (page - 1) * limit,
                take: limit,
            }),
            model.count({ where }),
        ]);
        return { records, total };
    }
    async findOne(idOrSlug, where = {}) {
        const isNumeric = typeof idOrSlug === 'number' ||
            (typeof idOrSlug === 'string' && /^\d+$/.test(idOrSlug));
        const model = this.prisma[this.modelName];
        if (isNumeric) {
            const id = typeof idOrSlug === 'string' ? parseInt(idOrSlug, 10) : idOrSlug;
            const record = await model.findFirst({
                where: { ...(where || {}), id },
            });
            if (!record)
                throw new common_1.NotFoundException(`${this.modelName} not found`);
            return record;
        }
        const record = await model.findFirst({
            where: { ...(where || {}), slug: idOrSlug },
        });
        if (!record) {
            throw new common_1.NotFoundException(`${this.modelName} not found`);
        }
        return record;
    }
    async create(data, userId, extra = {}) {
        const model = this.prisma[this.modelName];
        try {
            return await model.create({
                data: {
                    slug: (0, crypto_1.randomUUID)(),
                    ...data,
                    ...(extra || {}),
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                const field = error.meta?.target?.[0] || 'field';
                throw new common_1.BadRequestException(`${field} must be unique`);
            }
            throw error;
        }
    }
    async update(idOrSlug, data, userId, where = {}) {
        const existing = await this.findOne(idOrSlug, where);
        const model = this.prisma[this.modelName];
        return await model.update({
            where: { id: existing.id },
            data: {
                ...data,
            },
        });
    }
    async remove(id, userId, where = {}) {
        await this.findOne(id, where);
        const model = this.prisma[this.modelName];
        await model.delete({
            where: { id },
        });
        return { success: true };
    }
};
exports.BaseService = BaseService;
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, String])
], BaseService);
//# sourceMappingURL=base.service.js.map