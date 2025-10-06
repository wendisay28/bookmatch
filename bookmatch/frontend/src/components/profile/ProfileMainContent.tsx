import React, { useState } from 'react';
import { Box, Card, CardContent, Paper, Tab, Tabs, Typography } from '@mui/material';
import {
  MenuBook as BookIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { PerformanceTab } from './PerformanceTab';
import { BooksTab } from './BooksTab';
import { HistoryTab } from './HistoryTab';
import { BadgesTab } from './BadgesTab';
import { Badge } from '../../services/badgeService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

interface ProfileMainContentProps {
  userData: {
    quote: string;
    readerLevel: number;
    booksLinked: number;
    totalExchanges: number;
    eventsAttended: number;
  };
  myBooks: Array<{
    id: number;
    title: string;
    author: string;
    code: string;
    exchanges: number;
    current: string;
  }>;
  exchangeHistory: Array<{
    id: number;
    title: string;
    type: string;
    date: string;
    status: string;
  }>;
  badges: Badge[];
}

export const ProfileMainContent = ({ userData, myBooks, exchangeHistory, badges }: ProfileMainContentProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card
      elevation={2}
      sx={{
        transition: 'none !important',
        '&:hover': {
          transform: 'none !important',
        },
        '& *': {
          transition: 'none !important',
        },
      }}
    >
      <CardContent>
        <Paper
          sx={{
            borderRadius: 2,
            bgcolor: '#f5f5f5',
            p: 2,
            mb: 2,
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography
            variant="body2"
            fontStyle="italic"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: '0.9rem',
            }}
          >
            "{userData.quote}"
          </Typography>
        </Paper>

        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mb: 2,
            '& .MuiTab-root': {
              minHeight: 48,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
              background: 'linear-gradient(90deg, #2e6ff2 0%, #53f682 100%)',
            }
          }}
        >
          <Tab
            icon={<StarIcon />}
            label={<Box sx={{ display: { xs: 'none', sm: 'block' } }}>Insignias</Box>}
            iconPosition="start"
          />
          <Tab
            icon={<TrendingUpIcon />}
            label={<Box sx={{ display: { xs: 'none', sm: 'block' } }}>Desempeño</Box>}
            iconPosition="start"
          />
          <Tab
            icon={<BookIcon />}
            label={<Box sx={{ display: { xs: 'none', sm: 'block' } }}>Mis Libros</Box>}
            iconPosition="start"
          />
          <Tab
            icon={<HistoryIcon />}
            label={<Box sx={{ display: { xs: 'none', sm: 'block' } }}>Historial</Box>}
            iconPosition="start"
          />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <BadgesTab badges={badges} />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <PerformanceTab userData={userData} />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <BooksTab books={myBooks} />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <HistoryTab history={exchangeHistory} />
        </TabPanel>
      </CardContent>
    </Card>
  );
};
