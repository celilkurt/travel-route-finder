import React, { useState, useEffect } from 'react';
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
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {searchLocations, saveLocation, updateLocation, deleteLocation} from '../api/LocationAPI';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LocationPage = () => {
  
  const [records, setRecords] = useState([]);
  const [totalRecordCount, setTotalRecordCount] = useState(0);

  
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [locationCode, setLocationCode] = useState('');

  
  const [editingRecordId, setEditingRecordId] = useState(null);

  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  
  const fetchLocationRecords = async () => {
    setIsLoading(true);
    try {
      const response = await searchLocations({
        pageNumber: page,
        pageSize: rowsPerPage,
        name: name || undefined, 
        city: city || undefined,
        locationCode: locationCode || undefined,
      });
      console.log(response);
      setRecords(response.data);
      setTotalRecordCount(response.totalCount);
    } catch (error) {
      console.error('Failed to fetch location records:', error);
      setSnackbarMessage('Failed to load locations. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    fetchLocationRecords();
  }, [page, rowsPerPage]); 

  
  const handleCrudSubmit = async (event) => {
    event.preventDefault();

    
    if (!name || !city || !locationCode) {
      setSnackbarMessage('Name, City, and Location Code are required for adding/updating records.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const locationData = { name, city, locationCode };

      if (editingRecordId) {
        const updatedLocation = { id: editingRecordId, ...locationData };
        await updateLocation(updatedLocation);
        setSnackbarMessage('Location updated successfully!');
        setSnackbarSeverity('success');
      } else {
        await saveLocation(locationData);
        setSnackbarMessage('Location added successfully!');
        setSnackbarSeverity('success');
      }
      setSnackbarOpen(true);
      handleClearForm(); 
      await fetchLocationRecords(); 
    } catch (error) {
      console.error('Failed to save location:', error);
      setSnackbarMessage('Failed to save location. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleSearchSubmit = async () => {
    setPage(0); 
    await fetchLocationRecords(); 
  };

  
  const handleClearForm = () => {
    setName('');
    setCity('');
    setLocationCode('');
    setEditingRecordId(null);
    setPage(0); 
  };

  
  const handleEdit = (record) => {
    setName(record.name);
    setCity(record.city);
    setLocationCode(record.locationCode);
    setEditingRecordId(record.id);
  };

  
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await deleteLocation(id);
      if (Object.hasOwn(response, 'errorMessage')) {
        printErrorMessage('Failed to delete location: ' + response.errorMessage);
        return;
      }
      setSnackbarMessage('Location deleted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      await fetchLocationRecords(); 
      
      if (records.length === 1 && page > 0) {
        setPage(prevPage => prevPage - 1);
      }
    } catch (error) {
      console.error('Failed to delete location:', error);
      printErrorMessage('Failed to delete location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const printErrorMessage = (message) => {
    
    setSnackbarMessage(message);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  }

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'green.50', borderRadius: 2, boxShadow: 1, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
        Location Records
      </Typography>


      <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '100%', sm: '80%', md: 'medium' }, mb: 4, p: 3, border: '1px solid #ccc', borderRadius: 2, bgcolor: 'white' }}>
        <Typography variant="body1" gutterBottom>
          {editingRecordId ? 'Edit Location' : 'Add New Location / Search'}
        </Typography>

        <TextField
          label="Location Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          size="small" 
        />
        <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
          size="small" 
        />
        <TextField
          label="Location Code"
          variant="outlined"
          value={locationCode}
          onChange={(e) => setLocationCode(e.target.value)}
          disabled={isLoading}
          size="small" 
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          {editingRecordId ? (
            
            <>
              <Button type="button" variant="contained" color="primary" onClick={handleCrudSubmit} disabled={isLoading} sx={{ flexGrow: 1 }} size="small">
                {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Update Location'} 
              </Button>
              <Button type="button" variant="outlined" color="secondary" onClick={handleClearForm} disabled={isLoading} sx={{ flexGrow: 1 }} size="small">
                Cancel Edit
              </Button>
            </>
          ) : (
            
            <>
              <Button type="button" variant="contained" color="info" onClick={handleSearchSubmit} disabled={isLoading} sx={{ flexGrow: 1 }} size="small">
                {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Search Locations'}
              </Button>
              <Button type="button" variant="outlined" color="primary" onClick={handleCrudSubmit} disabled={isLoading} sx={{ flexGrow: 1 }} size="small">
                Add New Location
              </Button>
            </>
          )}
        </Box>
      </Box>

      {isLoading && records.length === 0 && totalRecordCount === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading locations...</Typography>
        </Box>
      ) : records.length > 0 ? (
        <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 800, mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="location records table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>City</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow
                  key={record.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {record.name}
                  </TableCell>
                  <TableCell>{record.city}</TableCell>
                  <TableCell>{record.locationCode}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit" onClick={() => handleEdit(record)} disabled={isLoading}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(record.id)} disabled={isLoading}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRecordCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 4 }}>
          No location records found.
        </Typography>
      )}


      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LocationPage;
