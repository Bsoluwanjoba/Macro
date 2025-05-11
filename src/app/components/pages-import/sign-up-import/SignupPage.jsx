'use client';

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Paper,
  Typography,
  Box,
  Alert,
  Container,
  InputAdornment,
  IconButton,
  Grid,
  useTheme,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Link,
  styled
} from '@mui/material';
import { 
  FaUser, 
  FaEnvelope, 
  FaIdCard, 
  FaEye, 
  FaEyeSlash, 
  FaLock,
  FaUserCircle,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';
import Image from 'next/image';
import { useSignup } from '@/app/hooks/useSignup';

const GradientBackground = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(0, 170, 204, 0.95) 0%, rgba(17, 17, 102, 0.95) 100%)',
  position: 'relative',
  overflow: 'hidden',
  color: 'white',
  fontFamily: 'Poppins, sans-serif',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
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

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username too short!')
    .max(50, 'Username too long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  user_type: Yup.string()
    .oneOf(['vendor', 'customer'], 'Please select a user type')
    .required('Required'),
  first_name: Yup.string()
    .min(2, 'First name too short!')
    .max(50, 'First name too long!')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Last name too short!')
    .max(50, 'Last name too long!')
    .required('Required'),
});

const Signup = () => {
  const { signup, loading, error } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = ['Account Type', 'Personal Information', 'Account Details'];

  const initialValues = {
    username: '',
    password: '',
    email: '',
    user_type: '',
    first_name: '',
    last_name: ''
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await signup(values);
      // Signup successful - redirect will be handled by useSignup hook
    } catch (err) {
      setStatus({ error: err.response?.data?.message || 'Signup failed' });
    } finally {
      setSubmitting(false);
    }
  };

  const getStepContent = (step, errors, touched, isSubmitting) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" gutterBottom>
              Choose your account type
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Field name="user_type">
                {({ field }) => (
                  <FormControl component="fieldset" sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Paper
                          elevation={field.value === 'vendor' ? 3 : 1}
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            cursor: 'pointer',
                            border: field.value === 'vendor' ? `2px solid ${theme.palette.primary.main}` : '1px solid #e0e0e0',
                            backgroundColor: field.value === 'vendor' ? 'rgba(25, 118, 210, 0.04)' : 'white',
                            transition: 'all 0.3s',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                              borderColor: theme.palette.primary.main,
                              backgroundColor: 'rgba(25, 118, 210, 0.04)'
                            }
                          }}
                          onClick={() => field.onChange({ target: { name: 'user_type', value: 'vendor' } })}
                        >
                          <Box sx={{ mb: 2, fontSize: '2rem', color: theme.palette.primary.main }}>
                            <FaUserCircle />
                          </Box>
                          <Typography variant="h6" align="center">
                            Vendor
                          </Typography>
                          <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
                            Sell your products and services
                          </Typography>
                          <Radio
                            checked={field.value === 'vendor'}
                            sx={{ mt: 1 }}
                            disabled={loading}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Paper
                          elevation={field.value === 'customer' ? 3 : 1}
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            cursor: 'pointer',
                            border: field.value === 'customer' ? `2px solid ${theme.palette.primary.main}` : '1px solid #e0e0e0',
                            backgroundColor: field.value === 'customer' ? 'rgba(25, 118, 210, 0.04)' : 'white',
                            transition: 'all 0.3s',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                              borderColor: theme.palette.primary.main,
                              backgroundColor: 'rgba(25, 118, 210, 0.04)'
                            }
                          }}
                          onClick={() => field.onChange({ target: { name: 'user_type', value: 'customer' } })}
                        >
                          <Box sx={{ mb: 2, fontSize: '2rem', color: theme.palette.primary.main }}>
                            <FaUser />
                          </Box>
                          <Typography variant="h6" align="center">
                            Customer
                          </Typography>
                          <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
                            Browse and purchase products
                          </Typography>
                          <Radio
                            checked={field.value === 'customer'}
                            sx={{ mt: 1 }}
                            disabled={loading}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                    {touched.user_type && errors.user_type && (
                      <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                        {errors.user_type}
                      </Typography>
                    )}
                  </FormControl>
                )}
              </Field>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tell us about yourself
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Field name="first_name">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="First Name"
                      error={touched.first_name && Boolean(errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                      disabled={loading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaIdCard style={{ color: theme.palette.primary.main }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="last_name">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Last Name"
                      error={touched.last_name && Boolean(errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                      disabled={loading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaIdCard style={{ color: theme.palette.primary.main }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="email"
                      label="Email Address"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      disabled={loading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaEnvelope style={{ color: theme.palette.primary.main }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" gutterBottom>
              Create your account credentials
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field name="username">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Username"
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                      disabled={loading}
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
              </Grid>
              <Grid item xs={12}>
                <Field name="password">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      disabled={loading}
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
              </Grid>
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                    borderColor: 'rgba(25, 118, 210, 0.2)'
                  }}
                >
                  <Typography variant="body2" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Password requirements:
                  </Typography>
                  <Typography variant="caption" component="ul" sx={{ pl: 2, m: 0 }}>
                    <li>At least 8 characters long</li>
                    <li>Contains at least one uppercase letter</li>
                    <li>Contains at least one number</li>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <GradientBackground>
      <Container component="main" maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={6}
          sx={{
            overflow: 'hidden',
            borderRadius: 3,
            background: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
          }}
        >
          <Box sx={{ p: { xs: 3, sm: 5 } }}>
            <Box sx={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4
            }}>
              <Box sx={{ width: '200px', height: '60px', position: 'relative', mb: 4 }}>
                <Image
                  src="/Logo/HOR.LOGO-BLUE.png"
                  alt="MacRonics Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>
              <Typography component="h1" variant="h4" sx={{ mb: 1, color: theme.palette.primary.main, fontWeight: 'bold', textAlign: 'center' }}>
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                Join our community and explore the world of MacRonics
              </Typography>

              {/* Stepper */}
              <Stepper 
                activeStep={activeStep} 
                alternativeLabel 
                sx={{ 
                  width: '100%', 
                  mb: 4,
                  '.MuiStepLabel-label': {
                    mt: 1,
                    fontSize: '0.875rem'
                  },
                  '.MuiStepIcon-root': {
                    color: theme.palette.grey[300],
                    '&.Mui-active, &.Mui-completed': {
                      color: theme.palette.primary.main
                    }
                  }
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
                {error}
              </Alert>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, status, values, isValid }) => (
                <Form style={{ width: '100%' }}>
                  {status?.error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {status.error}
                    </Alert>
                  )}

                  {getStepContent(activeStep, errors, touched, isSubmitting)}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                      disabled={activeStep === 0 || loading}
                      onClick={handleBack}
                      startIcon={<FaArrowLeft />}
                      sx={{ textTransform: 'none' }}
                    >
                      Back
                    </Button>

                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || loading || !isValid}
                        sx={{
                          py: 1.5,
                          px: 4,
                          fontSize: '1rem',
                          textTransform: 'none',
                          borderRadius: 2,
                          boxShadow: 2,
                          '&:hover': {
                            boxShadow: 4,
                          }
                        }}
                      >
                        {loading ? 'Creating Account...' : 'Complete Signup'}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        endIcon={<FaArrowRight />}
                        onClick={handleNext}
                        disabled={
                          (activeStep === 0 && !values.user_type) || 
                          (activeStep === 1 && (!values.first_name || !values.last_name || !values.email || 
                            (touched.email && errors.email) || 
                            (touched.first_name && errors.first_name) || 
                            (touched.last_name && errors.last_name)))
                        }
                        sx={{
                          py: 1.5,
                          px: 4,
                          fontSize: '1rem',
                          textTransform: 'none',
                          borderRadius: 2,
                          boxShadow: 2,
                          '&:hover': {
                            boxShadow: 4,
                          }
                        }}
                      >
                        Continue
                      </Button>
                    )}
                  </Box>

                  {activeStep === steps.length - 1 && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        By creating an account, you agree to our{' '}
                        <Link href="#" underline="hover">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" underline="hover">
                          Privacy Policy
                        </Link>
                      </Typography>
                    </Box>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="white">
            Already have an account?{' '}
            <Link href="/login" underline="hover" sx={{ fontWeight: 'medium', color: 'white' }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Container>
    </GradientBackground>
  );
};

export default Signup;