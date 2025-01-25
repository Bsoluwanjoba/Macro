'use client'
import { Box, Typography, Paper, Container } from '@mui/material'
import { BsRocketTakeoff } from 'react-icons/bs'

export default function ComingSoon() {
  return (
    <Container maxWidth="md" sx={{ height: '100%', py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 170, 204, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <BsRocketTakeoff
            size={80}
            style={{
              color: '#0ac',
              filter: 'drop-shadow(0 4px 6px rgba(0, 170, 204, 0.2))',
            }}
          />
          
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #0ac, #09b)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              mb: 2,
            }}
          >
            Coming Soon
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#555',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            Were working hard to bring you an amazing new feature. 
            Stay tuned for updates as we prepare to launch something special!
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
