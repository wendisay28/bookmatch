import React from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

interface SectionProps {
  title?: string;
  subtitle?: string;
  emoji?: string;
  badge?: string;
  children: React.ReactNode;
  noPadding?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  emoji,
  badge,
  children,
  noPadding = false
}) => {
  const theme = useTheme();

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      sx={{
        mb: { xs: 6, sm: 8, md: 10 },
        px: noPadding ? 0 : { xs: 0, sm: 0 }
      }}
    >
      {(title || badge) && (
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          {badge && (
            <Box
              sx={{
                display: 'inline-block',
                px: 2.5,
                py: 0.75,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: 20,
                mb: 2
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  fontSize: '0.75rem'
                }}
              >
                {badge}
              </Typography>
            </Box>
          )}

          {title && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                mb: subtitle ? 1.5 : 0,
                background: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}
            >
              {emoji && <span style={{ fontSize: '1.2em' }}>{emoji}</span>}
              {title}
            </Typography>
          )}

          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.95rem', sm: '1rem' },
                maxWidth: 600
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {children}
    </Box>
  );
};

export default Section;
