'use client'
import React, { useState, useEffect } from 'react';
import Home from './pages/home/Home';
import Loader from './components/loader/Loader';

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Home />
        </div>
      )}
    </div>
  );
};

export default Page;