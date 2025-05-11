'use client'

import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { 
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Container,
  Alert,
  CircularProgress,
  InputAdornment,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { FaBuilding, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';

const VendorRegistrationSchema = Yup.object().shape({
  business_name: Yup.string()
    .min(3, 'Business name must be at least 3 characters')
    .required('Business name is required'),
  contact_phone: Yup.string()
    .matches(/^[0-9]{10,11}$/, 'Phone number must be 10-11 digits')
    .required('Contact phone is required'),
  address: Yup.string()
    .min(10, 'Address must be at least 10 characters')
    .required('Business address is required')
});

const VendorRegistrationPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { registerVendor, isLoading, error } = useVendorRegistration();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const initialValues = {
    business_name: '',
    contact_phone: '',
    address: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await registerVendor(values);
    } catch (error) {
      console.error('Vendor registration failed', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isMounted) {
    return null;
  }

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
            Business Registration
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Register your business with MacRonics
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={VendorRegistrationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
            <Form style={{ width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  id="business_name"
                  name="business_name"
                  label="Business Name"
                  value={values.business_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.business_name && Boolean(errors.business_name)}
                  helperText={touched.business_name && errors.business_name}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaBuilding style={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  id="contact_phone"
                  name="contact_phone"
                  label="Contact Phone"
                  value={values.contact_phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contact_phone && Boolean(errors.contact_phone)}
                  helperText={touched.contact_phone && errors.contact_phone}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaPhone style={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Business Address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                  multiline
                  rows={4}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaMapMarkerAlt style={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button 
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading || isSubmitting}
                  startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
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
                  {isLoading ? 'Registering Business...' : 'Register Business'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default VendorRegistrationPage;