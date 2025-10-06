import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { QrCode, Repeat, Person } from '@mui/icons-material';

interface Book {
  id: number;
  title: string;
  author: string;
  code: string;
  exchanges: number;
  current: string;
}

interface BooksTabProps {
  books: Book[];
}

export const BooksTab = ({ books }: BooksTabProps) => (
  <Stack spacing={2}>
    {books.map((book) => (
      <Card
        key={book.id}
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
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#333333' }}>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {book.author}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              icon={<QrCode sx={{ fontSize: 16, color: '#2e6ff2' }} />}
              label={book.code}
              size="small"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
                bgcolor: '#e8f2ff',
                color: '#2e6ff2',
                border: '1px solid #2e6ff2',
              }}
            />
            <Chip
              icon={<Repeat sx={{ fontSize: 16, color: '#53f682' }} />}
              label={`${book.exchanges} intercambios`}
              size="small"
              sx={{
                fontWeight: 'bold',
                bgcolor: '#e8f9f0',
                color: '#666666',
                border: '1px solid #53f682',
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              Lector actual: <strong>{book.current}</strong>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    ))}
  </Stack>
);
