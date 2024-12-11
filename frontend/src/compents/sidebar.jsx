import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import { logoutUser } from '../services/logout'; // Import the logout service

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const isLoggedOut = await logoutUser(); // Call the logout service

      if (isLoggedOut) {
        alert('Logout successful!');
        navigate('/'); // Redirect to the homepage or login page
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          backgroundColor: '#333',
          color: '#fff',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div style={{ padding: '20px' }}>
        <Typography variant="h6" color="white" gutterBottom>
          Sidebar
        </Typography>
      </div>

      <List>
        <ListItem button component={Link} to="/contacts" style={{ color: 'white' }}>
          <ListItemText primary="Contacts" />
        </ListItem>
        <ListItem button component={Link} to="/deals" style={{ color: 'white' }}>
          <ListItemText primary="Deals" />
        </ListItem>
        <ListItem button component={Link} to="/link-deal-contact" style={{ color: 'white' }}>
          <ListItemText primary="Link Contact with Deals" />
        </ListItem>
        <ListItem>
          <Button
            onClick={handleLogout}
            fullWidth
            variant="text"
            color="inherit"
            sx={{
              textTransform: 'none',
              justifyContent: 'flex-start',
            }}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
