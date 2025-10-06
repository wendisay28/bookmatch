import React from 'react';
import { Stack, Chip } from '@mui/material';
import { EVENT_CATEGORIES } from '../../types/events';

interface EventFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
      {EVENT_CATEGORIES.map((category) => (
        <Chip
          key={category}
          label={category}
          onClick={() => onCategoryChange(category)}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            border: '1px solid #E5E7EB',
            transition: 'all 0.2s ease',
            ...(selectedCategory === category
              ? {
                  backgroundColor: '#2e6ff2',
                  color: 'white',
                  borderColor: '#2e6ff2',
                }
              : {
                  backgroundColor: 'white',
                  color: '#6B7280',
                  '&:hover': {
                    backgroundColor: '#F3F4F6',
                    borderColor: '#2e6ff2',
                  },
                }),
          }}
        />
      ))}
    </Stack>
  );
};

export default EventFilters;
