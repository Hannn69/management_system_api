import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Permission, Role, RolePermission } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Helper function to create slug from name
   */
  private createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  /**
   * Create a new role and automatically create permission entries for all existing permissions
   */
  async createRole(data: {
    name: string;
    description?: string;
  }): Promise<Role> {
    // Create the role
    const role = await this.prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
        slug: this.createSlug(data.name),
      },
    });

    // Get all permissions
    const permissions = await this.prisma.permission.findMany();

    // Create role permission entries for all permissions
    const rolePermissions: RolePermission[] = [];
    for (const permission of permissions) {
      const permissionSlug = `${this.createSlug(role.name)}-${this.createSlug(
        permission.name,
      )}`;

      const rolePermission = await this.prisma.rolePermission.create({
        data: {
          roleId: role.id,
          permissionId: permission.id,
          slug: permissionSlug,
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      });
      rolePermissions.push(rolePermission);
    }

    return role;
  }

  /**
   * Get a role by ID
   */
  async getRole(id: number): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  /**
   * Get all roles
   */
  async getAllRoles(): Promise<Role[]> {
    return this.prisma.role.findMany({
      include: {
        rolePermissions: true,
      },
    });
  }

  /**
   * Update a role
   */
  async updateRole(
    id: number,
    data: {
      name?: string;
      description?: string;
    },
  ): Promise<Role> {
    return this.prisma.role.update({
      where: { id },
      data: {
        ...data,
        ...(data.name && { slug: this.createSlug(data.name) }),
      },
    });
  }

  /**
   * Delete a role
   */
  async deleteRole(id: number): Promise<Role> {
    return this.prisma.role.delete({
      where: { id },
    });
  }

  /**
   * Get role permissions
   */
  async getRolePermissions(roleId: number): Promise<RolePermission[]> {
    return this.prisma.rolePermission.findMany({
      where: { roleId },
      include: {
        permission: true,
      },
    });
  }

  /**
   * Update role permission
   */
  async updateRolePermission(
    roleId: number,
    permissionId: number,
    data: {
      create?: boolean;
      read?: boolean;
      update?: boolean;
      delete?: boolean;
    },
  ): Promise<RolePermission> {
    return this.prisma.rolePermission.update({
      where: {
        roleId_permissionId: {
          roleId,
          permissionId,
        },
      },
      data,
    });
  }
}
