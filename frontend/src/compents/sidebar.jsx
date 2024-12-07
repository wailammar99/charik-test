import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/hubspot/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Logout successful!');
        window.location.href = '/login'; // Redirect to the homepage or login page
      } else {
        alert('Logout failed.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred during logout.');
    }
  };

  return (
    <div style={{ width: '200px', background: '#333', color: '#fff', height: '100vh', padding: '10px' }}>
      <h2>Dashboard</h2>
      <nav>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/contacts" style={{ color: '#fff', textDecoration: 'none' }}>
              Contacts
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/deals" style={{ color: '#fff', textDecoration: 'none' }}>
              Deals
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/link-deal-contact" style={{ color: '#fff', textDecoration: 'none' }}>
              Link Contact with Deals
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              style={{
                color: '#fff',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
