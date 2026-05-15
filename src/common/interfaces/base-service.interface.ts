export interface IBaseService<T, CreateDto, UpdateDto> {
  findAll(query?: any): Promise<{ records: any[]; total: number }>;
  findOne(id: number | string): Promise<T>;
  create(data: CreateDto, userId: number): Promise<T>;
  update(id: number | string, data: UpdateDto, userId: number): Promise<T>;
  remove(id: number, userId: number): Promise<{ success: boolean }>;
}
