import { Location } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from '../common/dto/entity.dto';
export declare class LocationsService extends BaseService<Location, CreateLocationDto, UpdateLocationDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
        records: any;
        total: any;
    }>;
    create(data: CreateLocationDto, userId: number): Promise<Location>;
}
