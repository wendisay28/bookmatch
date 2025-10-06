import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './config/supabase.js';

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba con Supabase
app.get('/api/health', async (req, res) => {
  try {
    // Probamos la conexión a Supabase
    const { data, error } = await supabase
      .from('test_table')
      .select('*')
      .limit(1);
      
    if (error) throw error;
    
    res.status(200).json({ 
      status: 'ok', 
      message: 'Servidor y Supabase funcionando correctamente',
      supabaseConnected: true,
      data: data || 'Tabla test_table no encontrada'
    });
  } catch (error) {
    console.error('Error conectando a Supabase:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Error conectando a Supabase',
      error: error.message 
    });
  }
});

// Rutas de autenticación (ejemplo)
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    
    res.status(201).json({ 
      success: true, 
      message: 'Usuario registrado exitosamente',
      user: data.user 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error al registrar usuario',
      error: error.message 
    });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Algo salió mal en el servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🔗 Supabase URL: ${process.env.SUPABASE_URL?.substring(0, 30)}...`);
});
