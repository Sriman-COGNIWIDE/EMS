import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CardListEventComponent.css'; // Custom CSS for additional styling

const CardListEventComponent = () => {
    const [events, setEvents] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const storedEmail = localStorage.getItem('email');
            const response = await axios.get(`http://localhost:8080/api/events/exclude-user/${storedEmail}`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleRegister = async (eventId) => {
        try {
            const storedEmployeeId = localStorage.getItem('email'); // Assuming you store employeeId in localStorage
            const response = await axios.post('http://localhost:8080/participants/save', {
                eventId: eventId,
                employeeId: storedEmployeeId
            });
            console.log('Registration successful:', response.data);
            setRegisteredEvents((prev) => [...prev, eventId]);
            toast.success('Registration Successful');
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Failed to register');
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h3>User Board</h3>
                <button className="sidebar-button" onClick={fetchEvents}>All Events</button>
                <button className="sidebar-button" onClick={() => navigate('/my-events')}>My Events</button>
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
                                    <button
                                        className={`btn ${registeredEvents.includes(event.id) ? 'btn-success' : 'btn-primary'}`}
                                        onClick={() => handleRegister(event.id)}
                                        disabled={registeredEvents.includes(event.id)}
                                    >
                                        {registeredEvents.includes(event.id) ? 'Registered' : 'Register'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CardListEventComponent;
