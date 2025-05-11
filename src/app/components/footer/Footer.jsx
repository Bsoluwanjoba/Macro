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

const FooterLink = styled(MuiLink)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  fontFamily: 'Poppins, sans-serif',
  display: 'block',
  '&:hover': { 
    color: '#fc1',
    transform: 'translateX(5px)'
  },
  fontSize: theme.typography.body2.fontSize,
  marginBottom: theme.spacing(1),
}));

const FooterSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.1em',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 40,
    height: 2,
    background: 'rgba(255, 255, 255, 0.5)',
  }
}));

const quickLinks = [
  { text: 'About Us', href: '/' },
  { text: 'Contact Us', href: '/' },
  { text: 'Privacy Policy', href: '/' },
  { text: 'Terms Of Service', href: '/' }
];

const partners = [
  { name: 'Partner 1', logo: '/Logo/LOGOMARK BLUE.png' },
  { name: 'Partner 2', logo: '/Logo/LOGOMARK BLUE.png' },
  { name: 'Partner 3', logo: '/Logo/LOGOMARK BLUE.png' },
];

export default function Footer() {
  const year = new Date();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <GradientFooter component="footer">
      <ContentWrapper sx={{ 
        pt: { xs: 6, md: 8 }, 
        pb: { xs: 4, md: 6 },
      }}>
        <Container maxWidth="lg">
          {/* Main Footer Content */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: { xs: 4, md: 2 },
            mb: 4
          }}>
            {/* Logo and Description */}
            <Box sx={{ 
              width: { xs: '100%', md: '30%' },
              minWidth: { md: '280px' },
              mb: { xs: 2, md: 0 }
            }}>
              <Box sx={{ 
                width: { xs: '180px', sm: '200px' },
                mb: 3,
                mx: { xs: 'auto', md: 0 }
              }}>
                <Image 
                  src='/Logo/HOR.LOGO-BLUE.png' 
                  width={240} 
                  height={240} 
                  alt='MacRonics'
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)'
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: { xs: 'center', md: 'left' },
              }}>
                Your trusted partner for innovative solutions and quality services.
              </Typography>
            </Box>

            {/* Quick Links and Contact */}
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              flex: 1,
              justifyContent: 'space-between',
              gap: { xs: 4, sm: 2 },
              minWidth: { md: '400px' }
            }}>
              {/* Quick Links */}
              <Box sx={{ width: { xs: '100%', sm: '48%', md: 'auto' } }}>
                <FooterSectionTitle variant="h6">
                  Quick Links
                </FooterSectionTitle>
                <Stack spacing={1}>
                  {quickLinks.map((link) => (
                    <FooterLink
                      key={link.text}
                      component={Link}
                      href={link.href}
                    >
                      {link.text}
                    </FooterLink>
                  ))}
                </Stack>
              </Box>

              {/* Contact Info */}
              <Box sx={{ width: { xs: '100%', sm: '48%', md: 'auto' } }}>
                <FooterSectionTitle variant="h6">
                  Contact Us
                </FooterSectionTitle>
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Email: info@macronics.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Phone: +1 (123) 456-7890
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Address: 123 Tech Street, Digital City
                  </Typography>
                </Stack>
              </Box>
            </Box>

            {/* Social & Partners */}
            <Box sx={{ 
              width: { xs: '100%', md: '30%' },
              minWidth: { md: '280px' }
            }}>
              <FooterSectionTitle variant="h6">
                Connect With Us
              </FooterSectionTitle>
              <Box sx={{ mb: 3 }}>
                <SocialIcons />
              </Box>
              
              <FooterSectionTitle variant="h6">
                Our Partners
              </FooterSectionTitle>
              <Stack direction="row" spacing={3} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                {partners.map((partner, index) => (
                  <Box key={index} sx={{ 
                    width: 40, 
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Image 
                      src={partner.logo} 
                      width={30} 
                      height={30} 
                      alt={partner.name}
                      style={{ 
                        objectFit: 'contain',
                        filter: 'brightness(0) invert(1)'
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ 
            my: { xs: 4, md: 5 }, 
            borderColor: 'rgba(255, 255, 255, 0.2)' 
          }} />

          {/* Copyright Section */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
            py: 2
          }}>
            <Stack 
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: 'Poppins, sans-serif',
                mb: { xs: 2, sm: 0 }
              }}
            >
              <CgCopyright size={18} />
              <Typography variant="body2">
                {year.getFullYear()} MacRonics. All rights reserved.
              </Typography>
            </Stack>
            
            <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
              <FooterLink component={Link} href="/privacy">
                Privacy Policy
              </FooterLink>
              <FooterLink component={Link} href="/terms">
                Terms of Service
              </FooterLink>
              <FooterLink component={Link} href="/cookies">
                Cookie Policy
              </FooterLink>
            </Stack>
          </Box>
        </Container>
      </ContentWrapper>
    </GradientFooter>
  );
}