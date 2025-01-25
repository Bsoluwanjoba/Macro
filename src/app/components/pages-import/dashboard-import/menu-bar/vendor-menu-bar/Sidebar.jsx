'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
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
  useMediaQuery
} from "@mui/material"
import { 
  MdSpaceDashboard, 
  MdProductionQuantityLimits,
  MdCancel,
  MdStorefront,
  MdAnalytics,
  MdSettings,
} from "react-icons/md"
import { 
  FaChevronUp, 
  FaChevronDown,
  FaBoxOpen,
  FaMoneyBillWave,
} from "react-icons/fa"
import { RiListOrdered2 } from "react-icons/ri"
import { BiSolidReport } from "react-icons/bi"
import { AiOutlineMenu } from 'react-icons/ai'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io"

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: 'white',
    width: 250,
    transition: 'width 0.3s ease',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 280,
    },
  },
}));

const DropdownPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  left: '100%',
  top: 0,
  marginLeft: '10px',
  padding: theme.spacing(1),
  backgroundColor: 'white',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  minWidth: '150px',
  zIndex: 1000,
  [theme.breakpoints.down('md')]: {
    position: 'static',
    marginLeft: 0,
    marginTop: theme.spacing(1),
    width: '100%',
  },
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

function VendorSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [productsOpen, setProductsOpen] = useState(false)
  const [storeOpen, setStoreOpen] = useState(false)
  const [nav, setNav] = useState(false)
  const [dropdownAnchor, setDropdownAnchor] = useState(null)
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  // Auto-close sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [isMobile])

  // Close mobile nav when route changes
  const pathname = usePathname()
  useEffect(() => {
    if (isMobile) {
      setNav(false)
    }
  }, [pathname, isMobile])

  const handleNav = () => setIsOpen(!isOpen)
  const toggleProducts = () => setProductsOpen(!productsOpen)
  const toggleStore = () => setStoreOpen(!storeOpen)
  const handleMobileNav = () => setNav(!nav)

  const isLinkActive = (href) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  const menuItems = [
    { 
      icon: <MdSpaceDashboard size={25} />, 
      text: 'Dashboard', 
      href: '/pages/vendor/dashboard' 
    },
    { 
      icon: <MdStorefront size={25} />, 
      text: 'My Store',
      hasDropdown: true,
      dropdownItems: [
        { text: 'Store Profile', href: '/pages/vendor/store/profile' },
        { text: 'Store Settings', href: '/pages/vendor/store/settings' }
      ]
    },
    { 
      icon: <MdProductionQuantityLimits size={25} />, 
      text: 'Products',
      hasDropdown: true,
      dropdownItems: [
        { text: 'All Products', href: '/pages/vendor/products' },
        { text: 'Add Product', href: '/pages/vendor/products/add' },
        { text: 'Categories', href: '/pages/vendor/products/categories' }
      ]
    },
    { 
      icon: <RiListOrdered2 size={25} />, 
      text: 'Orders', 
      href: '/pages/vendor/orders' 
    },
    { 
      icon: <FaMoneyBillWave size={25} />, 
      text: 'Earnings', 
      href: '/pages/vendor/earnings' 
    },
    { 
      icon: <MdAnalytics size={25} />, 
      text: 'Analytics', 
      href: '/pages/vendor/analytics' 
    },
    { 
      icon: <BiSolidReport size={25} />, 
      text: 'Reports', 
      href: '/pages/vendor/reports' 
    },
    { 
      icon: <MdSettings size={25} />, 
      text: 'Settings', 
      href: '/pages/vendor/settings' 
    },
  ]

  return (
    <>
      {/* Mobile Header */}
      <Box sx={{ 
        display: { md: 'none' }, 
        position: 'fixed', 
        top: 0, 
        right: 0, 
        zIndex: 1100, 
        p: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(5px)',
        width: isSmallScreen ? '100%' : 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
        boxShadow: nav ? 'none' : '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        <IconButton 
          onClick={handleMobileNav} 
          sx={{ 
            color: '#0ac',
            mr: isSmallScreen ? 1 : 2,
          }}
        >
          {nav ? <MdCancel size={isSmallScreen ? 28 : 38} /> : <AiOutlineMenu size={isSmallScreen ? 24 : 32} />}
        </IconButton>
      </Box>

      {/* Mobile Navigation */}
      <StyledDrawer
        variant="temporary"
        anchor={isSmallScreen ? "bottom" : "right"}
        open={nav}
        onClose={handleMobileNav}
        sx={{ 
          display: { md: 'none' },
          '& .MuiDrawer-paper': {
            height: isSmallScreen ? '90vh' : '100vh',
            borderTopLeftRadius: isSmallScreen ? '16px' : 0,
            borderTopRightRadius: isSmallScreen ? '16px' : 0,
          }
        }}
      >
        <List sx={{ 
          pt: isSmallScreen ? 4 : 8, 
          px: isSmallScreen ? 1 : 2,
          overflowY: 'auto',
          height: '100%',
        }}>
          {/* Drag handle for mobile */}
          {isSmallScreen && (
            <Box 
              sx={{ 
                width: '40px', 
                height: '4px', 
                backgroundColor: '#ddd', 
                borderRadius: '2px',
                margin: '0 auto',
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
              }} 
            />
          )}
          
          {menuItems.map((item, index) => (
            <Box key={index}>
              {item.hasDropdown ? (
                <>
                  <MenuItem 
                    onClick={() => item.text === 'Products' ? toggleProducts() : toggleStore()}
                    sx={{
                      flexWrap: 'nowrap',
                      '& .MuiListItemText-root': {
                        flex: 'none',
                        mr: 1,
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{
                        style: {
                          fontSize: isSmallScreen ? '0.9rem' : '1rem',
                          whiteSpace: 'nowrap',
                        }
                      }}
                    />
                    {(item.text === 'Products' ? productsOpen : storeOpen) ? 
                      <FaChevronUp size={isSmallScreen ? 12 : 15} /> : 
                      <FaChevronDown size={isSmallScreen ? 12 : 15} />
                    }
                  </MenuItem>
                  <Collapse in={item.text === 'Products' ? productsOpen : storeOpen}>
                    <List 
                      component="div" 
                      disablePadding 
                      sx={{ 
                        pl: isSmallScreen ? 2 : 4,
                        '& .MuiListItem-root': {
                          py: isSmallScreen ? 0.5 : 1,
                        },
                      }}
                    >
                      {item.dropdownItems.map((dropItem, idx) => (
                        <MenuItem
                          key={idx}
                          component={Link}
                          href={dropItem.href}
                          active={isLinkActive(dropItem.href)}
                          sx={{
                            pl: isSmallScreen ? 2 : 3,
                          }}
                        >
                          <ListItemText 
                            primary={dropItem.text}
                            primaryTypographyProps={{
                              style: {
                                fontSize: isSmallScreen ? '0.85rem' : '0.9rem',
                              }
                            }}
                          />
                        </MenuItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <MenuItem
                  component={Link}
                  href={item.href}
                  active={isLinkActive(item.href)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      style: {
                        fontSize: isSmallScreen ? '0.9rem' : '1rem',
                      }
                    }}
                  />
                </MenuItem>
              )}
            </Box>
          ))}
        </List>
      </StyledDrawer>

      {/* Desktop Navigation */}
      <StyledDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: isOpen ? 250 : 70,
            overflowX: 'hidden',
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          p: 2, 
          mt: 5,
          minHeight: '48px',
        }}>
          <IconButton 
            onClick={handleNav} 
            sx={{ 
              color: '#0ac',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            {isOpen ? <IoIosArrowDropleftCircle size={27} /> : <IoIosArrowDroprightCircle size={27} />}
          </IconButton>
        </Box>
        
        <List sx={{ px: 2 }}>
          {menuItems.map((item, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              {item.hasDropdown ? (
                <MenuItem
                  onMouseEnter={(e) => {
                    if (!isOpen) setDropdownAnchor(e.currentTarget)
                  }}
                  onMouseLeave={() => {
                    if (!isOpen) setDropdownAnchor(null)
                  }}
                  onClick={() => {
                    if (isOpen) {
                      item.text === 'Products' ? toggleProducts() : toggleStore()
                    }
                  }}
                  sx={{
                    minHeight: '48px',
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {isOpen && (
                    <>
                      <ListItemText primary={item.text} />
                      {(item.text === 'Products' ? productsOpen : storeOpen) ? 
                        <FaChevronUp size={15} /> : 
                        <FaChevronDown size={15} />
                      }
                    </>
                  )}
                </MenuItem>
              ) : (
                <MenuItem
                  component={Link}
                  href={item.href}
                  active={isLinkActive(item.href)}
                  sx={{
                    minHeight: '48px',
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {isOpen && <ListItemText primary={item.text} />}
                </MenuItem>
              )}
              
              {/* Dropdown for collapsed sidebar */}
              {!isOpen && dropdownAnchor && item.hasDropdown && (
                <DropdownPaper>
                  {item.dropdownItems.map((dropItem, idx) => (
                    <MenuItem
                      key={idx}
                      component={Link}
                      href={dropItem.href}
                      active={isLinkActive(dropItem.href)}
                      sx={{
                        minHeight: '40px',
                      }}
                    >
                      <ListItemText primary={dropItem.text} />
                    </MenuItem>
                  ))}
                </DropdownPaper>
              )}
              
              {/* Dropdown for expanded sidebar */}
              {isOpen && item.hasDropdown && (
                <Collapse in={item.text === 'Products' ? productsOpen : storeOpen}>
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    {item.dropdownItems.map((dropItem, idx) => (
                      <MenuItem
                        key={idx}
                        component={Link}
                        href={dropItem.href}
                        active={isLinkActive(dropItem.href)}
                        sx={{
                          minHeight: '40px',
                        }}
                      >
                        <ListItemText primary={dropItem.text} />
                      </MenuItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </StyledDrawer>
    </>
  )
}

export default VendorSidebar
