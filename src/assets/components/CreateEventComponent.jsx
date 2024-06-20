import React, { useState } from 'react';
import axios from 'axios';
import './CreateEventComponent.css'; // Custom CSS for additional styling
import { createEvent } from '../../services/EventService'; // Ensure correct path

const CreateEventComponent = () => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("email");
            console.log(typeof(userId)) // Assuming userId is stored in localStorage after login
            const response = await createEvent({
                eventName,
                description,
                date,
                id:userId
            }); // Pass userId to createEvent function
            if (response.status === 200) {
                alert('Event created successfully!');
                console.log(`Event created by user with ID: ${userId}`);
                // Clear the form
                setEventName('');
                setDescription('');
                setDate('');
            } else {
                alert('Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error creating event');
        }
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Create Event</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="event-form">
                    <div className="form-group">
                        <label htmlFor="eventName">Event Name</label>
                        <input
                            type="text"
                            id="eventName"
                            className="form-control"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Event Description</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Event Date</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Event</button>
                </form>
            </div>
        </div>
    );
};

export default CreateEventComponent;
