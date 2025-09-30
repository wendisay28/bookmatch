import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Home as HomeIcon,
  TrendingUp as TrendingUpIcon,
  AutoAwesome as MagicIcon,
  MenuBook as MenuBookIcon,
  ScienceOutlined as ScienceIcon,
  AutoStories as FantasyIcon,
  FavoriteBorder as RomanceIcon,
  HistoryEdu as HistoryIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  Help as HelpIcon,
  Groups as GroupsIcon,
  KeyboardDoubleArrowLeft as CollapseIcon,
} from '@mui/icons-material';

interface LeftSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenAI: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ collapsed, onToggleCollapse, onOpenAI }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: collapsed ? '70px' : '20%',
        position: 'fixed',
        top: 64,
        left: 0,
        bottom: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        p: 2,
        transition: 'width 0.3s ease',
      }}
    >
      {/* Toggle Button */}
      <Box sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', mb: 2 }}>
        <IconButton
          onClick={onToggleCollapse}
          size="small"
          sx={{
            transition: 'transform 0.3s ease',
            transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <CollapseIcon />
        </IconButton>
      </Box>

      <List>
        <ListItemButton onClick={() => navigate('/')} sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <HomeIcon color="primary" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Inicio" primaryTypographyProps={{ fontWeight: 600 }} />}
        </ListItemButton>
        <ListItemButton sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <TrendingUpIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Popular" />}
        </ListItemButton>
        <ListItemButton
          onClick={onOpenAI}
          sx={{
            justifyContent: collapsed ? 'center' : 'flex-start',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <MagicIcon sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          {!collapsed && (
            <ListItemText
              primary="IA Mágica"
              secondary="Recomendaciones"
              primaryTypographyProps={{ fontWeight: 700 }}
              secondaryTypographyProps={{ fontSize: '0.7rem' }}
            />
          )}
        </ListItemButton>
      </List>

      <Divider sx={{ my: 2 }} />

      {!collapsed && (
        <Typography variant="caption" color="text.secondary" sx={{ px: 2, fontWeight: 700 }}>
          CATEGORÍAS
        </Typography>
      )}
      <List dense>
        <ListItemButton sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <MenuBookIcon fontSize="small" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Ficción" />}
        </ListItemButton>
        <ListItemButton sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <MenuBookIcon fontSize="small" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="No ficción" />}
        </ListItemButton>
        <ListItemButton sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <ScienceIcon fontSize="small" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Ciencia" />}
        </ListItemButton>
        <ListItemButton sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <FantasyIcon fontSize="small" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Fantasía" />}
        </ListItemButton>
        <ListItemButton sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <RomanceIcon fontSize="small" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Romance" />}
        </ListItemButton>
        <ListItemButton sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Historia" />}
        </ListItemButton>
        <ListItemButton sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <ExpandMoreIcon fontSize="small" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Ver más" />}
        </ListItemButton>
      </List>

      <Divider sx={{ my: 2 }} />

      {!collapsed && (
        <Typography variant="caption" color="text.secondary" sx={{ px: 2, fontWeight: 700 }}>
          RECURSOS
        </Typography>
      )}
      <List dense>
        <ListItemButton sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Sobre Bookmatch" />}
        </ListItemButton>
        <ListItemButton sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Ayuda" />}
        </ListItemButton>
        <ListItemButton sx={{ justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
            <GroupsIcon fontSize="small" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Comunidad" />}
        </ListItemButton>
      </List>
    </Box>
  );
};

export default LeftSidebar;
