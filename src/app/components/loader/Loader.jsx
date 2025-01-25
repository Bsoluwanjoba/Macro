'use client'
import Image from 'next/image'
import { Box } from '@mui/material'

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.95), rgba(240,248,255,0.95))',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 150,
          height: 150,
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              transform: 'scale(1)',
              opacity: 1,
            },
            '50%': {
              transform: 'scale(0.92)',
              opacity: 0.8,
            },
          },
        }}
      >
        <Image
          src="/Logo/LOGOMARK BLUE.png"
          alt="MacRonics Logo"
          width={40}
          height={40}
          priority
          style={{
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 6px rgba(0, 170, 204, 0.2))',
          }}
        />
      </Box>
    </Box>
  )
}

export default Loader