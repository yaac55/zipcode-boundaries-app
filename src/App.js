import React, { useState } from 'react';
import Map from './components/Map';
import { TextField, Button, CircularProgress, Alert } from '@mui/material';
import './App.css';
import { fetchZipCodeBoundary } from './services/boundaryService';

const App = () => {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geoJson, setGeoJson] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchZipCodeBoundary(zipCode);
      if(data.features.length === 0){
        setError('Invalid Zipcode or failed to fetch data.');
        return
      }  
      setGeoJson(data);
    } catch (err) {
      setError('Error API');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="app-container">
      <form className="zip-form" onSubmit={handleSubmit}>
        <TextField
          placeholder="Zip code"
          variant="outlined"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
          className="input"
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Submit
        </Button>
      </form>

      {loading && (
        <div className="spinner-overlay">
          <CircularProgress />
        </div>
      )}

      {error && <Alert severity="error"  className="error">{error}</Alert>}

      <Map geoJson={geoJson} />
    </div>
  );
};

export default App;
