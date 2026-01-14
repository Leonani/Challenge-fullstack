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

# Setup Frontend

Frontend desarrollado como parte de un challenge técnico fullstack, consumiendo una API REST construida en NestJS.  
El foco está puesto en arquitectura, separación de responsabilidades y buenas prácticas.

---

## 🧱 Stack Tecnológico

- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Fetch API
- Autenticación JWT

---

## 🏗️ Arquitectura

Se utiliza una arquitectura orientada a separación clara de responsabilidades:

- **Pages**: composición de vistas
- **Containers**: manejo de estado y lógica
- **Components**: render puro (presentational)
- **Hooks**: lógica reutilizable
- **Context**: estado global (auth)
- **API**: acceso centralizado al backend

```txt
src/
├── api/
│   └── api.ts
├── components/
│   └── PostCard.tsx
├── containers/
│   └── PostsContainer.tsx
├── context/
│   └── AuthContext.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── usePosts.ts
│   └── useProfile.ts
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Posts.tsx
│   ├── PostDetail.tsx
│   ├── Profile.tsx
│   └── CreatePost.tsx
├── routes/
│   └── AppRoutes.tsx
├── styles/
│   └── index.css
└── main.tsx
```
## 🔐 Autenticación

- Autenticación basada en JWT
- El token se guarda en un AuthContext
- Se envía automáticamente en requests protegidas

```bash
Authorization: Bearer <token>
```

## 🌐 Comunicación con la API

Toda la comunicación con el backend se centraliza en un helper único:
```bash
apiFetch(endpoint, options)
```
Ventajas:

-Manejo uniforme de errores
-Evita duplicación de lógica
-Facilita cambios futuros (interceptors, refresh token)

## 📄 Manejo de Estado

- Estado local con useState
- Side effects con useEffect
- Hooks personalizados para cada dominio
- Fallbacks defensivos ante respuestas inválidas

## 🧭 Ruteo

- React Router DOM
- Rutas públicas y privadas
- Protección basada en estado de autenticación

## 🎨 UI / Estilos

- TailwindCSS
- Enfoque utility-first
- Componentes desacoplados de la lógica
- UI simple y consistente

## ⚙️ Configuración
Requisitos:
- Node.js 18.x
- pnpm

##
1. Variables de entorno:
```bash
VITE_API_URL=http://localhost:3000
```
2. Instalación:
```bash
pnpm install
```
3. Ejecución:
```bash
pnpm dev
```