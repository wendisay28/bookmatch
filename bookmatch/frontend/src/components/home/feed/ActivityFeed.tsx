import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import {
  SwapHoriz as ExchangeIcon,
  Add as AddIcon,
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ChatBubbleOutline as CommentIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export type ActivityType = 'exchange' | 'new_book' | 'review' | 'achievement' | 'request';

export interface Activity {
  id: number;
  type: ActivityType;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;

  // For exchanges
  exchangeWith?: {
    name: string;
    avatar: string;
    username: string;
  };
  book?: {
    title: string;
    author: string;
    cover: string;
  };

  // For reviews
  rating?: number;
  reviewText?: string;

  // For achievements
  achievement?: {
    title: string;
    icon: string;
    description: string;
  };

  // For requests
  requestBook?: {
    title: string;
    author: string;
  };
}

interface ActivityFeedProps {
  activities: Activity[];
  onLike?: (activityId: number) => void;
  onBookmark?: (activityId: number) => void;
  onComment?: (activityId: number) => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  onLike,
  onBookmark,
  onComment
}) => {
  const navigate = useNavigate();

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'exchange': return <ExchangeIcon sx={{ color: 'primary.main' }} />;
      case 'new_book': return <AddIcon sx={{ color: 'success.main' }} />;
      case 'review': return <StarIcon sx={{ color: 'warning.main' }} />;
      case 'achievement': return <TrophyIcon sx={{ color: '#FFD700' }} />;
      case 'request': return <StarIcon sx={{ color: 'info.main' }} />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'exchange':
        return `intercambió con ${activity.exchangeWith?.name}`;
      case 'new_book':
        return 'agregó un nuevo libro';
      case 'review':
        return `calificó`;
      case 'achievement':
        return `alcanzó un logro`;
      case 'request':
        return 'busca';
    }
  };

  return (
    <Box>
      {activities.map((activity) => (
        <Card key={activity.id} sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}>
          {/* Header */}
          <CardContent sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
              <Avatar
                src={activity.user.avatar}
                sx={{ width: 48, height: 48, cursor: 'pointer' }}
                onClick={() => navigate(`/profile/${activity.user.username}`)}
              />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  {getActivityIcon(activity.type)}
                  <Typography variant="body1">
                    <Typography
                      component="span"
                      sx={{ fontWeight: 600, cursor: 'pointer' }}
                      onClick={() => navigate(`/profile/${activity.user.username}`)}
                    >
                      {activity.user.name}
                    </Typography>
                    {' '}
                    <Typography component="span" color="text.secondary">
                      {getActivityText(activity)}
                    </Typography>
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {activity.timestamp}
                </Typography>
              </Box>
            </Box>

            {/* Content based on activity type */}
            <Box sx={{ mt: 2, ml: 7 }}>
              {activity.type === 'exchange' && activity.book && activity.exchangeWith && (
                <Box sx={{
                  p: 2,
                  bgcolor: 'action.hover',
                  borderRadius: 2,
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center'
                }}>
                  <Box
                    component="img"
                    src={activity.book.cover}
                    sx={{ width: 60, height: 90, borderRadius: 1, boxShadow: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {activity.book.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.book.author}
                    </Typography>
                  </Box>
                  <Avatar
                    src={activity.exchangeWith.avatar}
                    sx={{ width: 36, height: 36 }}
                  />
                </Box>
              )}

              {activity.type === 'new_book' && activity.book && (
                <Box sx={{
                  p: 2,
                  bgcolor: 'success.light',
                  borderRadius: 2,
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center'
                }}>
                  <Box
                    component="img"
                    src={activity.book.cover}
                    sx={{ width: 60, height: 90, borderRadius: 1, boxShadow: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {activity.book.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.book.author}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label="Disponible"
                        size="small"
                        color="success"
                        sx={{ mr: 1 }}
                      />
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    Solicitar
                  </Button>
                </Box>
              )}

              {activity.type === 'review' && activity.book && (
                <Box sx={{
                  p: 2,
                  bgcolor: 'warning.light',
                  borderRadius: 2,
                }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Box
                      component="img"
                      src={activity.book.cover}
                      sx={{ width: 60, height: 90, borderRadius: 1, boxShadow: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {activity.book.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {activity.book.author}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            sx={{
                              fontSize: '1rem',
                              color: i < (activity.rating || 0) ? 'warning.main' : 'action.disabled'
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  {activity.reviewText && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: 'italic',
                        borderLeft: 3,
                        borderColor: 'warning.main',
                        pl: 2,
                        mt: 1
                      }}
                    >
                      "{activity.reviewText}"
                    </Typography>
                  )}
                </Box>
              )}

              {activity.type === 'achievement' && activity.achievement && (
                <Box sx={{
                  p: 2,
                  bgcolor: '#FFF9E6',
                  borderRadius: 2,
                  textAlign: 'center'
                }}>
                  <Typography variant="h1" sx={{ fontSize: '3rem' }}>
                    {activity.achievement.icon}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#FFD700' }}>
                    {activity.achievement.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.achievement.description}
                  </Typography>
                </Box>
              )}

              {activity.type === 'request' && activity.requestBook && (
                <Box sx={{
                  p: 2,
                  bgcolor: 'info.light',
                  borderRadius: 2,
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {activity.requestBook.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    por {activity.requestBook.author}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1, textTransform: 'none' }}
                  >
                    Ofrecer mi copia
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>

          <Divider />

          {/* Actions */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1,
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                size="small"
                startIcon={activity.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={() => onLike?.(activity.id)}
                sx={{
                  textTransform: 'none',
                  color: activity.isLiked ? 'error.main' : 'text.secondary'
                }}
              >
                {activity.likes}
              </Button>
              <Button
                size="small"
                startIcon={<CommentIcon />}
                onClick={() => onComment?.(activity.id)}
                sx={{ textTransform: 'none', color: 'text.secondary' }}
              >
                {activity.comments}
              </Button>
            </Box>
            <IconButton
              size="small"
              onClick={() => onBookmark?.(activity.id)}
              sx={{ color: activity.isBookmarked ? 'primary.main' : 'text.secondary' }}
            >
              {activity.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default ActivityFeed;
