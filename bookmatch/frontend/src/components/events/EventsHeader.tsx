import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingIcon,
  Upcoming as UpcomingIcon,
  EventAvailable as MyEventsIcon,
} from '@mui/icons-material';

interface EventsHeaderProps {
  currentTab: number;
  searchQuery: string;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventsHeader: React.FC<EventsHeaderProps> = ({
  currentTab,
  searchQuery,
  onTabChange,
  onSearchChange,
}) => {
  return (
    <Box sx={{ mb: 1.5 }}>
      {/* Title */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: '#1A1A1A',
          }}
        >
          Eventos
        </Typography>
      </Box>

      {/* Tabs */}
      <Tabs
        value={currentTab}
        onChange={onTabChange}
        sx={{
          mb: 1,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            minHeight: 48,
            color: '#6B7280',
            '&.Mui-selected': {
              color: '#2e6ff2',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#2e6ff2',
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
        }}
      >
        <Tab icon={<TrendingIcon />} iconPosition="start" label="Destacados" />
        <Tab icon={<UpcomingIcon />} iconPosition="start" label="Próximos" />
        <Tab icon={<MyEventsIcon />} iconPosition="start" label="Mis Eventos" />
      </Tabs>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Buscar eventos por nombre, ubicación o categoría..."
        value={searchQuery}
        onChange={onSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#9CA3AF' }} />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 2,
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            '& fieldset': { border: 'none' },
            '&:hover': {
              borderColor: '#2e6ff2',
            },
            '&.Mui-focused': {
              borderColor: '#2e6ff2',
              boxShadow: '0 0 0 3px rgba(46, 111, 242, 0.1)',
            },
          },
        }}
      />
    </Box>
  );
};

export default EventsHeader;
