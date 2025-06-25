import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import TransportationPage from './pages/TransportationPage';
import LocationPage from './pages/LocationPage';
import RoutePage from './pages/RoutePage';


const drawerWidth = 240; 


const App = () => {
  
  const [currentPage, setCurrentPage] = useState('transportation'); 

  
  const renderPage = () => {
    switch (currentPage) {
      case 'transportation':
        return <TransportationPage />;
      case 'location':
        return <LocationPage />;
      case 'route':
        return <RoutePage />;
      default:
        return <TransportationPage />; 
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#333' }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            My Awesome Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#666', color: 'white' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
            My App
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setCurrentPage('transportation')} selected={currentPage === 'transportation'}>
                <ListItemText primary="Transportation" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setCurrentPage('location')} selected={currentPage === 'location'}>
                <ListItemText primary="Location" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setCurrentPage('route')} selected={currentPage === 'route'}>
                <ListItemText primary="Route" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, bgcolor: 'background.default', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
        {renderPage()}
      </Box>
    </Box>
  );
};

export default App;
