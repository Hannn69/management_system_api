import { BaseQuery } from '../base.service';
export interface IBaseService<T, CreateDto, UpdateDto> {
    findAll(query?: BaseQuery): Promise<{
        records: any[];
        total: number;
    }>;
    findOne(id: number | string): Promise<T>;
    create(data: CreateDto, userId: number, extra?: any): Promise<T>;
    update(id: number | string, data: UpdateDto, userId: number): Promise<T>;
    remove(id: number, userId: number): Promise<{
        success: boolean;
    }>;
}
