# Prisma & MySQL Best Practices

## Prisma 7 Configuration
- **Driver Adapters**: Ensure `@prisma/adapter-mysql` is used in the Prisma client instantiation.
- **Output Directory**: Generate the client into `src/generated/prisma` to ensure IDE type-hinting and predictable CI/CD builds.

## Schema Design & Indexing
- **Slugs**: Use unique string slugs for public-facing URLs. Ensure they are indexed.
- **Foreign Keys**: Prisma handles relation constraints, but ensure corresponding indexes are created in MySQL for performance.
- **Composite Indexes**: Use `@@index([field1, field2])` for complex filters (e.g., filtering assets by location and status).

## Performance
- **Connection Pooling**: Use Prisma Accelerate for serverless or high-traffic scenarios. For local development, ensure MySQL `max_connections` is sufficient for NestJS watch mode restarts.
- **Query Optimization**: Use `select` to retrieve only the necessary fields. Avoid `include` for deeply nested relations unless required; prefer secondary queries or batching.

## Migration Safety
- Never use `prisma db push` in production.
- Use `prisma migrate deploy` in CI/CD.
- Review generated SQL migrations to ensure they don't perform destructive operations (like dropping tables) unless intended.
