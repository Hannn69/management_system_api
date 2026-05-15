import { StatusLabel } from '@prisma/client';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
export declare class StatusLabelsService extends BaseService<StatusLabel, CreateSettingDto, UpdateSettingDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: any): Promise<{
        records: {
            assets: number;
            _count: {
                assets: number;
            };
            name: string;
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            type: string;
        }[];
        total: number;
    }>;
    create(data: any, userId: number): Promise<StatusLabel>;
}
