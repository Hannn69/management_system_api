export interface IBaseService<T, CreateDto, UpdateDto> {
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T>;
    create(data: CreateDto, userId: number): Promise<T>;
    update(id: number, data: UpdateDto, userId: number): Promise<T>;
    remove(id: number, userId: number): Promise<{
        success: boolean;
    }>;
}
