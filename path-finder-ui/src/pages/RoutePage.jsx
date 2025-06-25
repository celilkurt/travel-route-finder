import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog'; 
import DialogTitle from '@mui/material/DialogTitle'; 
import DialogContent from '@mui/material/DialogContent'; 
import DialogActions from '@mui/material/DialogActions'; 
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; 

import {searchLocations} from '../api/LocationAPI';
import {searchRoutes} from '../api/RouteAPI';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const RoutePage = () => {
  
  const [originLocation, setOriginLocation] = useState(null); 
  const [destinationLocation, setDestinationLocation] = useState(null); 
  const [routeDate, setRouteDate] = useState(''); 

  
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [originLoading, setOriginLoading] = useState(false);
  const [destinationLoading, setDestinationLoading] = useState(false);

  
  const [routes, setRoutes] = useState([]);

  
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);


  
  const originSearchTimeout = useRef(null);
  const destinationSearchTimeout = useRef(null);

  
  const fetchRouteRecords = async () => {
    setIsLoading(true);
    try {
      const response = await searchRoutes({
        originLocationId: originLocation ? originLocation.id : undefined,
        destinationLocationId: destinationLocation ? destinationLocation.id : undefined,
        date: routeDate || undefined,
      });
      setRoutes(response.map(route => ({segments: [route.firstSegment, route.secondSegment, route.thirdSegment].filter((segment) => segment !== null)})));
      setSnackbarMessage('Routes fetched successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Failed to fetch routes:', error);
      setSnackbarMessage('Failed to load routes. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

  
  const handleSearchSubmit = async () => {
    await fetchRouteRecords(); 
  };

  
  const handleClearForm = () => {
    setOriginLocation(null);
    setDestinationLocation(null);
    setRouteDate('');
    fetchRouteRecords(); 
  };

  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  
  const handleLocationInputChange = (newInputValue, setLocationState, setOptionsState, setLoadingState, timeoutRef) => {
    
    if (newInputValue !== null) {
      setLocationState(prev => ({ ...prev, locationCode: newInputValue }));
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (newInputValue && newInputValue.length >= 2) {
      setLoadingState(true);
      timeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchLocations({locationCode: newInputValue});
          setOptionsState(results.data);
        } catch (error) {
          console.error('Error searching locations:', error);
          setOptionsState([]);
        } finally {
          setLoadingState(false);
        }
      }, 300); 
    } else {
      setOptionsState([]); 
      if (newInputValue === '') {
        setLocationState(null); 
      }
    }
  };

  
  const handleRowClick = (route) => {
    setSelectedRoute(route);
    setIsDetailModalOpen(true);
  };

  
  const handleCloseDetailModal = () => {
    setSelectedRoute(null);
    setIsDetailModalOpen(false);
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'purple.50', borderRadius: 2, boxShadow: 1, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Route Search
      </Typography>

      <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 500, mb: 4, p: 3, border: '1px solid #ccc', borderRadius: 2, bgcolor: 'white' }}>
        <Typography variant="h6" gutterBottom>
          Search Routes
        </Typography>

        <Autocomplete
          options={originOptions}
          getOptionLabel={(option) => option.locationCode || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={originLocation}
          onChange={(event, newValue) => setOriginLocation(newValue)}
          onInputChange={(event, newInputValue) => handleLocationInputChange(newInputValue, setOriginLocation, setOriginOptions, setOriginLoading, originSearchTimeout)}
          loading={originLoading}
          disabled={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Origin Location Code"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {originLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <Autocomplete
          options={destinationOptions}
          getOptionLabel={(option) => option.locationCode || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={destinationLocation}
          onChange={(event, newValue) => setDestinationLocation(newValue)}
          onInputChange={(event, newInputValue) => handleLocationInputChange(newInputValue, setDestinationLocation, setDestinationOptions, setDestinationLoading, destinationSearchTimeout)}
          loading={destinationLoading}
          disabled={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Destination Location Code"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {destinationLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <TextField
          label="Date (YYYY-MM-DD)"
          variant="outlined"
          value={routeDate}
          onChange={(e) => setRouteDate(e.target.value)}
          disabled={isLoading}
          type="date" 
          InputLabelProps={{ shrink: true }} 
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <Button type="button" variant="contained" color="info" onClick={handleSearchSubmit} disabled={isLoading} sx={{ flexGrow: 1 }}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search Routes'}
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={handleClearForm} disabled={isLoading} sx={{ flexGrow: 1 }}>
            Clear Search
          </Button>
        </Box>
      </Box>

      {isLoading && routes.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading routes...</Typography>
        </Box>
      ) : routes.length > 0 ? (
        <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 800, mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="route records table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Segments</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {routes.map((route) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                  onClick={() => handleRowClick(route)} 
                >
                  <TableCell>{"no date"}</TableCell>
                  <TableCell>
                    {route.segments.map((segment, index) => (
                      <div key={index}>
                        <Typography variant="body2">
                          {segment.originName} &rarr; {segment.destinationName} ({segment.transportationType})
                        </Typography>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={(e) => { e.stopPropagation(); handleRowClick(route); }}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 4 }}>
          No routes found matching your criteria.
        </Typography>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={isDetailModalOpen} onClose={handleCloseDetailModal} maxWidth="md" fullWidth>
        <DialogTitle>Route Details - {selectedRoute?.id} on {selectedRoute?.date}</DialogTitle>
        <DialogContent dividers>
          {selectedRoute && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>Segments Overview:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                {selectedRoute.segments.map((segment, index) => (
                  <React.Fragment key={index}>
                    <Box sx={{
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      p: 2,
                      minWidth: '150px',
                      textAlign: 'center',
                      bgcolor: '#f0f0f0',
                      boxShadow: 1
                    }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{segment.originName}</Typography>
                      <Typography variant="body2">to</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{segment.destinationName}</Typography>
                      <Typography variant="caption" color="text.secondary">{segment.transportationType}</Typography>
                    </Box>
                    {index < selectedRoute.segments.length - 1 && (
                      <ArrowForwardIcon sx={{ mx: 2, fontSize: '3rem', color: 'primary.main' }} />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoutePage;
