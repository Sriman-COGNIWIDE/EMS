import React, { useState, useEffect } from 'react';
import './EventListPage.css'; // Import your CSS file

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('your-api-endpoint/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="event-list-page">
      <h1>Event List</h1>
      <div className="event-list">
        {events.map(event => (
          <div key={event.evtid} className="event-card">
            <h2>{event.title}</h2>
            <p className="event-date">{event.date}</p>
            <p className="event-description">{event.description}</p>
            <div className="button-container">
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListPage;
