# Backend de BookMatch con Supabase

Este es el backend para la aplicación BookMatch, construido con Node.js, Express y Supabase.

## Configuración

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configura las variables de entorno en `.env` con tus credenciales de Supabase.

## Instalación

```bash
npm install
```

## Iniciar el servidor

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## Endpoints

- `GET /api/health` - Verifica el estado del servidor y la conexión a Supabase
- `POST /api/register` - Registro de usuarios (ejemplo)

## Estructura del Proyecto

```
/backend
  /config
    - supabase.js    # Configuración de Supabase
  /middleware
    - auth.js        # Middleware de autenticación
  /routes
    - auth.routes.js # Rutas de autenticación
  server.js          # Punto de entrada de la aplicación
```
