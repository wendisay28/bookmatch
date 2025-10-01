import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';

interface Badge {
  id: number;
  name: string;
  icon: string;
  description: string;
  rarity: string;
}

interface BadgesTabProps {
  badges: Badge[];
}

const rarityColors: Record<string, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
  uncommon: "success",
  rare: "info",
  epic: "secondary",
  legendary: "warning"
};

export const BadgesTab = ({ badges }: BadgesTabProps) => (
  <Grid container spacing={2}>
    {badges.map((badge) => (
      <Grid item xs={12} sm={6} key={badge.id}>
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h3" sx={{ mr: 2 }}>{badge.icon}</Typography>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {badge.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {badge.description}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={badge.rarity.toUpperCase()}
              color={rarityColors[badge.rarity]}
              size="small"
            />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);
