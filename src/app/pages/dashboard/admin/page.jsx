'use client'
import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { User, Building2, Users } from 'lucide-react';

const BASE_URL = 'https://macronics.onrender.com/api';

const AdminDash = () => {
  const [users, setUsers] = useState({ vendors: [], customers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await authenticatedRequest(`${BASE_URL}/customers/customers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response;
      const vendors = data.filter(user => user.user_type === 'vendor');
      const customers = data.filter(user => user.user_type === 'customer');
      setUsers({ vendors, customers });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const UserTable = ({ users, title, icon: Icon }) => (
    <Card className="mb-8">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Icon className="h-8 w-8 text-[#0ac]" />
          <h5 className="text-xl font-bold text-[#0ac]">{title}</h5>
        </div>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" className="text-gray-500">
                    No {title.toLowerCase()} found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell className="tracking-wide">
                      {capitalizeFirstLetter(user.first_name)} {user.last_name}
                    </TableCell>
                    <TableCell className="tracking-wide">{user.username}</TableCell>
                    <TableCell className="tracking-wide">{user.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="m-4">
        Error loading users: {error}
      </Alert>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <UserTable 
        users={users.vendors} 
        title="Vendors" 
        icon={Building2} 
      />
      <UserTable 
        users={users.customers} 
        title="Customers" 
        icon={User}
        className="mt-14" 
      />
    </div>
  );
};

export default AdminDash;