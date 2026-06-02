# CODEX.md

## Project Overview

This repository is a NestJS API for a management system dashboard. It uses Prisma with MySQL and exposes resource-style modules for assets, users, companies, locations, departments, roles, permissions, and related settings data.

Key stack:
- NestJS 11
- Prisma
- MySQL
- Jest for unit and e2e tests
- `pnpm` as the primary package manager

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Start MySQL:

```bash
docker compose up -d
```

3. Configure environment variables in `.env`.

Expected local database URL:

```env
DATABASE_URL="mysql://management_app:management_app_password@localhost:3306/management_system"
```

Useful local env vars:

```env
PORT=8080
CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001
```

4. Generate Prisma client and run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

5. Start the API:

```bash
pnpm start:dev
```

The API listens on port `8080` by default.

## Common Commands

```bash
pnpm start:dev
pnpm build
pnpm lint
pnpm format
pnpm test
pnpm test:e2e
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## Codebase Structure

- `src/`: application source
- `src/<resource>/`: typical Nest module layout with `controller`, `service`, and `module`
- `src/common/`: shared base classes and DTO helpers
- `src/prisma/`: Prisma Nest integration
- `src/generated/`: generated Prisma client artifacts
- `prisma/schema.prisma`: database schema
- `prisma/migrations/`: migration history
- `prisma/seed.ts`: seed script
- `test/`: e2e coverage and test helpers
- `dist/`: compiled output

## Conventions

- Most CRUD resources follow the shared `BaseService` and `BaseController` pattern in `src/common/`.
- Records often support lookup by numeric `id` or string `slug`.
- Validation is enforced globally through Nest's `ValidationPipe` with `whitelist`, `forbidNonWhitelisted`, and transformation enabled.
- Request bodies can be larger than default limits; `main.ts` configures JSON and URL-encoded payload limits to `10mb`.
- CORS is driven by the `CORS_ORIGIN` environment variable as a comma-separated list.

## Prisma Notes

- Update `prisma/schema.prisma` first for data model changes.
- After schema changes, run:

```bash
pnpm db:generate
pnpm db:migrate
```

- Do not hand-edit generated Prisma files under `src/generated/`.
- Do not treat `dist/` as source of truth; rebuild instead of editing compiled files.

## Testing Guidance

- Run `pnpm test` for unit tests.
- Run `pnpm test:e2e` for endpoint-level verification.
- Prefer adding or updating tests when changing controller behavior, auth flows, filters, or Prisma-backed resource logic.

## Working Safely

- Check for existing patterns in nearby modules before adding new ones.
- Keep DTO validation aligned with the global validation pipe behavior.
- Preserve compatibility with existing frontend expectations where possible, especially response shapes for list endpoints and asset formatting.
- If changing auth, roles, or permissions, also review `ROLES_PERMISSIONS_SETUP.md`.
