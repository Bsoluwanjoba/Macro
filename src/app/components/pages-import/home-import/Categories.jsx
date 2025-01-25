'use client'
import React from 'react';
import { IoMenu } from 'react-icons/io5';
import { LuSmartphone } from 'react-icons/lu';
import { LiaLaptopSolid, LiaTvSolid } from 'react-icons/lia';
import { IoIosTabletPortrait } from 'react-icons/io';
import { MdOutlineWatch, MdOutlineSpeaker } from 'react-icons/md';
import { FaHeadphones } from 'react-icons/fa';
import Link from 'next/link';
import { Box, Paper, Typography, Container, Card, styled, useTheme, useMediaQuery } from '@mui/material';

const CategoryCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  background: 'linear-gradient(135deg, #0ac 0%, #0095b3 100%)',
  border: '2px solid transparent',
  borderRadius: '16px',
  '&:hover': {
    transform: 'translateY(-5px)',
    background: '#fc1',
    borderColor: '#0ac',
    '& .category-icon': {
      color: '#116',
      transform: 'scale(1.1)',
    },
    '& .category-text': {
      color: '#116',
    },
  },
}));

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '12px',
  transition: 'all 0.3s ease',
  color: '#fc1',
});

const CategoryIcons = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const categories = [
    {
      id: "all",
      title: "All Products",
      Icon: IoMenu,
      link: "/category/all",
    },
    {
      id: "smartphones",
      title: "Smartphones",
      Icon: LuSmartphone,
      link: "/category/smartphones",
    },
    {
      id: "laptops",
      title: "Laptops",
      Icon: LiaLaptopSolid,
      link: "/category/laptops",
    },
    {
      id: "tablets",
      title: "Tablets",
      Icon: IoIosTabletPortrait,
      link: "/category/tablets",
    },
    {
      id: "smartwatches",
      title: "Smartwatches",
      Icon: MdOutlineWatch,
      link: "/category/smartwatches",
    },
    {
      id: "bluetooth-speakers",
      title: "Speakers",
      Icon: MdOutlineSpeaker,
      link: "/category/speakers",
    },
    {
      id: "headphones",
      title: "Headphones",
      Icon: FaHeadphones,
      link: "/category/headphones",
    },
    {
      id: "smart-tvs",
      title: "Smart TVs",
      Icon: LiaTvSolid,
      link: "/category/smart-tvs",
    },
  ];

  return (
    <Container maxWidth="1000px" sx={{ py: { xs: 3, md: 9} }}>
      <Paper 
        elevation={0}
        sx={{ 
          bgcolor: 'white',
          borderRadius: 3,
          p: { xs: 2, sm: 3, md: 4 },
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 4,
            fontWeight: 600,
            color: '#116',
            textAlign: 'center',
            letterSpacing: '0.05em',
          }}
        >
          BROWSE CATEGORIES
        </Typography>

        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, sm: 3 },
          }}
        >
          {categories.map(({ id, title, Icon, link }) => (
            <Link 
              key={id} 
              href={link}
              style={{ textDecoration: 'none' }}
            >
              <CategoryCard>
                <IconWrapper className="category-icon">
                  <Icon 
                    size={isMobile ? 24 : 32} 
                    style={{ 
                      transition: 'all 0.3s ease',
                    }} 
                  />
                </IconWrapper>
                <Typography 
                  className="category-text"
                  variant="subtitle2" 
                  sx={{
                    color: '#fc1',
                    fontWeight: 600,
                    textAlign: 'center',
                    letterSpacing: '0.02em',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {title}
                </Typography>
              </CategoryCard>
            </Link>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default CategoryIcons;