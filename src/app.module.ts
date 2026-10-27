import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AssetModelsModule } from './asset-models/asset-models.module';
import { CategoriesModule } from './categories/categories.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { DepartmentsModule } from './departments/departments.module';
import { LocationsModule } from './locations/locations.module';
import { CompaniesModule } from './companies/companies.module';
import { StatusLabelsModule } from './status-labels/status-labels.module';
import { AssetsModule } from './assets/assets.module';
import { RolesModule } from './roles/roles.module';
import { ModulesModule } from './modules/modules.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    AssetModelsModule,
    CategoriesModule,
    DashboardModule,
    ManufacturersModule,
    SuppliersModule,
    DepartmentsModule,
    LocationsModule,
    CompaniesModule,
    StatusLabelsModule,
    AssetsModule,
    RolesModule,
    ModulesModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
