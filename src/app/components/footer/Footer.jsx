'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CgCopyright } from "react-icons/cg";
import { Box, Typography, Container, Link as MuiLink, Divider, useTheme, useMediaQuery, Stack, styled } from '@mui/material';
import SocialIcons from './SocialIcons';

const GradientFooter = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(0, 170, 204, 0.95) 0%, rgba(17, 17, 102, 0.95) 100%)',
  position: 'relative',
  overflow: 'hidden',
  color: 'white',
  fontFamily: 'Poppins, sans-serif',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/images/pattern.png")',
    opacity: 0.1,
    zIndex: 1,
  }
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

const quickLinks = [
  { text: 'About Us', href: '/' },
  { text: 'Contact Us', href: '/' },
  { text: 'Privacy Policy', href: '/' },
  { text: 'Terms Of Service', href: '/' }
];

export default function Footer() {
  const year = new Date();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <GradientFooter component="footer">
      <ContentWrapper sx={{ 
        pt: { xs: 8, md: 10 }, 
        pb: { xs: 6, md: 8 },
        minHeight: { xs: '500px', md: '300px' }
      }}>
        <Container maxWidth="lg">
          <Stack 
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 6, md: 8 }}
            justifyContent="space-between"
            alignItems={{ xs: 'center', md: 'flex-start' }}
            sx={{ mb: { xs: 6, md: 8 } }}
          >
            {/* Logo Section */}
            <Box 
              sx={{ 
                width: { xs: '200px', sm: '240px' },
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              <Image 
                src='/Logo/HOR.LOGO-BLUE.png' 
                width={240} 
                height={240} 
                alt='MacRonics'
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)' // Make logo white
                }}
              />
            </Box>

            {/* Quick Links Section */}
            <Stack 
              spacing={3}
              alignItems={{ xs: 'center', md: 'flex-start' }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Quick Links
              </Typography>
              <Stack 
                spacing={2}
                alignItems={{ xs: 'center', md: 'flex-start' }}
              >
                {quickLinks.map((link) => (
                  <MuiLink
                    key={link.text}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Poppins, sans-serif',
                      '&:hover': { 
                        color: '#fc1',
                        transform: 'translateX(5px)'
                      },
                    }}
                  >
                    {link.text}
                  </MuiLink>
                ))}
              </Stack>
            </Stack>

            {/* Social Media Section */}
            <Stack 
              spacing={3}
              alignItems={{ xs: 'center', md: 'flex-start' }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Connect With Us
              </Typography>
              <Box>
                <SocialIcons />
              </Box>
            </Stack>

            {/* Partners Section */}
            <Stack 
              spacing={3}
              alignItems={{ xs: 'center', md: 'flex-start' }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Partners and Delivery Agents
              </Typography>
              <Stack 
                direction="row"
                spacing={4}
                flexWrap="wrap"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                alignItems="center"
              >
                <Image 
                  src='/Logo/LOGOMARK BLUE.png' 
                  width={30} 
                  height={30} 
                  alt='partner'
                  style={{ 
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)'
                  }}
                />
                <Image 
                  src='/Logo/LOGOMARK BLUE.png' 
                  width={30} 
                  height={30} 
                  alt='partner'
                  style={{ 
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)'
                  }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={{ my: { xs: 5, md: 6 }, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

          {/* Copyright Section */}
          <Stack 
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontFamily: 'Poppins, sans-serif',
              py: 2
            }}
          >
            <CgCopyright size={18} />
            <Typography sx={{ 
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}>
              {year.getFullYear()} MacRonics. All rights reserved.
            </Typography>
          </Stack>
        </Container>
      </ContentWrapper>
    </GradientFooter>
  );
}