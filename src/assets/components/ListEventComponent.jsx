import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListEventComponent = () => {
    const [events, setEvents] = useState([]);

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

    return (
        <div className="container">
            <h2 className="text-center">List of Events</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Event ID</th>
                        <th>Event Name</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.eventName}</td>
                            <td>{event.description}</td>
                            <td>{event.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEventComponent;
