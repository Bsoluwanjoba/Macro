// hooks/useLogin.js
'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Get access token
      const tokenResponse = await axios.post('https://macronics.onrender.com/api/token', {
        email,
        password,
      });

      const { access, refresh } = tokenResponse.data;

      // Store tokens
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Get user details
      const userResponse = await axios.get('https://macronics.onrender.com/api/customers/profile', {
        headers: {
          Authorization: `Bearer ${access}`
        }
      });

      // Store user info
      localStorage.setItem('user', JSON.stringify(userResponse.data));

      // Route based on user type
      if (userResponse.data.user_type === 'customer') {
        router.push('/');
      } else if (userResponse.data.user_type === 'vendor') {
        router.push('/pages/vendor');
      }

      return userResponse.data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message || 
                          'Login failed. Please check your credentials.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};