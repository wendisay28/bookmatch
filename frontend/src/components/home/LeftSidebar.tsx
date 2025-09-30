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
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        p: 1,
        transition: 'width 0.3s ease',
      }}
    >
      {/* Toggle Button */}
      <Box sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', mb: 1 }}>
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
        <ListItemButton 
          onClick={() => navigate('/')} 
          sx={{ 
            justifyContent: collapsed ? 'center' : 'flex-start',
            '& .MuiSvgIcon-root': { fontSize: '1.25rem' } 
          }}
        >
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 36, mr: collapsed ? 0 : 1 }}>
            <HomeIcon color="primary" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Inicio" primaryTypographyProps={{ fontWeight: 600, fontSize: '0.875rem' }} />}
        </ListItemButton>
        
        <ListItemButton 
          sx={{ 
            justifyContent: collapsed ? 'center' : 'flex-start',
            '& .MuiSvgIcon-root': { fontSize: '1.25rem' } 
          }}
        >
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 36, mr: collapsed ? 0 : 1 }}>
            <TrendingUpIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Popular" primaryTypographyProps={{ fontSize: '0.875rem' }} />}
        </ListItemButton>
        
        <ListItemButton
          onClick={onOpenAI}
          sx={{
            justifyContent: collapsed ? 'center' : 'flex-start',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
            },
            '& .MuiSvgIcon-root': { fontSize: '1.25rem' }
          }}
        >
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 36, mr: collapsed ? 0 : 1 }}>
            <MagicIcon sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          {!collapsed && (
            <ListItemText
              primary="IA Mágica"
              secondary="Recomendaciones"
              primaryTypographyProps={{ fontWeight: 700, fontSize: '0.875rem' }}
              secondaryTypographyProps={{ fontSize: '0.7rem', lineHeight: 1.2 }}
            />
          )}
        </ListItemButton>
      </List>

      <Divider sx={{ my: 1.5 }} />

      {!collapsed && (
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            px: 1, 
            fontWeight: 700, 
            fontSize: '0.7rem', 
            display: 'block', 
            mb: 0.5 
          }}
        >
          CATEGORÍAS
        </Typography>
      )}
      
      <List dense>
        {[
          { icon: <MenuBookIcon fontSize="small" />, text: 'Ficción' },
          { icon: <MenuBookIcon fontSize="small" />, text: 'No ficción' },
          { icon: <ScienceIcon fontSize="small" />, text: 'Ciencia' },
          { icon: <FantasyIcon fontSize="small" />, text: 'Fantasía' },
          { icon: <RomanceIcon fontSize="small" />, text: 'Romance' },
          { icon: <HistoryIcon fontSize="small" />, text: 'Historia' },
          { icon: <ExpandMoreIcon fontSize="small" />, text: 'Ver más' },
        ].map((item, index) => (
          <ListItemButton 
            key={index}
            sx={{ 
              justifyContent: collapsed ? 'center' : 'flex-start',
              '& .MuiSvgIcon-root': { fontSize: '1.25rem' } 
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 36, mr: collapsed ? 0 : 1 }}>
              {item.icon}
            </ListItemIcon>
            {!collapsed && (
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontSize: '0.8125rem' }} 
              />
            )}
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 1.5 }} />

      {!collapsed && (
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            px: 1, 
            fontWeight: 700, 
            fontSize: '0.7rem', 
            display: 'block', 
            mb: 0.5 
          }}
        >
          RECURSOS
        </Typography>
      )}
      
      <List dense>
        {[
          { icon: <InfoIcon fontSize="small" />, text: 'Sobre Bookmatch' },
          { icon: <HelpIcon fontSize="small" />, text: 'Ayuda' },
          { icon: <GroupsIcon fontSize="small" />, text: 'Comunidad' },
        ].map((item, index) => (
          <ListItemButton 
            key={index}
            sx={{ 
              justifyContent: collapsed ? 'center' : 'flex-start',
              '& .MuiSvgIcon-root': { fontSize: '1.25rem' } 
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 36, mr: collapsed ? 0 : 1 }}>
              {item.icon}
            </ListItemIcon>
            {!collapsed && (
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontSize: '0.8125rem' }} 
              />
            )}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default LeftSidebar;
