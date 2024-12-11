import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

const LinkContactToDealForm = () => {
  const [contactId, setContactId] = useState('');
  const [dealId, setDealId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/hubspot/link_contact_deak/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact_id: contactId,
          deal_id: dealId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
      } else {
        setError(data.error || 'An error occurred');
        setMessage('');
      }
    } catch (err) {
      setError('An error occurred while linking the contact to the deal');
      setMessage('');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Link Contact to Deal
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Contact ID"
            variant="outlined"
            fullWidth
            value={contactId}
            onChange={(e) => setContactId(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Deal ID"
            variant="outlined"
            fullWidth
            value={dealId}
            onChange={(e) => setDealId(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Link
          </Button>
        </form>
        {message && (
          <Typography variant="body1" color="success.main" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error.main" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LinkContactToDealForm;
