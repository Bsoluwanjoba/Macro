import { Box, IconButton, Typography, styled } from '@mui/material';
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#0ac',
    transform: 'translateY(-3px)',
  },
}));

const socialLinks = [
  { icon: <FaLinkedin size={24} />, href: '/', label: 'LinkedIn' },
  { icon: <FaTwitter size={24} />, href: '/', label: 'Twitter' },
  { icon: <FaFacebook size={24} />, href: '/', label: 'Facebook' },
  { icon: <FaInstagram size={24} />, href: '/', label: 'Instagram' },
];

export default function SocialIcons() {
  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'white',
          fontWeight: 600,
          letterSpacing: '0.1em',
          mb: 2
        }}
      >
        Social Media Links:
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          gap: { xs: 1, sm: 2 },
          flexWrap: 'wrap'
        }}
      >
        {socialLinks.map((link) => (
          <SocialIconButton
            key={link.label}
            component={Link}
            href={link.href}
            aria-label={link.label}
          >
            {link.icon}
          </SocialIconButton>
        ))}
      </Box>
    </Box>
  );
}
