import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserDashboard.css'; // Import CSS file for styling
import { getAllEvents, deleteEvent } from '../../services/EventService'; // Import API functions for events (assuming correct paths)

const UserDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents(); // Assuming getAllEvents fetches events from backend
      if (response.status === 200) {
        setEvents(response.data); // Assuming response.data contains the list of events
      } else {
        toast.error('Failed to fetch events!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while fetching events.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await deleteEvent(eventId); // Assuming deleteEvent is an API call to delete an event
      if (response.status === 200) {
        toast.success('Event deleted successfully!');
        // Update events list after deletion
        fetchEvents();
      } else {
        toast.error('Failed to delete event!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while deleting the event.');
    }
  };

  return (
    <div className="user-dashboard-container">
      <h2>User Dashboard</h2>
      <div className="user-dashboard-content">
        <div className="events-list">
          <h3>Events</h3>
          {events.length > 0 ? (
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  <div>
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                    <p>Date: {event.date}</p>
                    <p>Participants: {event.participants}</p>
                    <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                    <Link to={`/edit-event/${event.id}`}>Edit</Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events found.</p>
          )}
        </div>
        <div className="create-event">
          <Link to="/create-event">Create Event</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;
