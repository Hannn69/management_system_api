# RBAC & Permission Management

## Permission Model
The system uses a Module-Role-Permission model:
- **Module**: A functional area (e.g., "Assets", "Users").
- **Role**: A user group (e.g., "Admin", "Manager").
- **RolePermission**: Links a role to a module with `create`, `read`, `update`, and `delete` flags.

## Permission Inheritance
- **Admin**: Automatically inherits full access (CRUD = true) for all existing and future modules.
- **Standard Roles**: Default to no access (CRUD = false). Access must be explicitly granted via the `RolesController`.

## Dynamic Updates
When a new **Module** is created, the system must automatically generate `RolePermission` entries for all existing **Roles**.
When a new **Role** is created, it must automatically get `RolePermission` entries for all existing **Modules**.

## Guard Implementation
Use a custom NestJS `Guard` (e.g., `PermissionsGuard`) to check if the authenticated user's role has the required permission flags for the target module before allowing access to a controller method.
