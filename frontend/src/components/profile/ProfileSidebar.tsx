import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  MenuBook as BookIcon,
  EmojiEvents as TrophyIcon,
  AutoStories as AutoStoriesIcon,
  CameraAlt as CameraIcon
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

export const ProfileSidebar = ({ userData }: ProfileSidebarProps) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  return (
    <>
      <Card elevation={3}>
        <CardContent sx={{ textAlign: 'center', pt: 4 }}>
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
            <Avatar
              src={userData.photoUrl}
              sx={{ width: 150, height: 150, border: '4px solid white', boxShadow: 3 }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: 'white',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: '#2e6ff2',
                  color: 'white',
                },
                border: '3px solid white',
              }}
              size="small"
              onClick={handleEditProfile}
            >
              <CameraIcon fontSize="small" />
            </IconButton>
          </Box>
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
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                py: 2.5,
                background: 'linear-gradient(135deg, #2e6ff2 0%, #53f682 100%)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 12px rgba(46, 111, 242, 0.3)',
                '& .MuiChip-icon': {
                  color: 'white',
                }
              }}
            />
          </Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleEditProfile}
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
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: 'rgba(46, 111, 242, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #2e6ff2 0%, #53f682 100%)',
                borderRadius: 5,
              }
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {userData.levelProgressPercent}% completado
          </Typography>
        </Box>
        </CardContent>
      </Card>
    </>
  );
};
