declare const managedOptions: readonly ["Team-managed", "Company-managed"];
declare const accessOptions: readonly ["Open", "Restricted", "Private"];
declare const roleOptions: readonly ["admin", "member", "viewer"];
export declare class CreateSpaceDto {
    name: string;
    key: string;
    type?: string;
    app?: string;
    managed?: (typeof managedOptions)[number];
    access?: (typeof accessOptions)[number];
    lead?: string;
    category?: string;
    owner?: string;
    defaultAssignee?: string;
}
export declare class UpdateSpaceDto {
    name?: string;
    key?: string;
    type?: string;
    app?: string;
    managed?: (typeof managedOptions)[number];
    access?: (typeof accessOptions)[number];
    lead?: string;
    category?: string;
    owner?: string;
    defaultAssignee?: string;
}
export declare class DeleteSpaceDto {
    id?: number;
    slug?: string;
    key?: string;
}
export declare class InviteSpaceDto {
    email: string;
    role?: (typeof roleOptions)[number];
}
export declare class InviteTokenDto {
    token: string;
}
export declare class CancelInviteDto {
    inviteId: number;
}
export declare class UpdateMemberRoleDto {
    spaceId: string;
    memberId: number;
    role: (typeof roleOptions)[number];
}
export declare class RemoveMemberDto {
    spaceId: string;
    memberId: number;
}
export {};
