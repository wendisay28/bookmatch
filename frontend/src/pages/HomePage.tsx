import React, { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import LeftSidebar from '../components/home/LeftSidebar';
import HeroCarousel from '../components/home/HeroCarousel';

const HomePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  return (
    <Box sx={{ 
      display: 'flex', 
      pt: '64px',
      minHeight: 'calc(100vh - 64px)',
      bgcolor: 'background.default',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      width: '100vw'
    }}>
      {/* Línea de referencia horizontal */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'repeating-linear-gradient(to right, #000 0, #000 10px, transparent 10px, transparent 20px)',
        zIndex: 1000,
        pointerEvents: 'none'
      }} />

      {/* Left Sidebar */}
      <Box sx={{
        position: 'fixed',
        left: 0,
        top: '64px',
        bottom: 0,
        zIndex: 100,
        width: sidebarCollapsed ? '64px' : '180px',
        transition: 'width 0.3s ease',
        backgroundColor: 'background.paper',
        boxShadow: 1,
        overflow: 'hidden'
      }}>
        <LeftSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onOpenAI={() => setShowAIRecommendations(true)}
        />
      </Box>

      {/* Contenedor Principal con borde rojo - Aún más angosto */}
      <Box sx={{
        position: 'fixed',
        left: { xs: '96px', sm: sidebarCollapsed ? '96px' : '196px' },
        right: '40px',
        top: '64px',
        bottom: 0,
        overflowY: 'auto',
        transition: 'left 0.3s ease, right 0.3s ease',
        padding: '16px 0',
        boxSizing: 'border-box',
        border: '2px solid red',
        backgroundColor: 'background.default',
        width: 'auto'
      }}>
        {/* Contenedor del carrusel */}
        <Box sx={{ 
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          position: 'relative',
          border: '2px solid orange',
          mb: 3,
          overflow: 'hidden',
          px: 2
        }}>
          <Box sx={{
            width: '100%',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'rgba(0,0,0,0.1)',
              zIndex: 1
            }
          }}>
            <HeroCarousel />
          </Box>
        </Box>

        {/* Línea divisoria */}
        <Divider sx={{ my: 3, borderColor: 'divider' }} />

        {/* Contenedor principal de dos columnas */}
        <Box sx={{ 
          display: 'flex',
          gap: 3,
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          px: 2
        }}>
          {/* Columna izquierda - Feed principal (80%) */}
          <Box sx={{ 
            flex: '0 0 calc(80% - 12px)',
            bgcolor: 'background.paper',
            borderRadius: 1,
            p: 2,
            boxShadow: 1
          }}>
            <Typography variant="h6" gutterBottom>Feed Principal</Typography>
            <Box sx={{ height: '800px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
              <Typography color="text.secondary">Contenido del feed irá aquí</Typography>
            </Box>
          </Box>

          {/* Columna derecha - Sidebar (20%) */}
          <Box sx={{ 
            flex: '0 0 calc(20% - 12px)',
            bgcolor: 'background.paper',
            borderRadius: 1,
            p: 2,
            boxShadow: 1,
            position: 'sticky',
            top: '16px',
            alignSelf: 'flex-start'
          }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>Tendencias</Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 2,
              mt: 2
            }}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ 
                  p: 1.5, 
                  borderRadius: 1,
                  bgcolor: 'rgba(0,0,0,0.02)',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.04)'
                  }
                }}>
                  <Typography variant="body2" fontWeight={500}>Tendencia #{item}</Typography>
                  <Typography variant="caption" color="text.secondary">Descripción de la tendencia</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;