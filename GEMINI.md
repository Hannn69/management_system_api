# NestJS API Agent Instructions

These instructions are scoped to the `management_system_api/` directory and govern backend development.

## Backend Mandates

### 1. Module Implementation
- **Standard Layout**: Every new module must include `.controller.ts`, `.service.ts`, and `.module.ts`.
- **Validation**: Body parameters must use DTOs with `class-validator` decorators.
- **Service Logic**: Keep controllers thin; all business logic and Prisma calls should reside in the service.

### 2. Database Integrity
- **Migrations**: Never modify `prisma/migrations` manually. Always use `prisma migrate dev`.
- **Typing**: Use generated Prisma types for internal data handling.
- **Seeding**: Maintain `prisma/seed.ts` to ensure a consistent local development environment.

### 3. API Standards
- **RESTful Endpoints**: Follow standard HTTP methods (GET, POST, PATCH, DELETE).
- **Versioning**: Ensure compatibility with the Next.js frontend by maintaining stable response shapes.
- **Security**: Apply guards (Auth, Roles, Throttler) as defined in the security codex.

## Testing & Verification
- **Unit Tests**: Run `pnpm test` for logic-heavy services.
- **E2E Tests**: Run `pnpm test:e2e` for all new controller endpoints.
- **Linting**: Run `pnpm lint --fix` before completing any backend task.
