'use client'
import { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://macronics.onrender.com/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/products/products/`, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (productData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/products/products/`, productData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${BASE_URL}/products/products/${id}`, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAllProducts,
    createProduct,
    deleteProduct,
    isLoading,
    error
  };
};