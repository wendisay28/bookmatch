import { Avatar, Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { MenuBook as BookIcon } from '@mui/icons-material';

interface LibraryBookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    code: string;
    currentHolder: string;
    holderPhoto: string;
  };
  onRequest: (bookId: number) => void;
}

export const LibraryBookCard = ({ book, onRequest }: LibraryBookCardProps) => (
  <Card
    elevation={2}
    sx={{
      borderLeft: 4,
      borderColor: 'primary.main',
      transition: 'all 0.2s',
      '&:hover': {
        boxShadow: 6,
        transform: 'translateY(-2px)'
      }
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <BookIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
            {book.author}
          </Typography>
          <Chip
            label={book.code}
            size="small"
            sx={{ mt: 1, fontFamily: 'monospace', fontWeight: 'bold' }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            src={book.holderPhoto}
            alt={book.currentHolder}
            sx={{ width: 32, height: 32 }}
          />
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              En poder de:
            </Typography>
            <Typography variant="body2" fontWeight="600" color="primary">
              {book.currentHolder}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={() => onRequest(book.id)}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Solicitar
        </Button>
      </Box>
    </CardContent>
  </Card>
);
