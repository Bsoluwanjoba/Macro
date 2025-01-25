import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useVendorRegistration = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerVendor = async (values) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const response = await axios.post('/vendors/vendors/', {
        ...values,
        user: user.id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data) {
        router.push('/vendor/dashboard');
        return response.data;
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerVendor,
    isLoading,
    error
  };
};