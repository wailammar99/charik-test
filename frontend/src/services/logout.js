// src/services/authService.js
export const logoutUser = async () => {
    try {
      const response = await fetch('http://localhost:8000/hubspot/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Logout failed.');
      }
  
      return response.ok;
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('An error occurred during logout.');
    }
  };
  