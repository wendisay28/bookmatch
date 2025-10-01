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
  badges: Array<{
    id: number;
    name: string;
    icon: string;
    description: string;
    rarity: string;
  }>;
}

export const ProfileMainContent = ({ userData, myBooks, exchangeHistory, badges }: ProfileMainContentProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card elevation={2}>
      <CardContent>
        <Paper sx={{ borderRadius: 2, bgcolor: 'primary.light', p: 2, mb: 3 }}>
          <Typography variant="body1" fontStyle="italic" color="primary.contrastText">
            {userData.quote}
          </Typography>
        </Paper>

        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab icon={<TrendingUpIcon />} label="Desempeño" iconPosition="start" />
          <Tab icon={<BookIcon />} label="Mis Libros" iconPosition="start" />
          <Tab icon={<HistoryIcon />} label="Historial" iconPosition="start" />
          <Tab icon={<StarIcon />} label="Insignias" iconPosition="start" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <PerformanceTab userData={userData} />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <BooksTab books={myBooks} />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <HistoryTab history={exchangeHistory} />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <BadgesTab badges={badges} />
        </TabPanel>
      </CardContent>
    </Card>
  );
};
