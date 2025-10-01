import { Box } from '@mui/material';

interface ProfileCoverProps {
  coverUrl: string;
}

export const ProfileCover = ({ coverUrl }: ProfileCoverProps) => (
  <Box
    sx={{
      height: { xs: 200, md: 280 },
      backgroundImage: `url(${coverUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
      }
    }}
  />
);
