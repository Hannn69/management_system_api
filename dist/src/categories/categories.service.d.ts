import { Category } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
export declare class CategoriesService extends BaseService<Category, CreateSettingDto, UpdateSettingDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: any): Promise<{
        records: {
            qty: number;
            sendEmail: boolean;
            acceptance: boolean;
            _count: {
                assetModels: number;
            };
            name: string;
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            image: string | null;
            type: string;
            eula: string | null;
            useDefaultEula: boolean;
            requireConfirmation: boolean;
            emailNotification: boolean;
        }[];
        total: number;
    }>;
    create(data: any, userId: number): Promise<Category>;
}
