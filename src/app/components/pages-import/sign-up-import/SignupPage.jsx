'use client';

import React from 'react';
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
  useMediaQuery
} from '@mui/material';
import { FaUser, FaEnvelope, FaIdCard, FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import { useSignup } from '@/app/hooks/useSignup';

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
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const initialValues = {
    username: '',
    password: '',
    email: '',
    user_type: '',
    first_name: '',
    last_name: ''
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
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Join our community and explore the world of MacRonics
          </Typography>
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
          {({ errors, touched, isSubmitting, status }) => (
            <Form style={{ width: '100%' }}>
              <Grid container spacing={3}>
                {status?.error && (
                  <Grid item xs={12}>
                    <Alert severity="error">
                      {status.error}
                    </Alert>
                  </Grid>
                )}

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
                  <Field name="email">
                    {({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="email"
                        label="Email"
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

                <Grid item xs={12}>
                  <FormControl component="fieldset" sx={{ width: '100%' }}>
                    <FormLabel component="legend" sx={{ mb: 1 }}>User Type</FormLabel>
                    <Field name="user_type">
                      {({ field }) => (
                        <RadioGroup
                          {...field}
                          row
                          sx={{
                            justifyContent: 'center',
                            '& .MuiFormControlLabel-root': {
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 1,
                              m: 1,
                              flex: 1,
                              justifyContent: 'center'
                            }
                          }}
                        >
                          <FormControlLabel
                            value="vendor"
                            control={<Radio />}
                            label="Vendor"
                            disabled={loading}
                          />
                          <FormControlLabel
                            value="customer"
                            control={<Radio />}
                            label="Customer"
                            disabled={loading}
                          />
                        </RadioGroup>
                      )}
                    </Field>
                  </FormControl>
                </Grid>

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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting || loading}
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
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Signup;