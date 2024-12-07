import React, { useState } from 'react';

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
    <div>
      <h2>Link Contact to Deal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contact ID:</label>
          <input
            type="text"
            value={contactId}
            onChange={(e) => setContactId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Deal ID:</label>
          <input
            type="text"
            value={dealId}
            onChange={(e) => setDealId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Link</button>
      </form>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LinkContactToDealForm;
