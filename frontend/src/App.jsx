import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './compents/sidebar';
import TableContact from './compents/tablecontact';
import DealsComponent from './compents/tabledeals';
import Navbar from './compents/navbar';
import LinkContactToDealForm from './compents/linkdealwithcontact';
import Login from './compents/login';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <div style={{ flex: 1 }}>
                <Navbar />
                <div style={{ padding: '20px' }}>
                  <Routes>
                    <Route path="/contacts" element={<TableContact />} />
                    <Route path="/deals" element={<DealsComponent />} />
                    <Route path="/link-deal-contact" element={<LinkContactToDealForm />} />
                    <Route path="/" element={<div>Welcome to the Dashboard</div>} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
