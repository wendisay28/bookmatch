import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { Badge, AVAILABLE_BADGES } from '../../services/badgeService';

interface BadgesTabProps {
  badges: Badge[];
}

const rarityStyles: Record<string, { bg: string; color: string; border: string; textColor: string; label: string; iconColor: string }> = {
  common: { bg: '#ffffff', color: '#9CA3AF', border: '#E5E7EB', textColor: '#333333', label: 'Común', iconColor: '#9CA3AF' },
  uncommon: { bg: '#ffffff', color: '#10B981', border: '#10B981', textColor: '#333333', label: 'Poco Común', iconColor: '#10B981' },
  rare: { bg: '#ffffff', color: '#3B82F6', border: '#3B82F6', textColor: '#333333', label: 'Rara', iconColor: '#3B82F6' },
  epic: { bg: '#ffffff', color: '#8B5CF6', border: '#8B5CF6', textColor: '#333333', label: 'Épica', iconColor: '#8B5CF6' },
  legendary: { bg: '#ffffff', color: '#F59E0B', border: '#F59E0B', textColor: '#333333', label: 'Legendaria', iconColor: '#F59E0B' }
};

export const BadgesTab = ({ badges }: BadgesTabProps) => {
  // Crear un mapa de insignias ganadas por ID
  const earnedBadgesMap = new Map(badges.map(b => [b.id, b]));

  // Mostrar TODAS las insignias disponibles, marcando cuáles están desbloqueadas
  const allBadges = AVAILABLE_BADGES.map(availableBadge => {
    const earnedBadge = earnedBadgesMap.get(availableBadge.id);
    return {
      ...availableBadge,
      isEarned: !!earnedBadge,
      earnedAt: earnedBadge?.earnedAt
    };
  });

  return (
    <Grid container spacing={2}>
      {allBadges.map((badge) => {
        const style = rarityStyles[badge.rarity] || rarityStyles.common;
        const isLocked = !badge.isEarned;

        return (
          <Grid item xs={12} sm={6} key={badge.id}>
            <Card
              variant="outlined"
              sx={{
                background: isLocked ? '#F9FAFB' : style.bg,
                borderColor: isLocked ? '#E5E7EB' : style.border,
                borderWidth: 1,
                opacity: isLocked ? 0.6 : 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: isLocked ? '#D1D5DB' : style.border,
                  opacity: isLocked ? 0.8 : 1,
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 36,
                    }}
                  >
                    {isLocked ? (
                      <LockIcon sx={{ fontSize: 36, color: '#9CA3AF' }} />
                    ) : (
                      <span style={{ fontSize: 36 }}>{badge.icon}</span>
                    )}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        color: isLocked ? '#6B7280' : style.textColor,
                      }}
                    >
                      {badge.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isLocked ? '#9CA3AF' : 'text.secondary'
                      }}
                    >
                      {badge.description}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={style.label}
                    size="small"
                    sx={{
                      fontWeight: 'bold',
                      bgcolor: isLocked ? '#F3F4F6' : '#ffffff',
                      color: isLocked ? '#9CA3AF' : style.color,
                      border: `1px solid ${isLocked ? '#E5E7EB' : style.color}`,
                    }}
                  />
                  {isLocked && (
                    <Chip
                      label="Bloqueada"
                      size="small"
                      icon={<LockIcon sx={{ fontSize: 16 }} />}
                      sx={{
                        fontWeight: 'bold',
                        bgcolor: '#F3F4F6',
                        color: '#6B7280',
                        border: '1px solid #E5E7EB',
                      }}
                    />
                  )}
                  {!isLocked && badge.earnedAt && (
                    <Chip
                      label={`Desbloqueada: ${new Date(badge.earnedAt).toLocaleDateString('es-ES')}`}
                      size="small"
                      sx={{
                        fontWeight: 'bold',
                        bgcolor: '#F0FDF4',
                        color: '#16A34A',
                        border: '1px solid #86EFAC',
                      }}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
