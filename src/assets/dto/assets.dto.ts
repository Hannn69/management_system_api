import { IsString, IsOptional, IsInt, IsBoolean, IsNumber, IsDateString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  assetTag: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  serial?: string;

  @IsInt()
  modelId: number;

  @IsInt()
  statusId: number;

  @IsInt()
  @IsOptional()
  companyId?: number;

  @IsInt()
  @IsOptional()
  locationId?: number;

  @IsInt()
  @IsOptional()
  supplierId?: number;

  @IsInt()
  @IsOptional()
  checkedOutUserId?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  isRequestable?: boolean;

  @IsBoolean()
  @IsOptional()
  isByod?: boolean;

  @IsInt()
  @IsOptional()
  warrantyMonths?: number;

  @IsDateString()
  @IsOptional()
  expectedCheckin?: string;

  @IsDateString()
  @IsOptional()
  nextAuditDate?: string;

  @IsString()
  @IsOptional()
  orderNumber?: string;

  @IsDateString()
  @IsOptional()
  purchaseDate?: string;

  @IsNumber()
  @IsOptional()
  purchaseCost?: number;

  @IsDateString()
  @IsOptional()
  eolDate?: string;
}

export class UpdateAssetDto {
  @IsString()
  @IsOptional()
  assetTag?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  serial?: string;

  @IsInt()
  @IsOptional()
  modelId?: number;

  @IsInt()
  @IsOptional()
  statusId?: number;

  @IsInt()
  @IsOptional()
  companyId?: number;

  @IsInt()
  @IsOptional()
  locationId?: number;

  @IsInt()
  @IsOptional()
  supplierId?: number;

  @IsInt()
  @IsOptional()
  checkedOutUserId?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  isRequestable?: boolean;

  @IsBoolean()
  @IsOptional()
  isByod?: boolean;

  @IsInt()
  @IsOptional()
  warrantyMonths?: number;

  @IsDateString()
  @IsOptional()
  expectedCheckin?: string;

  @IsDateString()
  @IsOptional()
  nextAuditDate?: string;

  @IsString()
  @IsOptional()
  orderNumber?: string;

  @IsDateString()
  @IsOptional()
  purchaseDate?: string;

  @IsNumber()
  @IsOptional()
  purchaseCost?: number;

  @IsDateString()
  @IsOptional()
  eolDate?: string;
}
