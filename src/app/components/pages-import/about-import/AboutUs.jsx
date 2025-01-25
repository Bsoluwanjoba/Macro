'use client'
import { Box, Container, Typography, Card, CardContent, Link as MuiLink, Stack, Chip, useTheme, useMediaQuery } from '@mui/material';
import Link from "next/link";
import { FaQuoteLeft } from "react-icons/fa";
import { IoRocketOutline, IoEyeOutline, IoLaptopOutline } from "react-icons/io5";

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const infoArray = [
    {
      question: "What is MacRonics?",
      answer: "MacRonics is a leading consumer electronics company in Nigeria, dedicated to providing high-quality, innovative products that enhance daily life.",
      icon: <IoLaptopOutline size={40} />
    },
    {
      question: "Mission",
      answer: "To empower consumers to embrace the latest technology through affordable and user-friendly products. MacRonics is a leading consumer electronics company in Nigeria, dedicated to providing high-quality, innovative products that enhance daily life.",
      icon: <IoRocketOutline size={40} />
    },
    {
      question: "Vision",
      answer: "To be the top provider of consumer electronics in Nigeria, known for quality, innovation, and customer satisfaction.",
      icon: <IoEyeOutline size={40} />
    },
  ];

  const productLinks = [
    "Smartphones", "Laptops", "Tablets", "Smartwatches", "Bluetooth Speakers", 
    "Headphones", "Smart TVs", "Gaming Consoles", "Desktop Computers", 
    "Smart Home Devices", "Wearable Fitness Trackers", "Drones", 
    "Digital Cameras", "Home Security Systems", "Portable Chargers", 
    "Virtual Reality Headsets", "E-Readers", "Robotic Vacuum Cleaners", 
    "Air Purifiers", "3D Printers"
  ];

  return (
    <Box 
      sx={{ 
        bgcolor: 'grey.100',
        py: { xs: 4, md: 8 },
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Info Section */}
          <Stack spacing={4}>
            {infoArray.map((item, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                  >
                    <Box 
                      sx={{ 
                        color: '#0ac',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(0, 170, 204, 0.1)',
                        p: 2,
                        borderRadius: 2,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Stack spacing={1} flex={1}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700,
                          color: '#116',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {item.question}
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: 'text.secondary',
                          lineHeight: 1.8,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Products Section */}
          <Card 
            elevation={0}
            sx={{ 
              bgcolor: 'white',
              borderRadius: 2,
              p: { xs: 3, md: 4 },
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: '#116',
                mb: 3,
                letterSpacing: '0.05em',
              }}
            >
              Products Offered
            </Typography>
            <Box 
              sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
              }}
            >
              {productLinks.map((product) => (
                <Chip
                  key={product}
                  label={product}
                  component={Link}
                  href="#"
                  clickable
                  sx={{
                    bgcolor: 'rgba(0, 170, 204, 0.1)',
                    color: '#0ac',
                    '&:hover': {
                      bgcolor: '#0ac',
                      color: 'white',
                    },
                    transition: 'all 0.3s ease',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutUs;