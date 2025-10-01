import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

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
      <Card key={book.id} variant="outlined">
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {book.author}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip label={book.code} size="small" sx={{ mr: 1 }} />
            <Chip label={`${book.exchanges} intercambios`} size="small" color="primary" sx={{ mr: 1 }} />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Lector actual: {book.current}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </Stack>
);
