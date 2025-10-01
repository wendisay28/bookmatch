import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

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
      <Card key={item.id} variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.type} • {item.date}
              </Typography>
            </Box>
            <Chip
              label={item.status}
              color={item.status === 'Completado' ? 'success' : 'info'}
              size="small"
            />
          </Box>
        </CardContent>
      </Card>
    ))}
  </Stack>
);
