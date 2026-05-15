import { StatusLabel } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { StatusLabelsService } from './status-labels.service';
export declare class StatusLabelsController extends BaseController<StatusLabel, CreateSettingDto, UpdateSettingDto> {
    private readonly statusLabelsService;
    constructor(statusLabelsService: StatusLabelsService);
    findAll(query: any): Promise<{
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
}
