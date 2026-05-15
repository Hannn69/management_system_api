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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const common_1 = require("@nestjs/common");
class BaseController {
    service;
    constructor(service) {
        this.service = service;
    }
    async findAll(query) {
        return this.service.findAll(query);
    }
    async findOne(idOrSlug) {
        const record = await this.service.findOne(idOrSlug);
        return { record };
    }
    async create(body, req) {
        const user = req.user;
        const userId = user?.id || 1;
        const record = await this.service.create(body, userId);
        return { record };
    }
    async update(idOrSlug, body, req) {
        const user = req.user;
        const userId = user?.id || 1;
        const record = await this.service.update(idOrSlug, body, userId);
        return { record };
    }
    async remove(id, req) {
        const user = req.user;
        const userId = user?.id || 1;
        return this.service.remove(id, userId);
    }
}
exports.BaseController = BaseController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':idOrSlug'),
    __param(0, (0, common_1.Param)('idOrSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':idOrSlug'),
    __param(0, (0, common_1.Param)('idOrSlug')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BaseController.prototype, "remove", null);
//# sourceMappingURL=base.controller.js.map