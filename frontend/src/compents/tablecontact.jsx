import React, { useEffect, useState } from 'react';
import { getContacts } from '../services/hubSpotService';

const TableContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data.results);
        setLoading(false);
      } catch (err) {
        setError("Failed to load contacts");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Contact List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.properties.firstname}</td>
              <td>{contact.properties.lastname}</td>
              <td>{contact.properties.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableContact;
