'use client'
import React from 'react';
import { Box, Container, Paper, Typography, Button, Stack, styled, keyframes } from '@mui/material';
import { FaFire, FaShoppingCart, FaTag, FaShippingFast } from 'react-icons/fa';
import Link from 'next/link';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #fc1 0%, #ffa726 100%)',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(255, 204, 17, 0.15)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, transparent 70%)',
  }
}));

const IconBox = styled(Box)({
  animation: `${pulse} 2s infinite ease-in-out`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#116',
  color: '#fff',
  padding: '10px 24px',
  borderRadius: '50px',
  fontSize: '0.9rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#0ac',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
  },
}));

const Feature = ({ icon: Icon, text }) => (
  <Stack 
    direction="row" 
    spacing={1} 
    alignItems="center"
    sx={{ 
      color: '#116',
      fontSize: '0.9rem',
      fontWeight: 500,
    }}
  >
    <Icon size={16} />
    <Typography variant="body2">{text}</Typography>
  </Stack>
);

const UkUsedBanner = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 3 }}>
      <StyledPaper elevation={0}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 4 }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ 
            p: { xs: 3, sm: 4 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left Content */}
          <Stack 
            direction="row" 
            spacing={3} 
            alignItems="center"
            sx={{
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            <IconBox>
              <FaFire size={40} color="#116" />
            </IconBox>
            
            <Stack spacing={0.5}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#116',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                }}
              >
                UK USED PRODUCTS
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: '#116',
                  opacity: 0.9,
                  maxWidth: '300px',
                }}
              >
                Premium quality at unbeatable prices
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2}
                sx={{ mt: 1 }}
              >
                <Feature icon={FaTag} text="Up to 70% Off" />
                <Feature icon={FaShippingFast} text="Fast Delivery" />
              </Stack>
            </Stack>
          </Stack>

          {/* Right Content */}
          <StyledButton
            component={Link}
            href="/flash-sale"
            startIcon={<FaShoppingCart />}
          >
            Shop Now
          </StyledButton>
        </Stack>
      </StyledPaper>
    </Container>
  );
};

export default UkUsedBanner;