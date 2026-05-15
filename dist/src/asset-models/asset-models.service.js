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
exports.AssetModelsService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../common/base.service");
const prisma_service_1 = require("../prisma/prisma.service");
const slugify_1 = require("../common/utils/slugify");
let AssetModelsService = class AssetModelsService extends base_service_1.BaseService {
    prisma;
    constructor(prisma) {
        super(prisma, 'assetModel');
        this.prisma = prisma;
    }
    async findAll(query = {}) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const search = query.search || '';
        const where = {};
        if (search) {
            where.name = { contains: search };
        }
        const [records, total] = await Promise.all([
            this.prisma.assetModel.findMany({
                where,
                include: {
                    category: true,
                    manufacturer: true,
                    _count: {
                        select: {
                            assets: true,
                        },
                    },
                },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.assetModel.count({ where }),
        ]);
        const formatted = records.map((r) => ({
            ...r,
            category: r.category.name,
            manufacturer: r.manufacturer.name,
            modelNo: r.modelNumber,
            assets: r._count.assets,
            assigned: 0,
            remaining: r._count.assets,
            percentRemaining: 100,
            archived: 0,
            eol: r.eolMonths,
            fieldset: r.fieldsetId ? `Fieldset #${r.fieldsetId}` : 'None',
        }));
        return { records: formatted, total };
    }
    async create(data, userId) {
        return super.create(data, userId, { slug: (0, slugify_1.slugify)(data.name) });
    }
};
exports.AssetModelsService = AssetModelsService;
exports.AssetModelsService = AssetModelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssetModelsService);
//# sourceMappingURL=asset-models.service.js.map