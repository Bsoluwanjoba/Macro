'use client'
import React from 'react';
import { Box, Container, Typography, Button, Stack, styled, useTheme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { IoRocketOutline } from 'react-icons/io5';
import Link from 'next/link';

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(0, 170, 204, 0.95) 0%, rgba(17, 17, 102, 0.95) 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/images/pattern.png")', // You'll need to add this pattern image
    opacity: 0.1,
    zIndex: 1,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fc1',
  color: '#116',
  padding: '12px 32px',
  borderRadius: '50px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#116',
    color: '#fc1',
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
}));

const HighlightText = styled('span')({
  color: '#fc1',
  fontWeight: 700,
});

export default function Advertisement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <GradientBox>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack 
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ 
            py: { xs: 6, md: 10 },
            px: { xs: 2, sm: 4, md: 6 }
          }}
        >
          {/* Left Content */}
          <Stack 
            spacing={3} 
            sx={{ 
              maxWidth: { xs: '100%', md: '50%' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2,
              }}
            >
              Experience the Future of <HighlightText>Technology</HighlightText>
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Discover our latest collection of cutting-edge electronics and smart devices. 
              Up to <HighlightText>50% off</HighlightText> on selected items.
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <StyledButton 
                component={Link}
                href="/products"
                startIcon={<IoRocketOutline size={20} />}
              >
                Shop Now
              </StyledButton>
            </Box>
          </Stack>

          {/* Right Content - Image */}
          <Box 
            sx={{ 
              position: 'relative',
              width: { xs: '100%', sm: '80%', md: '45%' },
              height: { xs: '300px', sm: '400px', md: '500px' },
            }}
          >
            <Image
              src="/images/electronics-collection.png" // You'll need to add this image
              alt="Latest Electronics Collection"
              fill
              style={{ 
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))'
              }}
            />
          </Box>
        </Stack>

        {/* Features */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 4 }}
          justifyContent="center"
          alignItems="center"
          sx={{ 
            pb: { xs: 4, md: 6 },
            textAlign: 'center'
          }}
        >
          {['Free Shipping', 'Money Back Guarantee', '24/7 Support'].map((feature) => (
            <Typography 
              key={feature}
              sx={{ 
                color: 'white',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                opacity: 0.9,
                '&::before': {
                  content: '"•"',
                  marginRight: '8px',
                  color: '#fc1',
                }
              }}
            >
              {feature}
            </Typography>
          ))}
        </Stack>
      </Container>
    </GradientBox>
  );
}
