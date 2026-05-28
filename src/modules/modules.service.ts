import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Permission, RolePermission } from '@prisma/client';

@Injectable()
export class ModulesService {
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
   * Create a new permission and automatically create role permission entries for all existing roles
   */
  async createModule(data: {
    name: string;
    label: string;
    description?: string;
  }): Promise<Permission> {
    // Create the permission
    const permission = await this.prisma.permission.create({
      data: {
        name: data.name,
        label: data.label,
        description: data.description,
        slug: this.createSlug(data.name),
      },
    });

    // Get all roles
    const roles = await this.prisma.role.findMany();

    // Create role permission entries for all roles
    for (const role of roles) {
      const permissionSlug = `${this.createSlug(role.name)}-${this.createSlug(
        permission.name,
      )}`;

      await this.prisma.rolePermission.create({
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
    }

    return permission;
  }

  /**
   * Get a permission by ID
   */
  async getModule(id: number): Promise<Permission | null> {
    return this.prisma.permission.findUnique({
      where: { id },
    });
  }

  /**
   * Get all permissions
   */
  async getAllModules(): Promise<Permission[]> {
    return this.prisma.permission.findMany({
      include: {
        rolePermissions: true,
      },
    });
  }

  /**
   * Update a permission
   */
  async updateModule(
    id: number,
    data: {
      name?: string;
      label?: string;
      description?: string;
    },
  ): Promise<Permission> {
    return this.prisma.permission.update({
      where: { id },
      data: {
        ...data,
        ...(data.name && { slug: this.createSlug(data.name) }),
      },
    });
  }

  /**
   * Delete a permission
   */
  async deleteModule(id: number): Promise<Permission> {
    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
