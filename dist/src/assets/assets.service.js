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
exports.AssetsService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../common/base.service");
const prisma_service_1 = require("../prisma/prisma.service");
let AssetsService = class AssetsService extends base_service_1.BaseService {
    prisma;
    constructor(prisma) {
        super(prisma, 'asset');
        this.prisma = prisma;
    }
    async findAll(query = {}) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const sort = query.sort || 'createdAt';
        const order = query.order || 'desc';
        const search = query.search || '';
        const categoryFilter = query.category;
        const where = {};
        if (search) {
            where.OR = [
                { assetTag: { contains: search } },
                { name: { contains: search } },
                { serial: { contains: search } },
            ];
        }
        if (categoryFilter) {
            if (categoryFilter === 'deployed') {
                where.checkedOutUserId = { not: null };
            }
            else if (categoryFilter === 'ready') {
                where.status = { name: 'Ready to Deploy' };
                where.checkedOutUserId = null;
            }
            else if (categoryFilter === 'pending') {
                where.status = { name: 'Pending' };
            }
            else if (categoryFilter === 'undeployable') {
                where.status = {
                    name: { in: ['Broken - Not Fixable', 'Lost/Stolen'] },
                };
            }
            else if (categoryFilter === 'byod') {
                where.isByod = true;
            }
            else if (categoryFilter === 'archive') {
                where.status = { name: 'Archive' };
            }
            else if (categoryFilter === 'requestable') {
                where.isRequestable = true;
            }
            else if (categoryFilter === 'audit') {
                where.nextAuditDate = { lt: new Date() };
            }
            else if (categoryFilter === 'checkin') {
                where.expectedCheckin = { lt: new Date() };
            }
        }
        const [records, total] = await Promise.all([
            this.prisma.asset.findMany({
                where,
                include: {
                    model: true,
                    status: true,
                    company: true,
                    location: true,
                    checkedOutUser: true,
                },
                orderBy: { [sort]: order },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.asset.count({ where }),
        ]);
        const formattedRecords = records.map((r) => ({
            ...r,
            model: r.model.name,
            category: 'Asset',
            status: r.status.name,
            checkedOutTo: r.checkedOutUser ? r.checkedOutUser.email : null,
            location: r.location ? r.location.name : 'N/A',
            purchaseCost: r.purchaseCost ? Number(r.purchaseCost) : 0,
            currentValue: r.purchaseCost ? Number(r.purchaseCost) * 0.8 : 0,
        }));
        return { records: formattedRecords, total };
    }
    async findOne(idOrSlug) {
        const isNumeric = typeof idOrSlug === 'number' ||
            (typeof idOrSlug === 'string' && /^\d+$/.test(idOrSlug));
        const where = isNumeric
            ? { id: typeof idOrSlug === 'string' ? parseInt(idOrSlug, 10) : idOrSlug }
            : { slug: idOrSlug };
        const record = await this.prisma.asset.findFirst({
            where,
            include: {
                model: true,
                status: true,
                company: true,
                location: true,
                checkedOutUser: true,
                supplier: true,
            },
        });
        if (!record) {
            throw new common_1.NotFoundException(`Asset not found`);
        }
        return record;
    }
    async create(data, userId) {
        const assetTag = data.assetTag || `AST-${Date.now()}`;
        return super.create({
            ...data,
        }, userId, {
            assetTag,
        });
    }
    async update(idOrSlug, data, _userId) {
        const record = await this.findOne(idOrSlug);
        return this.prisma.asset.update({
            where: { id: record.id },
            data: {
                ...data,
                assetTag: data.assetTag || record.assetTag,
            },
        });
    }
};
exports.AssetsService = AssetsService;
exports.AssetsService = AssetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssetsService);
//# sourceMappingURL=assets.service.js.map