import {
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

const managedOptions = ['Team-managed', 'Company-managed'] as const;
const accessOptions = ['Open', 'Restricted', 'Private'] as const;
const roleOptions = ['admin', 'member', 'viewer'] as const;

export class CreateSpaceDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(16)
  key!: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  type?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  app?: string;

  @IsOptional()
  @IsIn(managedOptions)
  managed?: (typeof managedOptions)[number];

  @IsOptional()
  @IsIn(accessOptions)
  access?: (typeof accessOptions)[number];

  @IsOptional()
  @IsString()
  @MaxLength(120)
  lead?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  owner?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  defaultAssignee?: string;
}

export class UpdateSpaceDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  key?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  type?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  app?: string;

  @IsOptional()
  @IsIn(managedOptions)
  managed?: (typeof managedOptions)[number];

  @IsOptional()
  @IsIn(accessOptions)
  access?: (typeof accessOptions)[number];

  @IsOptional()
  @IsString()
  @MaxLength(120)
  lead?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  owner?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  defaultAssignee?: string;
}

export class DeleteSpaceDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  key?: string;
}

export class InviteSpaceDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsOptional()
  @IsIn(roleOptions)
  role?: (typeof roleOptions)[number];
}

export class InviteTokenDto {
  @IsString()
  @MinLength(8)
  @MaxLength(200)
  token!: string;
}

export class CancelInviteDto {
  @IsInt()
  @Min(1)
  inviteId!: number;
}

export class UpdateMemberRoleDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  spaceId!: string;

  @IsInt()
  @Min(1)
  memberId!: number;

  @IsIn(roleOptions)
  role!: (typeof roleOptions)[number];
}

export class RemoveMemberDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  spaceId!: string;

  @IsInt()
  @Min(1)
  memberId!: number;
}
