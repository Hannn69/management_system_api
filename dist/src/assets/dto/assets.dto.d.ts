export declare class CreateAssetDto {
    assetTag: string;
    name?: string;
    serial?: string;
    modelId: number;
    statusId: number;
    companyId?: number;
    locationId?: number;
    supplierId?: number;
    checkedOutUserId?: number;
    notes?: string;
    image?: string;
    isRequestable?: boolean;
    isByod?: boolean;
    warrantyMonths?: number;
    expectedCheckin?: string;
    nextAuditDate?: string;
    orderNumber?: string;
    purchaseDate?: string;
    purchaseCost?: number;
    eolDate?: string;
}
export declare class UpdateAssetDto {
    assetTag?: string;
    name?: string;
    serial?: string;
    modelId?: number;
    statusId?: number;
    companyId?: number;
    locationId?: number;
    supplierId?: number;
    checkedOutUserId?: number;
    notes?: string;
    image?: string;
    isRequestable?: boolean;
    isByod?: boolean;
    warrantyMonths?: number;
    expectedCheckin?: string;
    nextAuditDate?: string;
    orderNumber?: string;
    purchaseDate?: string;
    purchaseCost?: number;
    eolDate?: string;
}
