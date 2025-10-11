import { Box, Card, CardContent, Grid, Typography, Chip, IconButton, useTheme, alpha } from '@mui/material';
import { LocalCafe, MenuBook, Business, Place, Museum, TheaterComedy, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Ally {
  id: number;
  name: string;
  type: string;
  offer: string;
  address: string;
  icon: 'cafe' | 'bookstore' | 'coworking' | 'museum' | 'theater';
  color: string;
}

const iconMap = {
  cafe: LocalCafe,
  bookstore: MenuBook,
  coworking: Business,
  museum: Museum,
  theater: TheaterComedy,
};

const AlliesSection = () => {
  const theme = useTheme();

  const allies: Ally[] = [
    {
      id: 1,
      name: 'Café Literario El Péndulo',
      type: 'Cafetería',
      offer: '20% en bebidas y postres',
      address: 'Calle 72 #10-34, Bogotá',
      icon: 'cafe',
      color: '#8B4513'
    },
    {
      id: 2,
      name: 'Librería El Ateneo',
      type: 'Librería',
      offer: '10% en libros nuevos',
      address: 'Carrera 15 #85-23, Bogotá',
      icon: 'bookstore',
      color: '#2E7D32'
    },
    {
      id: 3,
      name: 'Co-working La Nube',
      type: 'Coworking',
      offer: 'Primera hora gratis',
      address: 'Avenida 19 #103-85, Bogotá',
      icon: 'coworking',
      color: '#1976D2'
    },
    {
      id: 4,
      name: 'Editorial Planeta',
      type: 'Editorial',
      offer: 'Acceso anticipado a lanzamientos',
      address: 'Calle 93 #13-24, Bogotá',
      icon: 'bookstore',
      color: '#7B1FA2'
    },
    {
      id: 5,
      name: 'Librería Nacional',
      type: 'Librería',
      offer: '15% en compras +$100.000',
      address: 'Centro Comercial Andino',
      icon: 'bookstore',
      color: '#C62828'
    },
    {
      id: 6,
      name: 'Café Libro',
      type: 'Cafetería',
      offer: 'Café gratis con intercambio',
      address: 'Carrera 7 #63-42, Bogotá',
      icon: 'cafe',
      color: '#D84315'
    },
    {
      id: 7,
      name: 'Museo Nacional',
      type: 'Museo',
      offer: 'Entrada 2x1 con carnet TFT',
      address: 'Carrera 7 #28-66, Bogotá',
      icon: 'museum',
      color: '#0277BD'
    },
    {
      id: 8,
      name: 'Teatro Colón',
      type: 'Teatro',
      offer: '15% en boletos culturales',
      address: 'Calle 10 #5-32, Bogotá',
      icon: 'theater',
      color: '#AD1457'
    },
    {
      id: 9,
      name: 'WeWork',
      type: 'Coworking',
      offer: '20% en pases diarios',
      address: 'Calle 93B #13-70, Bogotá',
      icon: 'coworking',
      color: '#00796B'
    },
    {
      id: 10,
      name: 'Casa del Libro',
      type: 'Librería',
      offer: 'Envío gratis en compras',
      address: 'Calle 85 #13-05, Bogotá',
      icon: 'bookstore',
      color: '#6A1B9A'
    },
    {
      id: 11,
      name: 'Starbucks Reserve',
      type: 'Cafetería',
      offer: '15% para miembros TFT',
      address: 'Zona T, Bogotá',
      icon: 'cafe',
      color: '#00695C'
    },
    {
      id: 12,
      name: 'Cinemateca Distrital',
      type: 'Cine Cultural',
      offer: 'Proyecciones especiales',
      address: 'Carrera 7 #22-79, Bogotá',
      icon: 'theater',
      color: '#E65100'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <Box sx={{ mb: 8 }}>
      {/* Header con diseño premium */}
      <Box sx={{
        textAlign: 'center',
        mb: 6,
        position: 'relative'
      }}>
        <Box
          sx={{
            display: 'inline-block',
            px: 3,
            py: 1,
            bgcolor: alpha(theme.palette.warning.main, 0.1),
            borderRadius: 20,
            mb: 2
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'warning.main',
              fontWeight: 700,
              letterSpacing: 1.5
            }}
          >
            🤝 BENEFICIOS EXCLUSIVOS
          </Typography>
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Nuestros Aliados
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.1rem' }
          }}
        >
          Presenta tu perfil TFT Club y disfruta descuentos en los mejores espacios culturales de la ciudad
        </Typography>
      </Box>

      {/* Grid de aliados */}
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {allies.map((ally) => {
            const IconComponent = iconMap[ally.icon];
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={ally.id}
                component={motion.div}
                variants={itemVariants}
              >
                <Card
                  component={motion.div}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    background: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid',
                    borderColor: 'transparent',
                    '&:hover': {
                      boxShadow: `0 12px 40px ${alpha(ally.color, 0.3)}`,
                      borderColor: alpha(ally.color, 0.5),
                      '& .ally-icon': {
                        transform: 'rotate(10deg) scale(1.1)',
                      },
                      '& .arrow-icon': {
                        transform: 'translateX(4px)',
                      }
                    }
                  }}
                >
                  {/* Barra de color superior */}
                  <Box
                    sx={{
                      height: 6,
                      background: `linear-gradient(90deg, ${ally.color} 0%, ${alpha(ally.color, 0.6)} 100%)`
                    }}
                  />

                  <CardContent sx={{ p: 3 }}>
                    {/* Icono y Tipo */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2
                    }}>
                      <Box
                        className="ally-icon"
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          background: alpha(ally.color, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <IconComponent
                          sx={{
                            fontSize: 32,
                            color: ally.color
                          }}
                        />
                      </Box>

                      <Chip
                        label={ally.type}
                        size="small"
                        sx={{
                          bgcolor: alpha(ally.color, 0.1),
                          color: ally.color,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          height: 24,
                          border: `1px solid ${alpha(ally.color, 0.2)}`
                        }}
                      />
                    </Box>

                    {/* Nombre */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                        minHeight: '2.6em',
                        color: 'text.primary'
                      }}
                    >
                      {ally.name}
                    </Typography>

                    {/* Oferta */}
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: alpha(ally.color, 0.08),
                        mb: 2,
                        borderLeft: 4,
                        borderColor: ally.color
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: ally.color,
                          fontSize: '0.9rem'
                        }}
                      >
                        🎁 {ally.offer}
                      </Typography>
                    </Box>

                    {/* Dirección */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                        mb: 2
                      }}
                    >
                      <Place
                        sx={{
                          fontSize: 18,
                          color: 'text.secondary',
                          mt: 0.3,
                          flexShrink: 0
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.8rem',
                          lineHeight: 1.4
                        }}
                      >
                        {ally.address}
                      </Typography>
                    </Box>

                    {/* Botón Ver ubicación */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: ally.color,
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}
                      >
                        Ver ubicación
                      </Typography>
                      <IconButton
                        size="small"
                        className="arrow-icon"
                        sx={{
                          color: ally.color,
                          bgcolor: alpha(ally.color, 0.1),
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            bgcolor: alpha(ally.color, 0.2)
                          }
                        }}
                      >
                        <ArrowForward fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* CTA para ser aliado */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
            zIndex: 0
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            ¿Quieres ser aliado del club?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
            Únete a nuestra red de espacios culturales y llega a miles de lectores apasionados
          </Typography>
          <Box
            component="button"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              bgcolor: 'white',
              color: '#764ba2',
              border: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 30px rgba(0,0,0,0.3)'
              }
            }}
          >
            Contáctanos
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AlliesSection;
