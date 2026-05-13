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
exports.SettingsBaseService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const base_service_1 = require("./base.service");
const prisma_service_1 = require("../prisma/prisma.service");
const slugify = (value) => value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
let SettingsBaseService = class SettingsBaseService extends base_service_1.BaseService {
    prisma;
    kind;
    constructor(prisma, kind) {
        super(prisma, 'settingRecord');
        this.prisma = prisma;
        this.kind = kind;
    }
    async findAll() {
        return super.findAll({ kind: this.kind });
    }
    async findOne(id) {
        return super.findOne(id, { kind: this.kind });
    }
    async create(data, userId) {
        const name = data.name?.trim();
        if (!name) {
            throw new common_1.BadRequestException('Name is required');
        }
        return super.create(data, userId, {
            kind: this.kind,
            slug: slugify(name),
        });
    }
    async update(id, data, userId) {
        const updateData = { ...data };
        if (data.name) {
            updateData.slug = slugify(data.name);
        }
        return super.update(id, updateData, userId, { kind: this.kind });
    }
    async remove(id, userId) {
        return super.remove(id, userId, { kind: this.kind });
    }
};
exports.SettingsBaseService = SettingsBaseService;
exports.SettingsBaseService = SettingsBaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, String])
], SettingsBaseService);
//# sourceMappingURL=settings-base.service.js.map