import { Request } from 'express';
import { IBaseService } from './interfaces/base-service.interface';
export declare abstract class BaseController<T, CreateDto, UpdateDto> {
    protected readonly service: IBaseService<T, CreateDto, UpdateDto>;
    constructor(service: IBaseService<T, CreateDto, UpdateDto>);
    findAll(): Promise<{
        records: T[];
    }>;
    findOne(id: number): Promise<{
        record: Awaited<T>;
    }>;
    create(body: CreateDto, req: Request): Promise<{
        record: Awaited<T>;
    }>;
    update(id: number, body: UpdateDto, req: Request): Promise<{
        record: Awaited<T>;
    }>;
    remove(id: number, req: Request): Promise<{
        success: boolean;
    }>;
}
