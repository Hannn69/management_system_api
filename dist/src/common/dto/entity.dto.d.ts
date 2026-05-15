export declare class CreateCompanyDto {
    name: string;
    phone?: string;
    fax?: string;
    email?: string;
    logo?: string;
    notes?: string;
}
export declare class UpdateCompanyDto {
    name?: string;
    phone?: string;
    fax?: string;
    email?: string;
    logo?: string;
    notes?: string;
}
export declare class CreateCategoryDto {
    name: string;
    type: string;
    eula?: string;
    useDefaultEula?: boolean;
    requireConfirmation?: boolean;
    emailNotification?: boolean;
    image?: string;
    notes?: string;
}
export declare class UpdateCategoryDto {
    name?: string;
    type?: string;
    eula?: string;
    useDefaultEula?: boolean;
    requireConfirmation?: boolean;
    emailNotification?: boolean;
    image?: string;
    notes?: string;
}
export declare class CreateManufacturerDto {
    name: string;
    url?: string;
    supportUrl?: string;
    warrantyLookupUrl?: string;
    supportPhone?: string;
    supportEmail?: string;
    image?: string;
    notes?: string;
}
export declare class UpdateManufacturerDto {
    name?: string;
    url?: string;
    supportUrl?: string;
    warrantyLookupUrl?: string;
    supportPhone?: string;
    supportEmail?: string;
    image?: string;
    notes?: string;
}
export declare class CreateSupplierDto {
    name: string;
    contactName?: string;
    phone?: string;
    fax?: string;
    email?: string;
    url?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    image?: string;
    notes?: string;
}
export declare class UpdateSupplierDto {
    name?: string;
    contactName?: string;
    phone?: string;
    fax?: string;
    email?: string;
    url?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    image?: string;
    notes?: string;
}
export declare class CreateLocationDto {
    name: string;
    parentId?: number;
    managerId?: number;
    companyId?: number;
    phone?: string;
    fax?: string;
    currency?: string;
    address?: string;
    address2?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    image?: string;
    notes?: string;
}
export declare class UpdateLocationDto {
    name?: string;
    parentId?: number;
    managerId?: number;
    companyId?: number;
    phone?: string;
    fax?: string;
    currency?: string;
    address?: string;
    address2?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    image?: string;
    notes?: string;
}
export declare class CreateDepartmentDto {
    name: string;
    companyId?: number;
    phone?: string;
    fax?: string;
    managerId?: number;
    locationId?: number;
    image?: string;
    notes?: string;
}
export declare class UpdateDepartmentDto {
    name?: string;
    companyId?: number;
    phone?: string;
    fax?: string;
    managerId?: number;
    locationId?: number;
    image?: string;
    notes?: string;
}
export declare class CreateAssetModelDto {
    name: string;
    categoryId: number;
    manufacturerId: number;
    modelNumber?: string;
    depreciationId?: number;
    minQty?: number;
    requireSerialNumber?: boolean;
    eolMonths?: number;
    fieldsetId?: number;
    image?: string;
    notes?: string;
    isRequestable?: boolean;
}
export declare class UpdateAssetModelDto {
    name?: string;
    categoryId?: number;
    manufacturerId?: number;
    modelNumber?: string;
    depreciationId?: number;
    minQty?: number;
    requireSerialNumber?: boolean;
    eolMonths?: number;
    fieldsetId?: number;
    image?: string;
    notes?: string;
    isRequestable?: boolean;
}
export declare class CreateStatusLabelDto {
    name: string;
    type: string;
    notes?: string;
}
export declare class UpdateStatusLabelDto {
    name?: string;
    type?: string;
    notes?: string;
}
