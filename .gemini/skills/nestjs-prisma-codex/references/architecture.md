# Architectural Standards

## Feature-Based Modularity
All features should be encapsulated in their own folder. A typical feature folder looks like:
- `feature.module.ts`: Registers controllers and providers.
- `feature.controller.ts`: Handles HTTP routing (extends `BaseController`).
- `feature.service.ts`: Handles business logic and Prisma interaction (extends `BaseService`).
- `dto/`: Contains `create-feature.dto.ts` and `update-feature.dto.ts`.

## Base Class Usage
### BaseService
Provides standard CRUD methods:
- `findAll(params)`
- `findOne(id/slug)`
- `create(data)`
- `update(id, data)`
- `remove(id)`

### BaseController
Exposes standard REST endpoints. Overriding these methods should be done sparingly to maintain consistency.

## DTO vs Entity
- **Entities**: Prisma models used for internal logic and database interaction.
- **DTOs**: TypeScript classes used for API input/output. Use `class-validator` for runtime validation.
- **Rule**: Never expose the database `id` if a `slug` is available for public identification. Hide sensitive fields (like `password`) using NestJS `@Exclude()` or by carefully shaping the DTO.
