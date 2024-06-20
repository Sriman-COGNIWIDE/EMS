import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CardListEventComponent.css'; // Custom CSS for additional styling

const CardListEventComponent = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events/all-events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleRegister = (eventId) => {
        // Implement the registration logic here
        console.log('Register for event ID:', eventId);
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h3>User Board</h3>
                <button className="sidebar-button" onClick={fetchEvents}>All Events</button>
                <button className="sidebar-button" onClick={() => console.log('My Events')}>My Events</button>
                <button className="sidebar-button" onClick={() => navigate('/create-event')}>Create Event</button>
            </div>
            <div className="content">
                <h2 className="text-center my-4">List of Events</h2>
                <div className="row">
                    {events.map((event) => (
                        <div className="col-md-4 mb-4" key={event.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{event.eventName}</h5>
                                    <p className="card-text">{event.description}</p>
                                    <p className="card-text"><small className="text-muted">{new Date(event.date).toLocaleDateString()}</small></p>
                                    <button className="btn btn-primary" onClick={() => handleRegister(event.id)}>Register</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardListEventComponent;
