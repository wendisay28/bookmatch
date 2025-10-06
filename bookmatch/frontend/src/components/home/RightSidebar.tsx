import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  SwapHoriz as SwapIcon,
  PersonOutline as PersonIcon,
  EventNote as EventIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

const activeCommunities = [
  { name: 'Club de Fantasía Épica', members: 1245, active: true },
  { name: 'Lectores de Clásicos', members: 987, active: true },
  { name: 'Ciencia Ficción Moderna', members: 856, active: true },
  { name: 'Romance Contemporáneo', members: 734, active: false },
  { name: 'Thriller y Misterio', members: 623, active: true },
];

const topBooks = [
  { rank: 1, title: 'Cien Años de Soledad', author: 'G. García Márquez', exchanges: 156 },
  { rank: 2, title: 'El Principito', author: 'A. de Saint-Exupéry', exchanges: 142 },
  { rank: 3, title: '1984', author: 'George Orwell', exchanges: 138 },
  { rank: 4, title: 'Rayuela', author: 'Julio Cortázar', exchanges: 124 },
  { rank: 5, title: 'El Amor en los Tiempos del Cólera', author: 'G. García Márquez', exchanges: 118 },
];

const RightSidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flex: 1, minWidth: 250 }}>
      {/* Active Communities */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Comunidades Activas
        </Typography>
        <List dense>
          {activeCommunities.map((community, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: community.active ? 'success.main' : 'action.disabled',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={community.name}
                secondary={`${community.members} miembros`}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Stats */}
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Estadísticas
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <SwapIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2" fontWeight={600}>
                Intercambios este mes
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight={800} color="primary.main">
              1,245
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <PersonIcon fontSize="small" sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="body2" fontWeight={600}>
                Usuarios activos
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight={800} color="secondary.main">
              3,892
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <EventIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
              <Typography variant="body2" fontWeight={600}>
                Próximos eventos
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight={800} color="info.main">
              12
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RightSidebar;
