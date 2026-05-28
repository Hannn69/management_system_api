import { StatusLabel } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
export declare class StatusLabelsService extends BaseService<StatusLabel, CreateSettingDto, UpdateSettingDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
        records: any;
        total: any;
    }>;
    create(data: CreateSettingDto, userId: number): Promise<StatusLabel>;
}
