'use client';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import NextLink from 'next/link';
import Image from 'next/image';
import { useLogin } from '@/app/hooks/useLogin';

// Validation Schema
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login = () => {
  const { login, isLoading, error } = useLogin();
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values.username, values.password);
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4
          }}
        >
          <Box sx={{ width: isMobile ? '200px' : '250px', height: '80px', position: 'relative', mb: 2 }}>
            <Image
              src="/Logo/HOR.LOGO-BLUE.png"
              alt="MacRonics Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>
          <Typography component="h1" variant="h4" sx={{ mb: 1, color: theme.palette.primary.main }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Sign in to continue to MacRonics
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form style={{ width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Field name="username">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Username"
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                      disabled={isLoading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaUser style={{ color: theme.palette.primary.main }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>

                <Field name="password">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      disabled={isLoading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaLock style={{ color: theme.palette.primary.main }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading || isSubmitting}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: 2,
                    '&:hover': {
                      boxShadow: 4,
                    }
                  }}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Don&apos;t have an account?{' '}
                    <Link component={NextLink} href="/signup" underline="hover" sx={{ fontWeight: 500 }}>
                      Sign up
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;