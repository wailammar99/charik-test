const CONTACTS_API_URL = 'http://localhost:8000/hubspot/contacts'; // 


export const getContacts = async () => {
  try {
    const response = await fetch(CONTACTS_API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

// Service for fetching deals
const DEALS_API_URL = 'http://localhost:8000/hubspot/deals'; 

export const getDeals = async () => {
  try {
    const response = await fetch(DEALS_API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching deals:", error);
    throw error;
  }
};
