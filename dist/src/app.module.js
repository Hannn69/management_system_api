"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const prisma_module_1 = require("./prisma/prisma.module");
const asset_models_module_1 = require("./asset-models/asset-models.module");
const categories_module_1 = require("./categories/categories.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const manufacturers_module_1 = require("./manufacturers/manufacturers.module");
const suppliers_module_1 = require("./suppliers/suppliers.module");
const departments_module_1 = require("./departments/departments.module");
const locations_module_1 = require("./locations/locations.module");
const companies_module_1 = require("./companies/companies.module");
const status_labels_module_1 = require("./status-labels/status-labels.module");
const assets_module_1 = require("./assets/assets.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            asset_models_module_1.AssetModelsModule,
            categories_module_1.CategoriesModule,
            dashboard_module_1.DashboardModule,
            manufacturers_module_1.ManufacturersModule,
            suppliers_module_1.SuppliersModule,
            departments_module_1.DepartmentsModule,
            locations_module_1.LocationsModule,
            companies_module_1.CompaniesModule,
            status_labels_module_1.StatusLabelsModule,
            assets_module_1.AssetsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map