import React, { useEffect, useState } from 'react';
import { getDeals } from '../services/hubSpotService';
import { CircularProgress, Typography, Paper, Box, TextField } from '@mui/material';

const DealsComponent = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDeals();
        setDeals(data.results); // Assuming the response structure includes `results`
        setFilteredDeals(data.results);
        setLoading(false);
      } catch (error) {
        setError("Failed to load deals");
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = deals.filter((deal) =>
      deal.properties.dealname.toLowerCase().includes(query)
    );
    setFilteredDeals(filtered);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: '20px' }}>
          Loading Deals...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Paper style={{ padding: '20px', backgroundColor: '#f44336', color: 'white', textAlign: 'center' }}>
        <Typography variant="h6">{error}</Typography>
      </Paper>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Deals
      </Typography>
      
      {/* Search Field */}
      <TextField
        label="Search Deals"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        style={{ marginBottom: '20px' }}
      />

      {filteredDeals.length > 0 ? (
        <Paper style={{ padding: '10px' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: '12px', backgroundColor: '#f4f4f4', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '12px', backgroundColor: '#f4f4f4', textAlign: 'left' }}>Deal Name</th>
                <th style={{ padding: '12px', backgroundColor: '#f4f4f4', textAlign: 'left' }}>Amount</th>
                <th style={{ padding: '12px', backgroundColor: '#f4f4f4', textAlign: 'left' }}>Close Date</th>
                <th style={{ padding: '12px', backgroundColor: '#f4f4f4', textAlign: 'left' }}>Stage</th>
                <th style={{ padding: '12px', backgroundColor: '#f4f4f4', textAlign: 'left' }}>Pipeline</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal) => (
                <tr key={deal.id}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>{deal.id}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>{deal.properties.dealname}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>${deal.properties.amount}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>
                    {new Date(deal.properties.closedate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>{deal.properties.dealstage}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>{deal.properties.pipeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      ) : (
        <div>No deals available.</div>
      )}
    </div>
  );
};

export default DealsComponent;
