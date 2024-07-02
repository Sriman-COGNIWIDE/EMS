import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyEventListComponent.css'; // Custom CSS for additional styling

const MyEventListComponent = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyEvents();
    }, []);

    const fetchMyEvents = async () => {
        try {
            const storedEmail = localStorage.getItem('email');
            const response = await axios.get(`http://localhost:8080/api/events?userId=${storedEmail}`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h3>User Board</h3>
                <button className="sidebar-button" onClick={fetchMyEvents}>My Events</button>
                <button className="sidebar-button" onClick={() => navigate('/create-event')}>Create Event</button>
            </div>
            <div className="content">
                <h2 className="text-center my-4">My Events</h2>
                <div className="row">
                    {events.map((event) => (
                        <div className="col-md-4 mb-4" key={event.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{event.eventName}</h5>
                                    <p className="card-text">{event.description}</p>
                                    <p className="card-text"><small className="text-muted">{new Date(event.date).toLocaleDateString()}</small></p>
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

export default MyEventListComponent;
