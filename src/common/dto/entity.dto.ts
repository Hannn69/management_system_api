import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsOptional()
  @IsString()
  eula?: string;

  @IsOptional()
  @IsBoolean()
  useDefaultEula?: boolean;

  @IsOptional()
  @IsBoolean()
  requireConfirmation?: boolean;

  @IsOptional()
  @IsBoolean()
  emailNotification?: boolean;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  eula?: string;

  @IsOptional()
  @IsBoolean()
  useDefaultEula?: boolean;

  @IsOptional()
  @IsBoolean()
  requireConfirmation?: boolean;

  @IsOptional()
  @IsBoolean()
  emailNotification?: boolean;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateManufacturerDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsUrl({ require_tld: false }, { message: 'url must be a valid URL' })
  url?: string;

  @IsOptional()
  @IsUrl({ require_tld: false }, { message: 'supportUrl must be a valid URL' })
  supportUrl?: string;

  @IsOptional()
  @IsUrl(
    { require_tld: false },
    { message: 'warrantyLookupUrl must be a valid URL' },
  )
  warrantyLookupUrl?: string;

  @IsOptional()
  @IsString()
  supportPhone?: string;

  @IsOptional()
  @IsEmail()
  supportEmail?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateManufacturerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUrl({ require_tld: false }, { message: 'url must be a valid URL' })
  url?: string;

  @IsOptional()
  @IsUrl({ require_tld: false }, { message: 'supportUrl must be a valid URL' })
  supportUrl?: string;

  @IsOptional()
  @IsUrl(
    { require_tld: false },
    { message: 'warrantyLookupUrl must be a valid URL' },
  )
  warrantyLookupUrl?: string;

  @IsOptional()
  @IsString()
  supportPhone?: string;

  @IsOptional()
  @IsEmail()
  supportEmail?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  contactName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsUrl({ require_tld: false }, { message: 'url must be a valid URL' })
  url?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateSupplierDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  contactName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsUrl({ require_tld: false }, { message: 'url must be a valid URL' })
  url?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsInt()
  parentId?: number;

  @IsOptional()
  @IsInt()
  managerId?: number;

  @IsOptional()
  @IsInt()
  companyId?: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  parentId?: number;

  @IsOptional()
  @IsInt()
  managerId?: number;

  @IsOptional()
  @IsInt()
  companyId?: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsInt()
  companyId?: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsInt()
  managerId?: number;

  @IsOptional()
  @IsInt()
  locationId?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  companyId?: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsInt()
  managerId?: number;

  @IsOptional()
  @IsInt()
  locationId?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateAssetModelDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  categoryId!: number;

  @IsInt()
  manufacturerId!: number;

  @IsOptional()
  @IsString()
  modelNumber?: string;

  @IsOptional()
  @IsInt()
  depreciationId?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  minQty?: number;

  @IsOptional()
  @IsBoolean()
  requireSerialNumber?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  eolMonths?: number;

  @IsOptional()
  @IsInt()
  fieldsetId?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isRequestable?: boolean;
}

export class UpdateAssetModelDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsInt()
  manufacturerId?: number;

  @IsOptional()
  @IsString()
  modelNumber?: string;

  @IsOptional()
  @IsInt()
  depreciationId?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  minQty?: number;

  @IsOptional()
  @IsBoolean()
  requireSerialNumber?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  eolMonths?: number;

  @IsOptional()
  @IsInt()
  fieldsetId?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isRequestable?: boolean;
}

export class CreateStatusLabelDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateStatusLabelDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
