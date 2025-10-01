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
  Close as CloseIcon,
} from '@mui/icons-material';

interface LeftSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenAI: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ collapsed, onToggleCollapse, onOpenAI, isMobile = false, onClose }) => {
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
        p: isMobile ? 2 : 1,
        pt: isMobile ? 10 : 1,
        transition: 'width 0.3s ease',
      }}
    >
      {/* Toggle Button - Desktop: collapse, Mobile: close */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, mt: isMobile ? -4 : 0 }}>
        <IconButton
          onClick={isMobile ? onClose : onToggleCollapse}
          size={isMobile ? "medium" : "small"}
          sx={{
            transition: 'transform 0.3s ease',
            transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            bgcolor: isMobile ? 'rgba(0,0,0,0.05)' : 'transparent',
            '&:hover': {
              bgcolor: isMobile ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.04)',
            }
          }}
        >
          {isMobile ? <CloseIcon /> : <CollapseIcon />}
        </IconButton>
      </Box>

      <List sx={{ py: 0 }}>
        <ListItemButton
          sx={{
            justifyContent: collapsed ? 'center' : 'flex-start',
            '& .MuiSvgIcon-root': { fontSize: isMobile ? '1.5rem' : '1.25rem' },
            py: isMobile ? 1.5 : (collapsed ? 1.5 : 1),
          }}
        >
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : (isMobile ? 40 : 36), mr: collapsed ? 0 : (isMobile ? 1.5 : 1) }}>
            <TrendingUpIcon color="primary" />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Popular" primaryTypographyProps={{ fontWeight: 600, fontSize: isMobile ? '1rem' : '0.875rem' }} />}
        </ListItemButton>

        <ListItemButton
          sx={{
            justifyContent: collapsed ? 'center' : 'flex-start',
            '& .MuiSvgIcon-root': { fontSize: isMobile ? '1.5rem' : '1.25rem' },
            py: isMobile ? 1.5 : (collapsed ? 1.5 : 1),
          }}
        >
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : (isMobile ? 40 : 36), mr: collapsed ? 0 : (isMobile ? 1.5 : 1) }}>
            <GroupsIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Comunidad" primaryTypographyProps={{ fontSize: isMobile ? '1rem' : '0.875rem' }} />}
        </ListItemButton>

        <ListItemButton
          onClick={onOpenAI}
          sx={{
            justifyContent: collapsed ? 'center' : 'flex-start',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
            },
            '& .MuiSvgIcon-root': { fontSize: isMobile ? '1.5rem' : '1.25rem' },
            py: isMobile ? 1.5 : (collapsed ? 1.5 : 1),
            borderRadius: 1,
          }}
        >
          <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : (isMobile ? 40 : 36), mr: collapsed ? 0 : (isMobile ? 1.5 : 1) }}>
            <MagicIcon sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          {!collapsed && (
            <ListItemText
              primary="IA Mágica"
              secondary="Recomendaciones"
              primaryTypographyProps={{ fontWeight: 700, fontSize: isMobile ? '1rem' : '0.875rem' }}
              secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : '0.7rem', lineHeight: 1.2 }}
            />
          )}
        </ListItemButton>
      </List>

      <Divider sx={{ my: isMobile ? 2.5 : 1.5 }} />

      {!collapsed && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            px: isMobile ? 1.5 : 1,
            fontWeight: 700,
            fontSize: isMobile ? '0.75rem' : '0.7rem',
            display: 'block',
            mb: isMobile ? 1 : 0.5
          }}
        >
          CATEGORÍAS
        </Typography>
      )}

      <List dense={!isMobile} sx={{ py: 0 }}>
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
              '& .MuiSvgIcon-root': { fontSize: isMobile ? '1.35rem' : '1.25rem' },
              py: isMobile ? 1.25 : (collapsed ? 1.25 : 0.75),
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : (isMobile ? 40 : 36), mr: collapsed ? 0 : (isMobile ? 1.5 : 1) }}>
              {item.icon}
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : '0.8125rem' }}
              />
            )}
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: isMobile ? 2.5 : 1.5 }} />

      {!collapsed && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            px: isMobile ? 1.5 : 1,
            fontWeight: 700,
            fontSize: isMobile ? '0.75rem' : '0.7rem',
            display: 'block',
            mb: isMobile ? 1 : 0.5
          }}
        >
          RECURSOS
        </Typography>
      )}

      <List dense={!isMobile} sx={{ py: 0 }}>
        {[
          { icon: <InfoIcon fontSize="small" />, text: 'Sobre Bookmatch' },
          { icon: <HelpIcon fontSize="small" />, text: 'Ayuda' },
          { icon: <GroupsIcon fontSize="small" />, text: 'Comunidad' },
        ].map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              '& .MuiSvgIcon-root': { fontSize: isMobile ? '1.35rem' : '1.25rem' },
              py: isMobile ? 1.25 : (collapsed ? 1.25 : 0.75),
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : (isMobile ? 40 : 36), mr: collapsed ? 0 : (isMobile ? 1.5 : 1) }}>
              {item.icon}
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: isMobile ? '0.95rem' : '0.8125rem' }}
              />
            )}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default LeftSidebar;
