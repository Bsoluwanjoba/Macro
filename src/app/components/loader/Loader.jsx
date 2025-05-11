'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'

const Loader = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, rgba(240,248,255,0.97), rgba(255,255,255,0.9))',
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.5,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '30vw',
            height: '30vw',
            maxWidth: '400px',
            maxHeight: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,170,204,0.1) 0%, rgba(0,170,204,0) 70%)',
            animation: 'float 15s infinite ease-in-out',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '25vw',
            height: '25vw',
            maxWidth: '350px',
            maxHeight: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)',
            animation: 'float 12s infinite ease-in-out reverse',
          },
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translate(0, 0)',
            },
            '50%': {
              transform: 'translate(5%, 5%)',
            },
          },
        }}
      />

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 2, sm: 3 },
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          opacity: mounted ? 1 : 0,
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: 100, sm: 120, md: 150 },
            height: { xs: 100, sm: 120, md: 150 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Logo container with glow effect */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '80%',
                height: '80%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,170,204,0.15) 0%, rgba(0,170,204,0) 70%)',
                animation: 'pulse 2s infinite ease-in-out',
              },
              '@keyframes pulse': {
                '0%, 100%': {
                  transform: 'scale(1)',
                  opacity: 0.5,
                },
                '50%': {
                  transform: 'scale(1.3)',
                  opacity: 0.2,
                },
              },
            }}
          >
            {/* Spinner effect */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '2px solid transparent',
                borderTopColor: 'rgba(0,170,204,0.6)',
                borderLeftColor: 'rgba(0,170,204,0.3)',
                animation: 'spin 1.5s linear infinite',
                '@keyframes spin': {
                  '0%': {
                    transform: 'rotate(0deg)',
                  },
                  '100%': {
                    transform: 'rotate(360deg)',
                  },
                },
              }}
            />
            
            {/* Logo image with bounce animation */}
            <Box
              sx={{
                position: 'relative',
                width: '40%',
                height: '40%',
                animation: 'bounce 2s ease-in-out infinite',
                '@keyframes bounce': {
                  '0%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '50%': {
                    transform: 'translateY(-10%)',
                  },
                },
              }}
            >
              <Image
                src="/Logo/LOGOMARK BLUE.png"
                alt="MacRonics Logo"
                fill
                priority
                sizes="(max-width: 600px) 60px, (max-width: 960px) 72px, 90px"
                style={{
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 6px 12px rgba(0, 170, 204, 0.3))',
                }}
              />
            </Box>
          </Box>
        </Box>
        
        {/* Loading text with fade animation */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            color: 'rgba(0, 0, 0, 0.7)',
            letterSpacing: '0.05em',
            position: 'relative',
            '&::after': {
              content: '"..."',
              position: 'absolute',
              animation: 'ellipsis 1.5s infinite',
              '@keyframes ellipsis': {
                '0%': { content: '"."' },
                '33%': { content: '".."' },
                '66%': { content: '"..."' },
              },
            }
          }}
        >
          Loading
        </Typography>
      </Box>
    </Box>
  )
}

export default Loader