import type { Request } from 'express';
import { SpacesService } from './spaces.service';
import { CancelInviteDto, CreateSpaceDto, DeleteSpaceDto, InviteSpaceDto, InviteTokenDto, RemoveMemberDto, UpdateMemberRoleDto, UpdateSpaceDto } from './dto/spaces.dto';
export declare class SpacesController {
    private readonly spacesService;
    constructor(spacesService: SpacesService);
    create(body: CreateSpaceDto, req: Request): Promise<{
        message: string;
    }>;
    update(idParam: string, body: UpdateSpaceDto, req: Request): Promise<{
        message: string;
    }>;
    remove(body: DeleteSpaceDto): Promise<{
        message: string;
    }>;
    list(req: Request, pageParam?: string, limitParam?: string, sortParam?: string, orderParam?: string, searchParam?: string, appParam?: string, managedParam?: string): Promise<{
        spaces: {
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            key: string;
            category: string | null;
            userId: number;
            createdBy: number;
            updatedBy: number;
            type: string | null;
            app: string | null;
            managed: string | null;
            access: string | null;
            lead: string | null;
            owner: string | null;
            defaultAssignee: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    detail(idParam: string, req: Request): Promise<{
        space: {
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            key: string;
            category: string | null;
            userId: number;
            createdBy: number;
            updatedBy: number;
            type: string | null;
            app: string | null;
            managed: string | null;
            access: string | null;
            lead: string | null;
            owner: string | null;
            defaultAssignee: string | null;
        } | null;
        isOwner: boolean;
    }>;
    invite(idParam: string, body: InviteSpaceDto, req: Request): Promise<{
        invite: {
            id: number;
            email: string;
            createdAt: Date;
            status: string;
            createdBy: number;
            token: string;
            spaceId: number;
            role: string;
            acceptedBy: number | null;
            acceptedAt: Date | null;
            expiresAt: Date | null;
        };
    }>;
    acceptInvite(body: InviteTokenDto, req: Request): Promise<{
        invite: {
            id: number;
            email: string;
            createdAt: Date;
            status: string;
            createdBy: number;
            token: string;
            spaceId: number;
            role: string;
            acceptedBy: number | null;
            acceptedAt: Date | null;
            expiresAt: Date | null;
        };
    }>;
    declineInvite(body: InviteTokenDto, req: Request): Promise<{
        invite: {
            id: number;
            email: string;
            createdAt: Date;
            status: string;
            createdBy: number;
            token: string;
            spaceId: number;
            role: string;
            acceptedBy: number | null;
            acceptedAt: Date | null;
            expiresAt: Date | null;
        };
    }>;
    cancelInvite(body: CancelInviteDto, req: Request): Promise<{
        invite: {
            id: number;
            email: string;
            createdAt: Date;
            status: string;
            createdBy: number;
            token: string;
            spaceId: number;
            role: string;
            acceptedBy: number | null;
            acceptedAt: Date | null;
            expiresAt: Date | null;
        };
    }>;
    listInvites(req: Request): Promise<{
        invites: ({
            space: {
                id: number;
                name: string;
                key: string;
            };
        } & {
            id: number;
            email: string;
            createdAt: Date;
            status: string;
            createdBy: number;
            token: string;
            spaceId: number;
            role: string;
            acceptedBy: number | null;
            acceptedAt: Date | null;
            expiresAt: Date | null;
        })[];
    }>;
    access(idParam: string, req: Request): Promise<{
        space: {
            id: number;
            name: string;
            key: string;
            access: string;
        };
        ownerId: number;
        isOwner: boolean;
        owner: {
            id: number;
            email: string;
            role: string;
        };
        members: {
            id: number;
            email: string;
            role: string;
        }[];
        invites: {
            id: number;
            email: string;
            status: string;
        }[];
    }>;
    updateMemberRole(body: UpdateMemberRoleDto, req: Request): Promise<{
        member: {
            id: number;
            createdAt: Date;
            userId: number;
            spaceId: number;
            role: string;
        };
    }>;
    removeMember(body: RemoveMemberDto, req: Request): Promise<{
        removed: boolean;
    }>;
}
