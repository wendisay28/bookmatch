-- =====================================================
-- SUPABASE SETUP - BookMatch Events Table
-- =====================================================
-- Copia y pega este script en Supabase SQL Editor
-- Dashboard > SQL Editor > New Query
-- =====================================================

-- 1. Crear la tabla de eventos
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  max_attendees INTEGER DEFAULT 50,
  attendees INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  image TEXT,
  host_name TEXT,
  host_avatar TEXT,
  host_user_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_events_created_at ON public.events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_category ON public.events(category);
CREATE INDEX IF NOT EXISTS idx_events_host_user_id ON public.events(host_user_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(date);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 4. Crear políticas de seguridad

-- Política: Todos pueden leer eventos
CREATE POLICY "Anyone can view events"
  ON public.events
  FOR SELECT
  USING (true);

-- Política: Usuarios autenticados pueden crear eventos
CREATE POLICY "Authenticated users can create events"
  ON public.events
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política: Solo el creador puede actualizar sus eventos
CREATE POLICY "Users can update their own events"
  ON public.events
  FOR UPDATE
  USING (auth.uid()::text = host_user_id);

-- Política: Solo el creador puede eliminar sus eventos
CREATE POLICY "Users can delete their own events"
  ON public.events
  FOR DELETE
  USING (auth.uid()::text = host_user_id);

-- 5. Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Crear trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_events_updated_at ON public.events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Insertar algunos eventos de ejemplo (opcional)
INSERT INTO public.events (title, description, date, time, location, category, max_attendees, is_premium, image, host_name, host_avatar, host_user_id)
VALUES
  (
    'Club de Lectura: Cien Años de Soledad',
    'Discusión sobre la obra maestra de Gabriel García Márquez',
    '2025-11-15',
    '18:00',
    'Café Literario El Péndulo, Bogotá',
    'Club de Lectura',
    25,
    false,
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    'Admin BookMatch',
    'https://i.pravatar.cc/150?img=1',
    'admin'
  ),
  (
    'Taller de Escritura Creativa',
    'Aprende técnicas de escritura creativa con autores profesionales',
    '2025-11-20',
    '16:00',
    'Biblioteca Nacional, Bogotá',
    'Taller',
    30,
    true,
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    'Admin BookMatch',
    'https://i.pravatar.cc/150?img=2',
    'admin'
  ),
  (
    'Encuentro de Intercambio de Libros',
    'Trae tus libros y encuentra nuevas lecturas',
    '2025-11-22',
    '15:00',
    'Parque Simón Bolívar, Bogotá',
    'Intercambio',
    50,
    false,
    'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800&q=80',
    'Admin BookMatch',
    'https://i.pravatar.cc/150?img=3',
    'admin'
  );

-- =====================================================
-- CONFIGURACIÓN DEL STORAGE BUCKET
-- =====================================================
-- Ve a: Dashboard > Storage > Create a new bucket
--
-- Nombre del bucket: events
-- Public bucket: true (para que las imágenes sean públicas)
--
-- Luego ejecuta estas políticas:
-- =====================================================

-- Política de Storage: Cualquiera puede ver imágenes
-- (Ejecutar después de crear el bucket 'events')
--
-- Dashboard > Storage > events > Policies > New Policy

-- Política INSERT (para subir imágenes)
-- CREATE POLICY "Anyone can upload event images"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'events');

-- Política SELECT (para ver imágenes)
-- CREATE POLICY "Anyone can view event images"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'events');

-- Política DELETE (solo el creador)
-- CREATE POLICY "Users can delete their event images"
-- ON storage.objects FOR DELETE
-- USING (bucket_id = 'events');

-- =====================================================
-- ¡LISTO!
-- Ahora tu aplicación puede:
-- - ✅ Crear eventos
-- - ✅ Leer eventos
-- - ✅ Actualizar eventos (solo el creador)
-- - ✅ Eliminar eventos (solo el creador)
-- - ✅ Subir imágenes de eventos
-- =====================================================
