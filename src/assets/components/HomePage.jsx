import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePageComponent.css'; // Assuming you'll add some styles here

const HomePageComponent = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/employees');
  };

  return (
    <div className="home-page">
      <h1>Employee Management System</h1>
      <button onClick={handleStartClick}>Start</button>
    </div>
  );
};

export default HomePageComponent;
