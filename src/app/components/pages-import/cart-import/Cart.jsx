'use client'
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
  Divider,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Alert,
  styled
} from '@mui/material';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';

const CartItemPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 170, 204, 0.1)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  backgroundColor: '#0ac',
  color: 'white',
  '&:hover': {
    backgroundColor: '#116',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 170, 204, 0.2)',
  },
}));

const steps = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export default function Cart() {
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sample Product 1',
      price: 299.99,
      quantity: 1,
      image: '/products/sample1.jpg'
    },
    // Add more sample items as needed
  ]);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    email: '',
    phone: '',
    houseNumber: '',
    StreetNumber: '',
    State: '',
    ZipCode: '',
    LGA: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderComplete, setOrderComplete] = useState(false);

  const handleQuantityChange = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setOrderComplete(true);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderCartItems = () => (
    <Box>
      {cartItems.map((item) => (
        <CartItemPaper key={item.id}>
          <Box sx={{ width: 100, height: 100, position: 'relative' }}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              ${item.price.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
              <FiMinus />
            </IconButton>
            <Typography>{item.quantity}</Typography>
            <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
              <FiPlus />
            </IconButton>
          </Box>
          <IconButton onClick={() => handleRemoveItem(item.id)} color="error">
            <FiTrash2 />
          </IconButton>
        </CartItemPaper>
      ))}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">
          Total: ${calculateTotal().toFixed(2)}
        </Typography>
      </Paper>
    </Box>
  );

  const renderShippingForm = () => (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={shippingInfo.firstName}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={shippingInfo.lastName}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Postal Code"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={shippingInfo.email}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleShippingInfoChange}
          />
        </Grid>
      </Grid>
    </Paper>
  );

  const renderPaymentForm = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <FormControlLabel 
          value="card" 
          control={<Radio />} 
          label="Credit/Debit Card" 
        />
        <FormControlLabel 
          value="paypal" 
          control={<Radio />} 
          label="PayPal" 
        />
        <FormControlLabel 
          value="bank" 
          control={<Radio />} 
          label="Bank Transfer" 
        />
      </RadioGroup>
      {paymentMethod === 'card' && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Card Number"
              placeholder="1234 5678 9012 3456"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              placeholder="MM/YY"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CVV"
              placeholder="123"
            />
          </Grid>
        </Grid>
      )}
    </Paper>
  );

  const renderConfirmation = () => (
    <Box>
      {orderComplete ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          Your order has been placed successfully!
        </Alert>
      ) : (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Typography>
            Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </Typography>
          <Typography>
            Total Amount: ${calculateTotal().toFixed(2)}
          </Typography>
          <Typography>
            Shipping To: {shippingInfo.firstName} {shippingInfo.lastName}
          </Typography>
          <Typography>
            Payment Method: {paymentMethod}
          </Typography>
        </Paper>
      )}
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderCartItems();
      case 1:
        return renderShippingForm();
      case 2:
        return renderPaymentForm();
      case 3:
        return renderConfirmation();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {cartItems.length === 0 && activeStep === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <StyledButton href="/" sx={{ mt: 2 }}>
            Continue Shopping
          </StyledButton>
        </Paper>
      ) : (
        <>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack}>
                Back
              </Button>
            )}
            <StyledButton
              onClick={handleNext}
              disabled={cartItems.length === 0}
            >
              {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
            </StyledButton>
          </Box>
        </>
      )}
    </Container>
  );
}
