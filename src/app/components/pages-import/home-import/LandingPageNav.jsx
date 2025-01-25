'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiSearch, FiMenu } from "react-icons/fi";
import { FaUser, FaCaretDown, FaSignOutAlt } from "react-icons/fa";
import {
  AppBar,
  Toolbar,
  InputBase,
  Badge,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  IconButton,
  styled,
  alpha,
  Container,
  Drawer,
  List,
  ListItem,
  useScrollTrigger,
  Slide
} from "@mui/material";

// Hide on scroll
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 170, 204, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderBottom: '1px solid rgba(0, 170, 204, 0.2)',
  }
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  border: '1px solid rgba(0, 170, 204, 0.2)',
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 1),
    border: '1px solid rgba(0, 170, 204, 0.4)',
    boxShadow: '0 2px 8px rgba(0, 170, 204, 0.1)',
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    minWidth: '300px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#0ac',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#116',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '12px 12px 12px 48px',
    fontSize: '0.95rem',
    width: '100%',
    '&::placeholder': {
      color: alpha('#116', 0.7),
      opacity: 1,
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: '8px 24px',
  textTransform: 'none',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  '&.contained': {
    backgroundColor: '#0ac',
    color: 'white',
    '&:hover': {
      backgroundColor: '#116',
      boxShadow: '0 4px 12px rgba(0, 170, 204, 0.2)',
    },
  },
  '&.outlined': {
    borderColor: '#0ac',
    color: '#0ac',
    '&:hover': {
      borderColor: '#116',
      color: '#116',
      backgroundColor: 'rgba(0, 170, 204, 0.05)',
    },
  },
}));

const CartButton = styled(IconButton)(({ theme }) => ({
  color: '#0ac',
  backgroundColor: 'rgba(0, 170, 204, 0.05)',
  transition: 'all 0.3s ease',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'rgba(0, 170, 204, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

export default function LandingPageNav() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUserName('');
      setCartCount(0);
      handleClose();
    } else {
      setIsLoggedIn(true);
      setUserName('John Doe');
    }
  };

  const addToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  return (
    <HideOnScroll>
      <StyledAppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleMobileMenu}
              sx={{ display: { md: 'none' }, color: '#0ac' }}
            >
              <FiMenu />
            </IconButton>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Image 
                src="/Logo/HOR.LOGO-BLUE.png" 
                alt="macronics" 
                width={140} 
                height={45} 
                style={{ objectFit: 'contain' }}
              />
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              flexGrow: 1, 
              justifyContent: 'center',
              px: 4 
            }}>
              <Search>
                <SearchIconWrapper>
                  <FiSearch size={20} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search for products..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Box>

            {/* Actions Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Link href="/pages/cart">
                <CartButton>
                  <Badge 
                    badgeContent={cartCount} 
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#0ac',
                        color: 'white',
                      }
                    }}
                  >
                    <FiShoppingCart size={20} />
                  </Badge>
                </CartButton>
              </Link>

              {/* Desktop Auth Buttons */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {isLoggedIn ? (
                  <Button
                    onClick={handleClick}
                    endIcon={<FaCaretDown />}
                    sx={{ 
                      textTransform: 'none',
                      color: '#0ac',
                      '&:hover': {
                        bgcolor: 'rgba(0, 170, 204, 0.05)'
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: '#0ac',
                        width: 32,
                        height: 32,
                        marginRight: 1
                      }}
                    >
                      {userName.charAt(0).toUpperCase()}
                    </Avatar>
                    {userName}
                  </Button>
                ) : (
                  <>
                    <ActionButton 
                      component={Link}
                      href="/pages/login"
                      variant="outlined"
                      className="outlined"
                    >
                      Sign In
                    </ActionButton>
                    <ActionButton 
                      component={Link}
                      href="/pages/sign-up"
                      variant="contained"
                      className="contained"
                    >
                      Sign Up
                    </ActionButton>
                  </>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 2,
            sx: {
              mt: 1.5,
              borderRadius: 2,
              minWidth: 180,
            }
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <FaUser size={18} color="#0ac" />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <FiShoppingCart size={18} color="#0ac" />
            </ListItemIcon>
            <ListItemText>My Cart</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={toggleLogin}>
            <ListItemIcon>
              <FaSignOutAlt size={18} color="#0ac" />
            </ListItemIcon>
            <ListItemText>Sign out</ListItemText>
          </MenuItem>
        </Menu>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={toggleMobileMenu}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          PaperProps={{
            sx: {
              width: 280,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Image 
              src="/Logo/HOR.LOGO-BLUE.png" 
              alt="macronics" 
              width={120}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Divider />
          <List>
            <ListItem>
              <Search>
                <SearchIconWrapper>
                  <FiSearch size={20} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search for products..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </ListItem>
            {!isLoggedIn && (
              <>
                <ListItem sx={{ pt: 2 }}>
                  <ActionButton 
                    fullWidth
                    component={Link}
                    href="/pages/login"
                    variant="outlined"
                    className="outlined"
                  >
                    Sign In
                  </ActionButton>
                </ListItem>
                <ListItem>
                  <ActionButton 
                    fullWidth
                    component={Link}
                    href="/pages/sign-up"
                    variant="contained"
                    className="contained"
                  >
                    Sign Up
                  </ActionButton>
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </StyledAppBar>
    </HideOnScroll>
  );
}