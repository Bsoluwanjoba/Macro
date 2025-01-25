import Cart from '@/app/components/pages-import/cart-import/Cart';
import LandingPageNav from '@/app/components/pages-import/home-import/LandingPageNav';
import Footer from '@/app/components/footer/Footer';
import { Box } from '@mui/material';

export default function CartPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingPageNav />
      <Box sx={{ flexGrow: 1, pt: { xs: 8, sm: 9 } }}>
        <Cart />
      </Box>
      <Footer />
    </Box>
  );
}
