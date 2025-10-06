# 📦 Configuración de Supabase Storage

## ✅ YA COMPLETADO

- ✅ Supabase client instalado (`@supabase/supabase-js`)
- ✅ Archivo de configuración creado (`src/config/supabase.ts`)
- ✅ Servicio de storage creado (`src/services/storageService.ts`)
- ✅ Integración en página de editar perfil

## 🚀 PASOS QUE DEBES COMPLETAR

### Paso 1: Crear Proyecto en Supabase

1. **Ir a Supabase**
   - Visita: https://supabase.com/
   - Click en "Start your project" o "Sign in"
   - Crea una cuenta o inicia sesión

2. **Crear Nuevo Proyecto**
   - Click en "New Project"
   - Nombre: `BookMatch` o `Ruedelo`
   - Database Password: Crea una contraseña fuerte (guárdala)
   - Region: Elige la más cercana (ej: `South America (São Paulo)`)
   - Click en "Create new project"
   - Espera 1-2 minutos mientras se crea

### Paso 2: Obtener Credenciales

1. **Ir a Settings > API**
   - En el menú lateral, click en el ícono de engranaje (Settings)
   - Click en "API"

2. **Copiar credenciales**
   - **Project URL**: Copia la URL (ej: `https://xxxxx.supabase.co`)
   - **anon/public key**: Copia la clave `anon public` (es la clave pública)

### Paso 3: Configurar Storage Buckets

1. **Ir a Storage**
   - En el menú lateral, click en "Storage"

2. **Crear los buckets necesarios**
   - Click en "Create a new bucket"
   - Crea estos 3 buckets (uno por uno):

   **Bucket 1: avatars**
   - Name: `avatars`
   - Public bucket: ✅ Activado (para que las fotos sean públicas)
   - File size limit: 5 MB
   - Allowed MIME types: `image/*`
   - Click "Create bucket"

   **Bucket 2: covers**
   - Name: `covers`
   - Public bucket: ✅ Activado
   - File size limit: 5 MB
   - Allowed MIME types: `image/*`
   - Click "Create bucket"

   **Bucket 3: books**
   - Name: `books`
   - Public bucket: ✅ Activado
   - File size limit: 5 MB
   - Allowed MIME types: `image/*`
   - Click "Create bucket"

### Paso 4: Configurar Políticas de Storage (RLS)

Para cada bucket, necesitas configurar las políticas de acceso:

1. **Click en el bucket `avatars`**
2. **Ve a la pestaña "Policies"**
3. **Click en "New Policy"**
4. **Selecciona "Get started quickly"**
5. **Activa estas políticas:**

   - ✅ **SELECT (Read)**: Enable read access for all users
   - ✅ **INSERT (Upload)**: Enable insert for authenticated users only
   - ✅ **UPDATE**: Enable update for users based on user_id (opcional)
   - ✅ **DELETE**: Enable delete for users based on user_id (opcional)

6. **Click "Review" y luego "Save policy"**
7. **Repite para los buckets `covers` y `books`**

### Paso 5: Agregar Credenciales al Proyecto

1. **Edita el archivo `.env`:**

```bash
# Abre el archivo .env y agrega estas líneas al final:
REACT_APP_SUPABASE_URL=https://tu-proyecto.supabase.co
REACT_APP_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

2. **Reemplaza los valores:**
   - `https://tu-proyecto.supabase.co` → Tu Project URL
   - `tu_anon_key_aqui` → Tu anon/public key

3. **Guarda el archivo**

### Paso 6: Reiniciar el Servidor

```bash
# Detén el servidor (Ctrl+C) y reinícialo
npm start
```

## ✅ Probar la Integración

1. Ve a `/profile/edit`
2. Click en el ícono de cámara en la foto de perfil
3. Selecciona una imagen (máx. 5MB)
4. La imagen debería subirse a Supabase automáticamente
5. Verifica en Supabase Dashboard > Storage > avatars que se subió

## 🎯 Características del Storage Service

### Funciones Disponibles:

```typescript
// Subir foto de perfil
uploadProfilePhoto(file, userId)

// Subir foto de portada
uploadCoverPhoto(file, userId)

// Subir foto de libro
uploadBookPhoto(file, userId)

// Eliminar imagen
deleteImage(bucket, filePath)
```

### Validaciones Automáticas:

- ✅ Solo acepta imágenes
- ✅ Máximo 5MB por archivo
- ✅ Genera nombres únicos para evitar colisiones
- ✅ Organiza archivos por userId
- ✅ Retorna URL pública directamente

## 🔒 Seguridad

- Las políticas RLS aseguran que solo usuarios autenticados puedan subir
- Los buckets son públicos para lectura (necesario para mostrar las imágenes)
- Las imágenes se organizan por carpetas de usuario

## 🚨 Solución de Problemas

### Error: "Supabase credentials not found"
- Verifica que hayas agregado las variables al archivo `.env`
- Reinicia el servidor de desarrollo

### Error al subir imagen
- Verifica que los buckets existan en Supabase
- Verifica que los buckets sean públicos
- Verifica que las políticas RLS estén configuradas

### Las imágenes no se muestran
- Verifica que el bucket sea público
- Verifica la URL en la consola del navegador

## 📚 Recursos

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Supabase RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)

---

¡Listo! Ahora puedes subir imágenes a Supabase Storage 🎉
