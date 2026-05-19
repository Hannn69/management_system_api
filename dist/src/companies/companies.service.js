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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../common/base.service");
const prisma_service_1 = require("../prisma/prisma.service");
let CompaniesService = class CompaniesService extends base_service_1.BaseService {
    prisma;
    constructor(prisma) {
        super(prisma, 'company');
        this.prisma = prisma;
    }
    async findAll(query = {}) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const search = query.search || '';
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { email: { contains: search } },
            ];
        }
        const sort = query.sort || 'createdAt';
        const order = query.order || 'desc';
        const [records, total] = await Promise.all([
            this.prisma.company.findMany({
                where,
                include: {
                    _count: {
                        select: {
                            assets: true,
                            locations: true,
                            departments: true,
                        },
                    },
                },
                orderBy: { [sort]: order },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.company.count({ where }),
        ]);
        const formatted = records.map((r) => ({
            ...r,
            assets: r._count.assets,
            users: 0,
            licenses: 0,
            accessories: 0,
            consumables: 0,
            components: 0,
        }));
        return { records: formatted, total };
    }
    async create(data, userId) {
        return super.create(data, userId);
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map