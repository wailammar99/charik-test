import React, { useEffect, useState } from 'react';
import { getContacts } from '../services/hubSpotService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Alert, TextField } from '@mui/material';

const TableContact = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data.results);
        setFilteredContacts(data.results); // Initially set the filtered contacts to all contacts
        setLoading(false);
      } catch (err) {
        setError("Failed to load contacts");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter contacts based on the search query
    const filtered = contacts.filter((contact) => {
      const firstName = contact.properties.firstname.toLowerCase();
      const lastName = contact.properties.lastname.toLowerCase();
      const email = contact.properties.email.toLowerCase();
      return firstName.includes(query) || lastName.includes(query) || email.includes(query);
    });

    setFilteredContacts(filtered);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Contact List
      </Typography>

      <TextField
        label="Search Contacts"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="contact table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.id}</TableCell>
                <TableCell>{contact.properties.firstname}</TableCell>
                <TableCell>{contact.properties.lastname}</TableCell>
                <TableCell>{contact.properties.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableContact;
