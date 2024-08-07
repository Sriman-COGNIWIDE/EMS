import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './assets/components/Login';
import Register from './assets/components/Register';
import ListEmployeeComponent from './assets/components/ListEmployeeComponent';
import ListEventComponent from './assets/components/ListEventComponent';
import CardListEventComponent from './assets/components/CardListEventComponent';
import CreateEventComponent from './assets/components/CreateEventComponent'; // Import CreateEventComponent
import MyEventListComponent from './assets/components/MyEventListComponent'; // Import MyEventListComponent
import NotFound from './assets/components/NotFound'; // Import NotFound component
import { isAuthenticated } from './services/AuthService';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/list-employees"
                        element={isAuthenticated() ? <ListEmployeeComponent /> : <Navigate to="/login" />}
                    />
                    <Route path="/list-events" element={<ListEventComponent />} />
                    <Route path="/card-events" element={<CardListEventComponent />} />
                    <Route path="/create-event" element={<CreateEventComponent />} /> 
                    <Route path="/my-events" element={<MyEventListComponent />} /> 
                    <Route path="*" element={<NotFound />} /> 
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
