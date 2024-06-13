import React, { useState, useEffect } from 'react';

const EventPage = ({ eventId }) => {
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`your-api-endpoint/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data = await response.json();
        setEventData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [eventId]); // Re-run effect when eventId changes

  if (isLoading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const { name, date, time, location } = eventData;

  return (
    <div className="event-page">
      <h2>{name}</h2>
      <p className="event-details">
        Date: {date} | Time: {time} <br />
        Location: {location}
      </p>
      <button>Register Now</button>
    </div>
  );
};

export default EventPage;
