---
name: nestjs-prisma-codex
description: Expert guidance for NestJS, TypeScript, Prisma, and MySQL development. Use when creating modules, updating database schemas, implementing business logic, or managing RBAC permissions in the management system.
---

# NestJS Prisma Codex

This skill provides the architectural mandates and procedural workflows for the management system API.

## Core Mandates

1.  **Feature-Based Modularity**: Group all domain-related files (module, service, controller, DTOs) in a single directory under `src/`.
2.  **Base Class Inheritance**: All CRUD resources MUST extend `BaseService` and `BaseController` from `src/common/` unless there is a strong architectural reason not to.
3.  **Type Safety**: Always use DTOs for request/response payloads. Never return Prisma entities directly.
4.  **Schema-First Migrations**: Always update `schema.prisma` first, then run `pnpm db:generate` and `pnpm db:migrate`.

## Procedural Workflows

### 1. Creating a New Resource Module
When adding a new resource (e.g., "Vehicles"):
1.  **Schema**: Add the model to `prisma/schema.prisma`. Run `pnpm db:generate` and `pnpm db:migrate`.
2.  **Scaffolding**: Create `src/vehicles/` and implement `vehicles.module.ts`, `vehicles.service.ts` (extending `BaseService`), and `vehicles.controller.ts` (extending `BaseController`).
3.  **DTOs**: Create `dto/create-vehicle.dto.ts` and `dto/update-vehicle.dto.ts` with full validation decorators.
4.  **Permissions**: Register the new module in the RBAC system. See [RBAC.md](references/rbac.md).

### 2. Database Schema Updates
1.  Modify `prisma/schema.prisma`.
2.  Run `pnpm db:generate` to update the Prisma Client.
3.  Run `pnpm db:migrate` to create and apply the MySQL migration.
4.  If needed, update `prisma/seed.ts` and run `pnpm db:seed`.

## Reference Guides

- **Architecture Details**: See [architecture.md](references/architecture.md) for patterns and DTO standards.
- **Database Best Practices**: See [prisma-mysql.md](references/prisma-mysql.md) for performance, indexing, and connection pooling.
- **RBAC & Permissions**: See [rbac.md](references/rbac.md) for managing roles and granular module access.
