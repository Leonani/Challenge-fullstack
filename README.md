# Fullstack Challenge – React + NestJS + PostgreSQL

## Descripción
Aplicación fullstack para gestionar usuarios y publicaciones. Incluye registro y login, CRUD de posts, perfil de usuario, paginación, validaciones, manejo de errores y autenticación JWT.

Tecnologías utilizadas:  
- Backend: NestJS 11 + Prisma 5 + PostgreSQL  
- Frontend: React 18+  
- Gestor de paquetes: pnpm  
- Autenticación: JWT  
- Validaciones: DTOs y pipes de NestJS  
- Seguridad: Guards y decoradores para permisos  

## Setup Backend
1. Clonar el repositorio y entrar a la carpeta backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Configurar variables de entorno en .env:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fullstack_challenge?schema=public"
JWT_SECRET="SUPER_SECRET_KEY"
PORT=3000
NODE_ENV=development
```
4. Generar Prisma Client:
```bash
pnpm prisma generate
```
5. Ejecutar migraciones:
```bash
pnpm prisma migrate dev --name init
```
6. Levantar backend:
```bash
pnpm run start
```

## Estructura de carpetas Backend
```bash
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── auth.service.ts
│   └── auth.controller.ts
├── users/
│   ├── dto/
│   │   ├── update-user.dto.ts
│   ├── guards/
│   │   └── owner.guard.ts
│   ├── users.service.ts
│   └── users.controller.ts
├── posts/
│   ├── dto/
│   │   ├── create-post.dto.ts
│   │   └── update-post.dto.ts
│   ├── guards/
│   │   └── post-owner.guard.ts
│   ├── posts.service.ts
│   └── posts.controller.ts
├── common/
│   ├── decorators/
│   │   └── user.decorator.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── pipes/
│   │   └── validation.pipe.ts
│   └── prisma.service.ts
├── app.module.ts
└── main.ts
```

## Endpoints Backend

### Auth
| Método | Endpoint        | Descripción           |
|--------|----------------|----------------------|
| POST   | /auth/register | Registrar usuario    |
| POST   | /auth/login    | Login y generar JWT  |

### Users
| Método | Endpoint      | Guard                           | Descripción               |
|--------|--------------|---------------------------------|--------------------------|
| GET    | /users/:id   | JwtAuthGuard                     | Obtener usuario por id    |
| PUT    | /users/:id   | JwtAuthGuard + UserOwnerGuard    | Editar usuario (solo dueño) |

### Posts
| Método | Endpoint                | Guard                           | Descripción                     |
|--------|------------------------|---------------------------------|--------------------------------|
| GET    | /posts?page=1&limit=10 | n/a                             | Listar posts con paginación    |
| GET    | /posts/:id             | n/a                             | Obtener post por id            |
| POST   | /posts                 | JwtAuthGuard                     | Crear post (usuario autenticado) |
| PUT    | /posts/:id             | JwtAuthGuard + PostOwnerGuard    | Editar post (solo dueño)       |

## Variables de Entorno
| Variable     | Descripción                        |
| ------------ | ---------------------------------- |
| DATABASE_URL | Conexión a PostgreSQL              |
| JWT_SECRET   | Clave secreta para JWT             |
| PORT         | Puerto del backend                 |
| NODE_ENV     | Entorno (development / production) |
