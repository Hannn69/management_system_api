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
exports.ManufacturersController = void 0;
const common_1 = require("@nestjs/common");
const base_controller_1 = require("../common/base.controller");
const manufacturers_service_1 = require("./manufacturers.service");
let ManufacturersController = class ManufacturersController extends base_controller_1.BaseController {
    manufacturersService;
    constructor(manufacturersService) {
        super(manufacturersService);
        this.manufacturersService = manufacturersService;
    }
    async findAll(query) {
        return this.manufacturersService.findAll(query);
    }
};
exports.ManufacturersController = ManufacturersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManufacturersController.prototype, "findAll", null);
exports.ManufacturersController = ManufacturersController = __decorate([
    (0, common_1.Controller)('manufacturers'),
    __metadata("design:paramtypes", [manufacturers_service_1.ManufacturersService])
], ManufacturersController);
//# sourceMappingURL=manufacturers.controller.js.map