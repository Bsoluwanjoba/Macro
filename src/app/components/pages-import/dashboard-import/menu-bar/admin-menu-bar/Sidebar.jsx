'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Collapse,
  IconButton,
  Paper,
  styled,
  useTheme,
  useMediaQuery,
  Popper,
  Grow,
  ClickAwayListener
} from "@mui/material"
import { 
  MdSpaceDashboard, 
  MdProductionQuantityLimits, 
  MdCancel 
} from "react-icons/md"
import { 
  FaUser, 
  FaChartLine, 
  FaChevronRight
} from "react-icons/fa"
import { RiListOrdered2 } from "react-icons/ri"
import { BiSolidReport } from "react-icons/bi"
import { BsLayoutTextWindowReverse } from "react-icons/bs"
import { AiOutlineMenu } from 'react-icons/ai'

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: 'white',
    width: 250,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    zIndex: theme.zIndex.drawer,
  },
}));

const DropdownPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  minWidth: '200px',
  zIndex: theme.zIndex.drawer + 2,
}));

const MenuItem = styled(ListItem)(({ active, theme }) => ({
  borderRadius: '8px',
  marginBottom: '8px',
  backgroundColor: active ? '#0ac' : 'transparent',
  color: active ? 'white' : '#0ac',
  '&:hover': {
    backgroundColor: active ? '#0ac' : 'rgba(0, 170, 204, 0.1)',
  },
  '& .MuiListItemIcon-root': {
    color: active ? 'white' : '#0ac',
    minWidth: '40px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '32px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
}));

function Navbar() {
  const [dropdownAnchor, setDropdownAnchor] = useState(null)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [nav, setNav] = useState(false)
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const pathname = usePathname()

  const handleDropdownClick = (event, menuId) => {
    if (activeDropdown === menuId) {
      setDropdownAnchor(null)
      setActiveDropdown(null)
    } else {
      setDropdownAnchor(event.currentTarget)
      setActiveDropdown(menuId)
    }
  }

  const handleDropdownClose = () => {
    setDropdownAnchor(null)
    setActiveDropdown(null)
  }

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <MdSpaceDashboard size={24} />,
      href: '/admin/dashboard'
    },
    {
      title: 'Products',
      icon: <MdProductionQuantityLimits size={24} />,
      id: 'products',
      subItems: [
        { title: 'Add Products', href: '/admin/dashboard/products/add-products' },
        { title: 'All Products', href: '/admin/dashboard/products/all-products' },
        { title: 'Categories', href: '/admin/dashboard/products/categories' }
      ]
    },
    {
      title: 'Orders',
      icon: <RiListOrdered2 size={24} />,
      href: '/admin/dashboard/orders'
    },
    {
      title: 'Users',
      icon: <FaUser size={24} />,
      id: 'users',
      subItems: [
        { title: 'Add User', href: '/admin/dashboard/users/add-user' },
        { title: 'All Users', href: '/admin/dashboard/users/all-users' }
      ]
    },
    {
      title: 'Analytics',
      icon: <FaChartLine size={24} />,
      href: '/admin/dashboard/analytics'
    },
    {
      title: 'Reports',
      icon: <BiSolidReport size={24} />,
      href: '/admin/dashboard/reports'
    },
    {
      title: 'Content',
      icon: <BsLayoutTextWindowReverse size={24} />,
      href: '/admin/dashboard/content'
    }
  ]

  return (
    <>
      <StyledDrawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? nav : true}
        onClose={() => setNav(false)}
      >
        {/* Logo */}
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <Image
            src="/Logo/HOR.LOGO-BLUE.png"
            alt="macronics"
            width={150}
            height={40}
            style={{ objectFit: 'contain' }}
          />
        </Box>

        <List sx={{ p: 2 }}>
          {menuItems.map((item) => (
            <Box key={item.title}>
              {item.subItems ? (
                // Menu item with dropdown
                <MenuItem
                  onClick={(e) => handleDropdownClick(e, item.id)}
                  active={activeDropdown === item.id}
                  sx={{ 
                    position: 'relative',
                    pr: 4
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  <FaChevronRight 
                    style={{
                      position: 'absolute',
                      right: 16,
                      transform: activeDropdown === item.id ? 'rotate(90deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </MenuItem>
              ) : (
                // Regular menu item
                <Link href={item.href} style={{ textDecoration: 'none' }}>
                  <MenuItem active={pathname === item.href}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </MenuItem>
                </Link>
              )}

              {/* Dropdown Menu */}
              {item.subItems && (
                <Popper
                  open={activeDropdown === item.id}
                  anchorEl={dropdownAnchor}
                  placement="right-start"
                  transition
                  style={{ zIndex: 1300 }}
                  modifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 0],
                      },
                    },
                  ]}
                >
                  {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                      <DropdownPaper>
                        <ClickAwayListener onClickAway={handleDropdownClose}>
                          <List>
                            {item.subItems.map((subItem) => (
                              <Link 
                                key={subItem.title} 
                                href={subItem.href}
                                style={{ textDecoration: 'none' }}
                              >
                                <MenuItem 
                                  active={pathname === subItem.href}
                                  onClick={handleDropdownClose}
                                >
                                  <ListItemText primary={subItem.title} />
                                </MenuItem>
                              </Link>
                            ))}
                          </List>
                        </ClickAwayListener>
                      </DropdownPaper>
                    </Grow>
                  )}
                </Popper>
              )}
            </Box>
          ))}
        </List>
      </StyledDrawer>

      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          onClick={() => setNav(!nav)}
          sx={{
            position: 'fixed',
            right: 16,
            top: 16,
            zIndex: theme.zIndex.drawer + 2,
            bgcolor: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            '&:hover': {
              bgcolor: 'white',
            }
          }}
        >
          {nav ? <MdCancel size={24} /> : <AiOutlineMenu size={24} />}
        </IconButton>
      )}
    </>
  )
}

export default Navbar