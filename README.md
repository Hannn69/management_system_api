# Management System API

NestJS API with Prisma and MySQL for the dashboard application.

## Database

Local development uses Dockerized MySQL in [docker-compose.yml](./docker-compose.yml).

```bash
docker compose up -d
```

The API expects this connection string:

```env
DATABASE_URL="mysql://management_app:management_app_password@localhost:3306/management_system"
```

Security note:
- The compose file uses a dedicated app user instead of `root`.
- The bundled passwords are development defaults only. Change them before using this outside local development.

## Setup

```bash
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm start:dev
```

The API listens on port `8080`.

## Frontend Integration

Set the frontend app to call:

```env
NEXT_PUBLIC_API_URL="http://localhost:8080"
```
