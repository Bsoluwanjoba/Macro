'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const route = useRouter();

  const signup = async (userData) => {
    setLoading(true);
    setError(null);

    Headers:
    try {
      const response = await axios.post('https://macronics.onrender.com/api/customers/signup/', userData);
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);
      
      // Store user info
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Route based on user type
      if (response.data.user.user_type === 'customer') {
        route('/pages/login');
      } else if (response.data.user.user_type === 'vendor') {
        route('/pages/login');
      }

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};