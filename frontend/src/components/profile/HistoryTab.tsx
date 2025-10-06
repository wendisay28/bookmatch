import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { AutoStories, CalendarToday } from '@mui/icons-material';

interface ExchangeHistory {
  id: number;
  title: string;
  type: string;
  date: string;
  status: string;
}

interface HistoryTabProps {
  history: ExchangeHistory[];
}

export const HistoryTab = ({ history }: HistoryTabProps) => (
  <Stack spacing={2}>
    {history.map((item) => (
      <Card
        key={item.id}
        variant="outlined"
        sx={{
          borderColor: '#e0e0e0',
          cursor: 'pointer',
          transition: 'none !important',
          '&:hover': {
            borderColor: '#2e6ff2',
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#333333' }}>
                {item.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AutoStories sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {item.type}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {item.date}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Chip
              label={item.status}
              size="small"
              sx={{
                fontWeight: 'bold',
                ...(item.status === 'Completado' ? {
                  bgcolor: '#f5f5f5',
                  color: '#2ee165',
                  border: '1px solid #2ee165',
                } : {
                  bgcolor: '#f5f5f5',
                  color: '#2e6ff2',
                  border: '1px solid #2e6ff2',
                })
              }}
            />
          </Box>
        </CardContent>
      </Card>
    ))}
  </Stack>
);
