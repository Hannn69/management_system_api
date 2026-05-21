"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../common/base.service");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
let UsersService = class UsersService extends base_service_1.BaseService {
    constructor(prisma) {
        super(prisma, 'user');
    }
    async findAll(query = {}) {
        const page = Number(query.page || 1);
        const limit = Number(query.limit || 10);
        const search = query.search || '';
        const sort = query.sort || 'createdAt';
        const order = query.order || 'desc';
        const where = search
            ? {
                OR: [
                    { email: { contains: search } },
                    { username: { contains: search } },
                    { firstName: { contains: search } },
                    { lastName: { contains: search } },
                    { displayName: { contains: search } },
                ],
            }
            : {};
        const [records, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                include: {
                    company: true,
                    location: true,
                },
                orderBy: { [sort]: order },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.user.count({ where }),
        ]);
        return { records, total };
    }
    async create(data, userId) {
        const { password, confirmPassword, ...userData } = data;
        if (password !== confirmPassword) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: userData.email },
        });
        if (existingEmail) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const existingUsername = await this.prisma.user.findUnique({
            where: { username: userData.username },
        });
        if (existingUsername) {
            throw new common_1.BadRequestException('Username already in use');
        }
        const passwordHash = await bcrypt.hash(password, 12);
        return super.create({
            ...userData,
            passwordHash,
        }, userId);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map