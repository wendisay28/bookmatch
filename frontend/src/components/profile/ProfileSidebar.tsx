import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  MenuBook as BookIcon,
  EmojiEvents as TrophyIcon,
  AutoStories as AutoStoriesIcon
} from '@mui/icons-material';

interface ProfileSidebarProps {
  userData: {
    name: string;
    userId: string;
    memberSince: string;
    photoUrl: string;
    readerLevel: number;
    levelProgressPercent: number;
    booksLinked: number;
    totalExchanges: number;
    eventsAttended: number;
  };
}

export const ProfileSidebar = ({ userData }: ProfileSidebarProps) => (
  <>
    <Card elevation={3}>
      <CardContent sx={{ textAlign: 'center', pt: 4 }}>
        <Avatar
          src={userData.photoUrl}
          sx={{ width: 150, height: 150, mx: 'auto', mb: 2, border: '4px solid white', boxShadow: 3 }}
        />
        <Typography variant="h4" gutterBottom fontWeight="bold">
          {userData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Miembro desde {userData.memberSince} • ID: {userData.userId}
        </Typography>
        <Box sx={{ my: 2 }}>
          <Chip
            icon={<TrophyIcon />}
            label={`Nivel ${userData.readerLevel}`}
            color="primary"
            sx={{ fontWeight: 'bold', fontSize: '1rem', py: 2.5 }}
          />
        </Box>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          fullWidth
          sx={{ mt: 2 }}
        >
          Editar Perfil
        </Button>
      </CardContent>
    </Card>

    <Card sx={{ mt: 3 }} elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Estadísticas
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              <BookIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 0.5 }} />
              Libros Vinculados
            </Typography>
            <Typography variant="body1" fontWeight="bold">{userData.booksLinked}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              <AutoStoriesIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 0.5 }} />
              Intercambios
            </Typography>
            <Typography variant="body1" fontWeight="bold">{userData.totalExchanges}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              <TrophyIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 0.5 }} />
              Eventos Asistidos
            </Typography>
            <Typography variant="body1" fontWeight="bold">{userData.eventsAttended}</Typography>
          </Box>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Progreso al Nivel {userData.readerLevel + 1}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={userData.levelProgressPercent}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {userData.levelProgressPercent}% completado
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </>
);
