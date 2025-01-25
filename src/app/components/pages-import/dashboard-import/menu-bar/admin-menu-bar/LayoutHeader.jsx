'use client'
import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import { IoIosNotificationsOutline } from "react-icons/io"
import { MdOutlineMessage } from "react-icons/md"
import { IoLogOut } from "react-icons/io5"
import { FiSearch } from "react-icons/fi"
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
  alpha,
} from "@mui/material"

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 3),
  },
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
      color: '#116',
      opacity: 0.7,
    },
  },
}));

const ProfileMenu = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(1),
  minWidth: '150px',
}));

export default function LayoutHeader() {
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const handleProfileClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer - 1,
        width: { sm: 'calc(100% - 250px)' },
        ml: { sm: '250px' },
      }}
    >
      <StyledToolbar>
        <Search>
          <SearchIconWrapper>
            <FiSearch size={20} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <IoIosNotificationsOutline size={24} color="#0ac" />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <MdOutlineMessage size={24} color="#0ac" />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <Box sx={{ position: 'relative' }}>
            <Box
              onClick={handleProfileClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                gap: 1,
              }}
            >
              <Avatar
                src="/images/avatar.jpg"
                alt="profile"
                sx={{ width: 35, height: 35 }}
              />
              <FaCaretDown
                size={16}
                style={{
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  color: '#0ac',
                }}
              />
            </Box>

            <Popper
              open={open}
              anchorEl={anchorEl}
              placement="bottom-end"
              transition
              disablePortal
              style={{ zIndex: 1300 }}
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <ProfileMenu>
                    <ClickAwayListener onClickAway={handleClose}>
                      <Box>
                        <MenuItem onClick={handleClose}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          Settings
                        </MenuItem>
                        <MenuItem 
                          onClick={handleClose}
                          sx={{ 
                            color: 'error.main',
                            '&:hover': { 
                              backgroundColor: 'error.light',
                              color: 'white',
                            }
                          }}
                        >
                          <IoLogOut style={{ marginRight: '8px' }} />
                          Logout
                        </MenuItem>
                      </Box>
                    </ClickAwayListener>
                  </ProfileMenu>
                </Grow>
              )}
            </Popper>
          </Box>
        </Box>
      </StyledToolbar>
    </AppBar>
  )
}
