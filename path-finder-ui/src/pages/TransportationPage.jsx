import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
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
import Autocomplete from '@mui/material/Autocomplete';

import {fetchTransportationTypes, searchRecords, deleteRecord, addRecord, updateRecord} from '../api/TransportationAPI';
import {searchLocations} from '../api/LocationAPI';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const TransportationPage = () => {
  
  const [records, setRecords] = useState([]);
  
  const [totalRecordCount, setTotalRecordCount] = useState(0);
  
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [transportationType, setTransportationType] = useState('');
  
  const [editingRecordId, setEditingRecordId] = useState(null);
  
  const [availableTypes, setAvailableTypes] = useState([]);
  
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [originLoading, setOriginLoading] = useState(false);
  const [destinationLoading, setDestinationLoading] = useState(false);

  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  
  const originSearchTimeout = useRef(null);
  const destinationSearchTimeout = useRef(null);

  
  const fetchTransportationRecords = async () => {
    setIsLoading(true);
    try {
      
      
      const response = await searchRecords({
        pageNumber: page,
        pageSize: rowsPerPage,
        originLocation: originLocation ? {id: originLocation.id} : undefined,
        destinationLocation: destinationLocation ? {id: destinationLocation.id} : undefined,
        transportationType: transportationType || undefined,
      });
      setRecords(response.data);
      setTotalRecordCount(response.totalCount);
    } catch (error) {
      console.error('Failed to fetch records:', error);
      setSnackbarMessage('Failed to load records. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const types = await fetchTransportationTypes();
        setAvailableTypes(types);
        
        await fetchTransportationRecords();
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        setSnackbarMessage('Failed to load initial data.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []); 

  
  const handleCrudSubmit = async (event) => {
    event.preventDefault(); 

    
    if (!originLocation || !destinationLocation || !transportationType || !originLocation.id || !destinationLocation.id) {
      setSnackbarMessage('Origin, Destination, and Transportation Type are required for adding/updating records.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const recordBody = {
        originLocationId: originLocation.id,
        destinationLocationId: destinationLocation.id,
        transportationType: transportationType,
      };

      if (editingRecordId) {
        const updatedRecord = {
          id: editingRecordId,
          ...recordBody
        };
        await updateRecord(updatedRecord);
        setSnackbarMessage('Record updated successfully!');
        setSnackbarSeverity('success');
      } else {
        await addRecord(recordBody);
        setSnackbarMessage('Record added successfully!');
        setSnackbarSeverity('success');
      }
      setSnackbarOpen(true);
      setEditingRecordId(null); 
      handleClearForm(); 
      await fetchTransportationRecords(); 
    } catch (error) {
      console.error('Failed to save record:', error);
      setSnackbarMessage('Failed to save record. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClearForm = () => {

    setOriginLocation(null);
    setDestinationLocation(null);
    setTransportationType('');
    setEditingRecordId(null);
    setPage(0); 
  };

  const handleEdit = (record) => {
    setOriginLocation({ id: record.originLocation.id, locationCode: record.originLocation.locationCode });
    setDestinationLocation({ id: record.destinationLocation.id, locationCode: record.destinationLocation.locationCode });
    setTransportationType(record.transportationType);
    setEditingRecordId(record.id);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await deleteRecord(id);
      setSnackbarMessage('Record deleted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      await fetchTransportationRecords(); 
      
    } catch (error) {
      console.error('Failed to delete record:', error);
      setSnackbarMessage('Failed to delete record. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchTransportationRecords(); 
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
    fetchTransportationRecords(); 
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

  return (
    <Box sx={{ p: 3, bgcolor: 'blue.50', borderRadius: 2, boxShadow: 1, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Transportation Records
      </Typography>

      <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 500, mb: 4, p: 3, border: '1px solid #ccc', borderRadius: 2, bgcolor: 'white' }}>
        <Typography variant="h6" gutterBottom>
          {editingRecordId ? 'Edit Record' : 'Add New Record / Search'}
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
              label="Origin Location"
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
              label="Destination Location"
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
        <FormControl fullWidth disabled={isLoading}>
          <InputLabel id="transportation-type-label">Transportation Type</InputLabel>
          <Select
            labelId="transportation-type-label"
            id="transportation-type-select"
            value={transportationType}
            label="Transportation Type"
            onChange={(e) => setTransportationType(e.target.value)}
            
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {availableTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          {editingRecordId ? (
            
            <>
              <Button type="button" variant="contained" color="primary" onClick={handleCrudSubmit} disabled={isLoading} sx={{ flexGrow: 1 }}>
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Update Record'}
              </Button>
              <Button type="button" variant="outlined" color="secondary" onClick={handleClearForm} disabled={isLoading} sx={{ flexGrow: 1 }}>
                Cancel Edit
              </Button>
            </>
          ) : (
            
            <>
              <Button type="button" variant="contained" color="info" onClick={fetchTransportationRecords} disabled={isLoading} sx={{ flexGrow: 1 }}>
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search Records'}
              </Button>
              <Button type="button" variant="outlined" color="primary" onClick={handleCrudSubmit} disabled={isLoading} sx={{ flexGrow: 1 }}>
                Add New Record
              </Button>
            </>
          )}
        </Box>
      </Box>

      {isLoading && records.length === 0 && totalRecordCount === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading records...</Typography>
        </Box>
      ) : records.length > 0 ? (
        <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 800, mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="transportation records table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Origin</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Destination</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
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
                    {record.originLocation.locationCode + '(' + record.originLocation.name + ')'}
                  </TableCell>
                  <TableCell>{record.destinationLocation.locationCode + '(' + record.destinationLocation.name + ')'}</TableCell>
                  <TableCell>{record.transportationType}</TableCell>
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
          No transportation records found.
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

export default TransportationPage;
