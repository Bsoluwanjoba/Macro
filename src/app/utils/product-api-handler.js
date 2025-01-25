// product-api-handler.js

const BASE_URL = 'https://macronics.onrender.com/api';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYxNjAxNTcwLCJpYXQiOjE3MzAwNjU1NzAsImp0aSI6ImQ0NzA3YzQwYzg2OTQ0ZGI5ODYwMGJkODJiNTgyZmFhIiwidXNlcl9pZCI6N30.2aDEVXf4w2rxQH-Ht4dFSt0o5TtZHY173pjVh7mOcQ4';

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/products/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

// Get single product
export const getProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/products/${id}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Create product
export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/products/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/products/${id}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/products/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};