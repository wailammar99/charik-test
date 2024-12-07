import React, { useEffect, useState } from 'react';
import { getDeals } from '../services/hubSpotService';

const DealsComponent = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDeals();
        setDeals(data.results); // Assuming the response structure includes `results`
        setLoading(false);
      } catch (error) {
        setError("Failed to load deals");
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Deals</h2>
      {deals.length > 0 ? (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
            <th>id</th>
              <th>Deal Name</th>
              <th>Amount</th>
              <th>Close Date</th>
              <th>Stage</th>
              <th>Pipeline</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id}>
                <td>{deal.id}</td>
                <td>{deal.properties.dealname}</td>
                <td>${deal.properties.amount}</td>
                <td>{new Date(deal.properties.closedate).toLocaleDateString()}</td>
                <td>{deal.properties.dealstage}</td>
                <td>{deal.properties.pipeline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No deals available.</div>
      )}
    </div>
  );
};

export default DealsComponent;
