import React from 'react';
import { Box, Typography } from '@mui/material'; // Import Material-UI components
import '../styles/Footer.css'
const Footer = () => {
  return (
    <Box className="footer">
      <Typography variant="body2" sx={{font:"inherit"}}>Copyright &copy; Movie DB {new Date().getFullYear()}</Typography>
    </Box>
  );
}

export default Footer;