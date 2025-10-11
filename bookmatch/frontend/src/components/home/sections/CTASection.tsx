import React from 'react';
import { Box, Typography, Button, Container, Grid, alpha } from '@mui/material';
import { AutoStories, People, EmojiEvents, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <AutoStories sx={{ fontSize: 40 }} />,
      title: 'Miles de libros',
      description: 'Intercambia y descubre'
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: 'Comunidad activa',
      description: 'Lectores apasionados'
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
      title: 'Beneficios exclusivos',
      description: 'En aliados culturales'
    }
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: { xs: 0, sm: 6 },
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: { xs: 6, sm: 8, md: 10 },
        my: 8,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          opacity: 0.4,
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', color: 'white' }}>
          {/* Título principal */}
          <Typography
            variant="h2"
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
              mb: 2,
              lineHeight: 1.2,
              textShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            ¿Listo para tu próxima
            <br />
            aventura literaria?
          </Typography>

          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            variant="h6"
            sx={{
              mb: 5,
              opacity: 0.95,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              maxWidth: 700,
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6
            }}
          >
            Únete a nuestra comunidad de lectores apasionados, intercambia libros
            y descubre un mundo de historias por explorar
          </Typography>

          {/* Features */}
          <Grid
            container
            spacing={3}
            sx={{ mb: 5 }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box
                  component={motion.div}
                  whileHover={{ y: -5 }}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box
                    sx={{
                      color: 'white',
                      mb: 1.5,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.1rem' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.9, fontSize: '0.9rem' }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Botones CTA */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              endIcon={<ArrowForward />}
              sx={{
                px: 5,
                py: 2,
                borderRadius: 3,
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'none',
                bgcolor: 'white',
                color: '#764ba2',
                boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                '&:hover': {
                  bgcolor: alpha('#ffffff', 0.95),
                  boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Regístrate Gratis
            </Button>

            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="outlined"
              size="large"
              onClick={() => navigate('/explore')}
              sx={{
                px: 5,
                py: 2,
                borderRadius: 3,
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'none',
                color: 'white',
                borderColor: 'white',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Explorar Libros
            </Button>
          </Box>

          {/* Trust Badge */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            sx={{ mt: 5, pt: 4, borderTop: '1px solid rgba(255,255,255,0.2)' }}
          >
            <Typography
              variant="body2"
              sx={{
                opacity: 0.85,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                flexWrap: 'wrap'
              }}
            >
              <span>✨ Más de 10,000 libros disponibles</span>
              <span>•</span>
              <span>📚 5,000+ intercambios realizados</span>
              <span>•</span>
              <span>⭐ Calificación 4.8/5</span>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;
