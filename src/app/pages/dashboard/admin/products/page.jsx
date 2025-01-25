'use client'
import { useEffect, useState, useCallback } from 'react';
import { 
  Table, 
  Button 
} from 'flowbite-react';
import { 
  Snackbar, 
  Alert 
} from '@mui/material';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useProducts } from '@/app/hooks/useProduct';
import Image from 'next/image';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const { getAllProducts, deleteProduct, isLoading, error } = useProducts();

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setAlert({
        open: true,
        message: 'Error fetching products',
        severity: 'error'
      });
    }
  }, [getAllProducts, setAlert]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setAlert({
        open: true,
        message: 'Product deleted successfully',
        severity: 'success'
      });
      fetchProducts();
    } catch (error) {
      setAlert({
        open: true,
        message: 'Error deleting product',
        severity: 'error'
      });
    }
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button color="blue" href="/pages/dashboard/admin/products/new">
          Add New Product
        </Button>
      </div>

      {isLoading && <div>Loading...</div>}

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Stock</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Updated</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>
                <div className="w-16 h-16 relative">
                  <Image
                    src={product.image || '/placeholder.png'}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              </Table.Cell>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>{formatPrice(product.price)}</Table.Cell>
              <Table.Cell>{product.stock}</Table.Cell>
              <Table.Cell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  product.status === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </Table.Cell>
              <Table.Cell>{formatDate(product.updated_at)}</Table.Cell>
              <Table.Cell>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => window.location.href = `/products/edit/${product.id}`}
                    className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}