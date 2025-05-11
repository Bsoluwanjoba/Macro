'use client'
import React from 'react';
import { IoMenu } from 'react-icons/io5';
import { LuSmartphone } from 'react-icons/lu';
import { LiaLaptopSolid, LiaTvSolid } from 'react-icons/lia';
import { IoIosTabletPortrait } from 'react-icons/io';
import { MdOutlineWatch, MdOutlineSpeaker, MdOutlineDiamond } from 'react-icons/md';
import { FaHeadphones, FaDesktop, FaTshirt, FaShoePrints } from 'react-icons/fa';
import { BsDeviceHdd, BsSmartwatch } from 'react-icons/bs';
import { FiMonitor } from 'react-icons/fi';
import { AiOutlineCamera } from 'react-icons/ai';
import { BiGame } from 'react-icons/bi';
import { GiNecklace } from 'react-icons/gi';
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
    // Tech Categories
    {
      id: "smart-devices",
      title: "Smart Devices",
      Icon: LiaLaptopSolid,
      link: "/category/smart-devices",
    },
    {
      id: "computing",
      title: "Computing",
      Icon: FaDesktop,
      link: "/category/computing",
    },
    {
      id: "storage",
      title: "Storage",
      Icon: BsDeviceHdd,
      link: "/category/storage",
    },
    {
      id: "audio",
      title: "Audio",
      Icon: FaHeadphones,
      link: "/category/audio",
    },
    {
      id: "smart-tvs",
      title: "Smart TVs",
      Icon: LiaTvSolid,
      link: "/category/smart-tvs",
    },
    {
      id: "cameras",
      title: "Cameras",
      Icon: AiOutlineCamera,
      link: "/category/cameras",
    },
    {
      id: "gaming",
      title: "Gaming",
      Icon: BiGame,
      link: "/category/gaming",
    },
    // Fashion Categories
    {
      id: "clothing",
      title: "Clothing",
      Icon: FaTshirt,
      link: "/category/clothing",
    },
    {
      id: "jewelry",
      title: "Jewelry",
      Icon: MdOutlineDiamond,
      link: "/category/jewelry",
    },
    {
      id: "watches",
      title: "Watches",
      Icon: MdOutlineWatch,
      link: "/category/watches",
    },
    {
      id: "shoes",
      title: "Shoes",
      Icon: FaShoePrints,
      link: "/category/shoes",
    },
    {
      id: "accessories",
      title: "Accessories",
      Icon: GiNecklace,
      link: "/category/accessories",
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