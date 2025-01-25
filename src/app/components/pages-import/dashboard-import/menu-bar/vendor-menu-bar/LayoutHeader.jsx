'use client'
import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import { IoIosNotificationsOutline } from "react-icons/io"
import { MdOutlineMessage, MdStorefront } from "react-icons/md"
import { IoLogOut } from "react-icons/io5"
import Image from "next/image"
import { 
  AppBar,
  Box, 
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  styled,
  useTheme,
  useMediaQuery,
  Divider,
  Typography
} from "@mui/material"

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 3),
  },
}));

const SearchWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '500px',
  padding: theme.spacing(0.5, 2),
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadius,
  border: '2px solid #eee',
  transition: 'border-color 0.2s ease',
  '&:hover': {
    borderColor: '#0ac',
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(1, 0),
    maxWidth: '100%',
  },
}));

const ProfileMenu = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(1),
  minWidth: '200px',
}));

const StoreStatus = styled(Box)(({ theme, isOnline }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isOnline ? 'rgba(46, 204, 113, 0.1)' : 'rgba(255, 99, 71, 0.1)',
  color: isOnline ? '#2ecc71' : '#ff6347',
  fontSize: '0.85rem',
  gap: '6px',
  '& .dot': {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: isOnline ? '#2ecc71' : '#ff6347',
  },
}));

export default function VendorLayoutHeader() {
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const [isStoreOnline, setIsStoreOnline] = useState(true)

  const handleProfileClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleStoreStatus = () => {
    setIsStoreOnline(!isStoreOnline)
    handleClose()
  }

  const open = Boolean(anchorEl)

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <StyledToolbar>
        {/* Logo */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            width: isMobile ? '120px' : '150px',
          }}
        >
          <Image
            src="/Logo/HOR.LOGO-BLUE.png"
            alt="macronics"
            width={isMobile ? 120 : 150}
            height={isMobile ? 120 : 150}
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {/* Store Status */}
        {!isMobile && (
          <StoreStatus isOnline={isStoreOnline}>
            <span className="dot" />
            {isStoreOnline ? 'Store Online' : 'Store Offline'}
          </StoreStatus>
        )}

        {/* Search Bar */}
        {!isMobile && (
          <SearchWrapper elevation={0}>
            <InputBase
              placeholder="Search products, orders, customers..."
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '0.95rem',
                },
              }}
            />
          </SearchWrapper>
        )}

        {/* Icons and Profile */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: theme.spacing(2),
        }}>
          {/* Search Icon for Mobile */}
          {isMobile && (
            <IconButton 
              size="large"
              sx={{ color: '#0ac' }}
            >
              <MdOutlineMessage />
            </IconButton>
          )}

          {/* Notifications */}
          <IconButton 
            size={isMobile ? "medium" : "large"}
            sx={{ color: '#0ac' }}
          >
            <Badge 
              badgeContent={4} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 3,
                },
              }}
            >
              <IoIosNotificationsOutline />
            </Badge>
          </IconButton>

          {/* Messages */}
          <IconButton 
            size={isMobile ? "medium" : "large"}
            sx={{ color: '#0ac' }}
          >
            <Badge 
              badgeContent={2} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 3,
                },
              }}
            >
              <MdOutlineMessage />
            </Badge>
          </IconButton>

          {/* Profile */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              ml: 1,
            }}
            onClick={handleProfileClick}
          >
            <Avatar 
              sx={{ 
                bgcolor: '#0ac',
                width: isMobile ? 32 : 40,
                height: isMobile ? 32 : 40,
              }}
            >
              VS
            </Avatar>
            {!isMobile && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: '#0ac',
                  fontWeight: 500,
                  fontSize: isTablet ? '0.9rem' : '1rem',
                }}
              >
                Vendor Store
                <FaCaretDown style={{ marginLeft: '4px' }} />
              </Box>
            )}
          </Box>

          {/* Profile Menu */}
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom-end"
            transition
            sx={{ zIndex: theme.zIndex.drawer + 2 }}
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps}>
                <ProfileMenu>
                  <ClickAwayListener onClickAway={handleClose}>
                    <Box>
                      {/* Store Status Toggle */}
                      <MenuItem 
                        onClick={toggleStoreStatus}
                        sx={{ 
                          color: isStoreOnline ? '#2ecc71' : '#ff6347',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          fontSize: '0.9rem',
                          mb: 1,
                        }}
                      >
                        <span 
                          style={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            backgroundColor: isStoreOnline ? '#2ecc71' : '#ff6347',
                          }} 
                        />
                        {isStoreOnline ? 'Store Online' : 'Store Offline'}
                      </MenuItem>

                      <Divider sx={{ my: 1 }} />

                      {/* Store Profile */}
                      <MenuItem 
                        onClick={handleClose}
                        sx={{ 
                          color: '#0ac',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          fontSize: '0.9rem',
                        }}
                      >
                        <MdStorefront />
                        Store Profile
                      </MenuItem>

                      {/* Logout */}
                      <MenuItem 
                        onClick={handleClose}
                        sx={{ 
                          color: '#0ac',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          fontSize: '0.9rem',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 170, 204, 0.1)',
                          },
                        }}
                      >
                        <IoLogOut />
                        Logout
                      </MenuItem>
                    </Box>
                  </ClickAwayListener>
                </ProfileMenu>
              </Grow>
            )}
          </Popper>
        </Box>
      </StyledToolbar>

      {/* Mobile Search Bar */}
      {isMobile && (
        <Box sx={{ p: 2, backgroundColor: 'white' }}>
          <SearchWrapper elevation={0}>
            <InputBase
              placeholder="Search products, orders, customers..."
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '0.9rem',
                },
              }}
            />
          </SearchWrapper>
        </Box>
      )}
    </AppBar>
  )
}
