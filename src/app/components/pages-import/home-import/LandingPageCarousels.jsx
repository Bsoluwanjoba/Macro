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
  padding: '1 rem 5rem',
  width: '100%',
  position: 'relative',
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
  '&:hover': {
    backgroundColor: '#0ac',
    transform: 'translateY(-50%) scale(1.1)',
  },
  '@media (max-width: 600px)': {
    width: '32px',
    height: '32px',
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
  height: '2px',
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

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveStep((prevStep) => (prevStep + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  useEffect(() => {
    let timer;
    if (autoPlay && !isTransitioning) {
      timer = setInterval(() => {
        handleNext();
      }, SLIDE_DURATION);
    }
    return () => clearInterval(timer);
  }, [autoPlay, isTransitioning, handleNext]);

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
      <Container 
        maxWidth={false}
        sx={{
          maxWidth: '1600px !important',
          px: { xs: 2, sm: 4, md: 6 }
        }}
      >
        <Box 
          sx={{ 
            width: '100%',
            position: 'relative',
            height: { xs: '450px', sm: '600px', md: '750px', lg: '800px' },
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              '& .carousel-controls': {
                opacity: 1,
              },
            },
          }}
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
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
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  style={{
                    objectFit: 'cover',
                    animation: `${slideIn} 500ms ease-out`,
                  }}
                />
                {/* Overlay gradient */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
                    height: '50%',
                    pointerEvents: 'none',
                  }}
                />
                {/* Slide content */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: { xs: 40, sm: 60 },
                    left: { xs: 20, sm: 40 },
                    color: 'white',
                  }}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      mb: 1,
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 400,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      opacity: 0.9,
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                </Box>
              </Box>
            </Fade>
          ))}

          {/* Navigation Buttons */}
          <Box className="carousel-controls" sx={{ opacity: { xs: 1, sm: 0 }, transition: 'opacity 0.3s' }}>
            <StyledIconButton
              onClick={handleBack}
              sx={{ left: { xs: 8, sm: 16 } }}
            >
              <IoChevronBackSharp size={20} />
            </StyledIconButton>

            <StyledIconButton
              onClick={handleNext}
              sx={{ right: { xs: 8, sm: 16 } }}
            >
              <IoChevronForwardSharp size={20} />
            </StyledIconButton>
          </Box>

          {/* Dot Indicators */}
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: 12, sm: 20 },
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
              />
            ))}
          </Box>

          {/* Progress Bar */}
          {autoPlay && !isTransitioning && (
            <ProgressBar duration={SLIDE_DURATION} />
          )}
        </Box>
      </Container>
    </CarouselContainer>
  );
};

export default LandingPageCarousels;