'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Box, Container, Typography, Fade, styled, keyframes } from '@mui/material';
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";

const slideIn = keyframes`
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
`;

const CarouselContainer = styled(Box)({
  background: 'linear-gradient(135deg, #0ac 0%, #116 100%)',
  width: '100%',
  position: 'relative',
  minHeight: '100vh', // Full screen height
  overflow: 'hidden',
});

const StyledIconButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(17, 17, 102, 0.8)',
  color: '#fc1',
  transition: 'all 0.3s ease',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '50%',
  zIndex: 10,
  '&:hover': {
    backgroundColor: '#0ac',
    transform: 'translateY(-50%) scale(1.1)',
  },
  '@media (max-width: 600px)': {
    width: '36px',
    height: '36px',
  },
}));

const DotIndicator = styled(Box)(({ active }) => ({
  width: active ? '24px' : '8px',
  height: '8px',
  borderRadius: active ? '12px' : '50%',
  backgroundColor: active ? '#0ac' : 'rgba(255, 255, 255, 0.5)',
  margin: '0 4px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: active ? '#0ac' : 'rgba(255, 255, 255, 0.8)',
  },
}));

const ProgressBar = styled(Box)(({ duration }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '3px',
  backgroundColor: '#0ac',
  animation: `${keyframes`
    from { width: 0; }
    to { width: 100%; }
  `} ${duration}ms linear`,
}));

const LandingPageCarousels = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const slides = [
    { 
      src: "/LandingCarousels/Artboard 1@2x.png", 
      alt: "slide1",
      title: "Premium Electronics",
      subtitle: "Discover our latest collection"
    },
    { 
      src: "/LandingCarousels/Artboard 2@2x.png", 
      alt: "slide2",
      title: "Smart Devices",
      subtitle: "Connect your world"
    },
    { 
      src: "/LandingCarousels/Artboard 3@2x.png", 
      alt: "slide3",
      title: "Quality Assured",
      subtitle: "Tested and certified products"
    },
    { 
      src: "/LandingCarousels/Artboard 4@2x.png", 
      alt: "slide4",
      title: "Special Offers",
      subtitle: "Save big on selected items"
    },
    { 
      src: "/LandingCarousels/Artboard 5@2x.png", 
      alt: "slide5",
      title: "New Arrivals",
      subtitle: "Be the first to explore"
    },
    { 
      src: "/LandingCarousels/Artboard 6@2x.png", 
      alt: "slide6",
      title: "Tech Essentials",
      subtitle: "Everything you need"
    },
  ];

  const SLIDE_DURATION = 5000;

  // Handle window resize and ensure autoplay is always enforced
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      
      // Always maintain autoplay regardless of user interaction
      setAutoPlay(true);
      
      window.addEventListener('resize', handleResize);
      handleResize(); // Initialize on mount
      
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveStep((prevStep) => (prevStep + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  // Enhanced autoplay effect with reset mechanism
  useEffect(() => {
    let timer;
    
    // Always start the timer
    timer = setInterval(() => {
      if (!isTransitioning) {
        handleNext();
      }
    }, SLIDE_DURATION);
    
    // Clear timer on unmount
    return () => clearInterval(timer);
  }, [isTransitioning, handleNext]);

  const handleBack = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveStep((prevStep) => (prevStep - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleDotClick = (index) => {
    if (isTransitioning || index === activeStep) return;
    setIsTransitioning(true);
    setActiveStep(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <CarouselContainer>
      <Box 
        sx={{ 
          width: '100%',
          height: '100vh', // Full viewport height
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            '& .carousel-controls': {
              opacity: 1,
            },
          },
        }}
        onMouseEnter={() => {}} // Remove pause on hover
        onMouseLeave={() => {}}
      >
        {slides.map((slide, index) => (
          <Fade 
            key={slide.src} 
            in={activeStep === index}
            timeout={500}
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: activeStep === index ? 'block' : 'none',
            }}
          >
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={slide.src}
                alt={slide.alt}
                priority={index === 0}
                fill
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  animation: `${slideIn} 700ms ease-out`,
                }}
              />
              {/* Overlay gradient */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.2) 60%, transparent 85%)',
                  height: '100%',
                  pointerEvents: 'none',
                }}
              />
              {/* Slide content */}
              <Container maxWidth="lg" sx={{ height: '100%', position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: { xs: '15%', sm: '20%', md: '22%', lg: '20%' },
                    left: { xs: 16, sm: 40, md: 60 },
                    maxWidth: { xs: '80%', sm: '70%', md: '60%' },
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(3px)',
                    borderRadius: '8px',
                    padding: { xs: '12px', sm: '16px', md: '24px' },
                    boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
                  }}
                >
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontWeight: 700,
                      textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                      mb: { xs: 1, sm: 2 },
                      fontSize: { xs: '2rem', sm: '2.75rem', md: '3.2rem', lg: '3.8rem' },
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 500,
                      textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                      opacity: 1,
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.4rem', lg: '1.6rem' },
                      color: '#f0f8ff',
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                </Box>
              </Container>
            </Box>
          </Fade>
        ))}

        {/* Navigation Buttons */}
        <Box className="carousel-controls" sx={{ 
          opacity: { xs: 0.8, sm: windowSize.width < 768 ? 0.8 : 0 }, 
          transition: 'opacity 0.3s'
        }}>
          <StyledIconButton
            onClick={handleBack}
            sx={{ left: { xs: 12, sm: 20, md: 32 } }}
            aria-label="Previous slide"
          >
            <IoChevronBackSharp size={windowSize.width < 600 ? 18 : 22} />
          </StyledIconButton>

          <StyledIconButton
            onClick={handleNext}
            sx={{ right: { xs: 12, sm: 20, md: 32 } }}
            aria-label="Next slide"
          >
            <IoChevronForwardSharp size={windowSize.width < 600 ? 18 : 22} />
          </StyledIconButton>
        </Box>

        {/* Dot Indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '5%', sm: '8%' },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          {slides.map((_, index) => (
            <DotIndicator
              key={index}
              active={index === activeStep}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </Box>

        {/* Progress Bar - Always visible */}
        {!isTransitioning && (
          <ProgressBar duration={SLIDE_DURATION} />
        )}
      </Box>
    </CarouselContainer>
  );
};

export default LandingPageCarousels;