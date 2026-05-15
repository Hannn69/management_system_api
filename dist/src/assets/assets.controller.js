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
exports.AssetsController = void 0;
const common_1 = require("@nestjs/common");
const base_controller_1 = require("../common/base.controller");
const assets_dto_1 = require("./dto/assets.dto");
const assets_service_1 = require("./assets.service");
let AssetsController = class AssetsController extends base_controller_1.BaseController {
    assetsService;
    constructor(assetsService) {
        super(assetsService);
        this.assetsService = assetsService;
    }
    async findAll(query) {
        return this.assetsService.findAll(query);
    }
    async findOne(idOrSlug) {
        const record = await this.assetsService.findOne(idOrSlug);
        return { record };
    }
    async update(idOrSlug, body, req) {
        const user = req.user;
        if (!user?.id) {
            throw new common_1.UnauthorizedException();
        }
        const record = await this.assetsService.update(idOrSlug, body, user.id);
        return { record };
    }
};
exports.AssetsController = AssetsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':idOrSlug'),
    __param(0, (0, common_1.Param)('idOrSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':idOrSlug'),
    __param(0, (0, common_1.Param)('idOrSlug')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assets_dto_1.UpdateAssetDto, Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "update", null);
exports.AssetsController = AssetsController = __decorate([
    (0, common_1.Controller)('assets'),
    __metadata("design:paramtypes", [assets_service_1.AssetsService])
], AssetsController);
//# sourceMappingURL=assets.controller.js.map