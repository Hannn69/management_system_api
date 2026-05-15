export declare class CreateSettingDto {
    name: string;
    phone?: string;
    fax?: string;
    email?: string;
    logo?: string;
    notes?: string;
    type?: string;
    code?: string;
    description?: string;
    isActive?: boolean;
    companyId?: number;
    locationId?: number;
    parentId?: number;
    managerId?: number;
}
export declare class UpdateSettingDto {
    name?: string;
    phone?: string;
    fax?: string;
    email?: string;
    logo?: string;
    notes?: string;
    type?: string;
    code?: string;
    description?: string;
    isActive?: boolean;
    companyId?: number;
    locationId?: number;
    parentId?: number;
    managerId?: number;
}
