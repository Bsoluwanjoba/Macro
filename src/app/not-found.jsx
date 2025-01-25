'use client'
import { Box, Button, Container, Typography, styled } from '@mui/material';
import { HiHome } from 'react-icons/hi';
import { BiSupport } from 'react-icons/bi';
import Link from 'next/link';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fc1',
  color: '#116',
  padding: '10px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#116',
    color: 'white',
    transform: 'translateY(-2px)',
  },
}));

const ErrorText = styled(Typography)({
  fontSize: '150px',
  fontWeight: 800,
  color: '#fc1',
  textShadow: '0 0 20px rgba(255, 204, 17, 0.5)',
  lineHeight: 1,
  '@media (max-width: 600px)': {
    fontSize: '100px',
  },
});

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0ac 0%, #116 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 204, 17, 0.1)',
          top: '-100px',
          right: '-100px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 204, 17, 0.05)',
          bottom: '-50px',
          left: '-50px',
        }}
      />

      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '40px',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ErrorText variant="h1">
            404
          </ErrorText>

          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 700,
              marginTop: 2,
              marginBottom: 1,
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: 4,
              fontSize: '1.1rem',
            }}
          >
            Oops! The page you&apos;re looking for seems to have wandered off.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <StyledButton
              component={Link}
              href="/"
              startIcon={<HiHome size={20} />}
              fullWidth
            >
              Return to Homepage
            </StyledButton>

            <StyledButton
              component={Link}
              href="/contact"
              startIcon={<BiSupport size={20} />}
              fullWidth
            >
              Contact Support
            </StyledButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;