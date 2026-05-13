export declare class CreateSettingDto {
    name: string;
    code?: string;
    description?: string;
    isActive?: boolean;
}
export declare class UpdateSettingDto {
    name?: string;
    code?: string;
    description?: string;
    isActive?: boolean;
}
export type SettingKindSlug = 'asset-models' | 'categories' | 'manufacturers' | 'suppliers' | 'departments' | 'locations' | 'companies';
