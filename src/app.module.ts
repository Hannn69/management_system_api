import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
