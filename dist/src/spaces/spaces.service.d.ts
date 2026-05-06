import { PrismaService } from '../prisma/prisma.service';
type CreateSpaceInput = {
    name: string;
    key: string;
    type?: string;
    app?: string;
    managed?: string;
    access?: string;
    lead?: string;
    category?: string;
    owner?: string;
    defaultAssignee?: string;
    userId: number;
    createdBy: number;
    updatedBy: number;
};
type UpdateSpaceInput = {
    name?: string;
    key?: string;
    type?: string;
    app?: string;
    managed?: string;
    access?: string;
    lead?: string;
    category?: string;
    owner?: string;
    defaultAssignee?: string;
    updatedBy?: number;
};
export declare class SpacesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(input: CreateSpaceInput): Promise<{
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
    }>;
    updateById(id: number, input: UpdateSpaceInput): Promise<{
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
    }>;
    updateBySlug(slug: string, input: UpdateSpaceInput): Promise<{
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
    }>;
    deleteById(id: number): Promise<void>;
    deleteBySlug(slug: string): Promise<void>;
    findPaged(params: {
        page: number;
        limit: number;
        sort: 'createdAt' | 'updatedAt' | 'name' | 'key';
        order: 'asc' | 'desc';
        search?: string;
        app?: string;
        managed?: string;
        userId: number;
    }): Promise<{
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
    }>;
    findByIdOrSlug(value: string): Promise<{
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
    } | null>;
    findByIdOrSlugForUser(value: string, userId: number): Promise<{
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
    } | null>;
    createInvite(params: {
        spaceId: number;
        email: string;
        createdBy: number;
        role?: string;
    }): Promise<{
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
    }>;
    acceptInvite(token: string, userId: number): Promise<{
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
    }>;
    listInvitesForEmail(email: string): Promise<({
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
    })[]>;
    declineInvite(token: string, email: string): Promise<{
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
    }>;
    cancelInvite(inviteId: number, userId: number): Promise<{
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
    }>;
    updateMemberRole(params: {
        spaceId: number;
        memberId: number;
        role: string;
        userId: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        spaceId: number;
        role: string;
    }>;
    removeMember(params: {
        spaceId: number;
        memberId: number;
        userId: number;
    }): Promise<{
        removed: boolean;
    }>;
    getAccessForUser(spaceId: number, userId: number): Promise<{
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
}
export {};
