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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../common/base.service");
const prisma_service_1 = require("../prisma/prisma.service");
const slugify_1 = require("../common/utils/slugify");
let DepartmentsService = class DepartmentsService extends base_service_1.BaseService {
    prisma;
    constructor(prisma) {
        super(prisma, 'department');
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
            this.prisma.department.findMany({
                where,
                include: {
                    location: true,
                },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.department.count({ where }),
        ]);
        const formatted = records.map((r) => ({
            ...r,
            manager: r.managerId ? `User #${r.managerId}` : 'N/A',
            location: r.location ? r.location.name : 'N/A',
            people: 0,
        }));
        return { records: formatted, total };
    }
    async create(data, userId) {
        return super.create(data, userId, { slug: (0, slugify_1.slugify)(data.name) });
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map