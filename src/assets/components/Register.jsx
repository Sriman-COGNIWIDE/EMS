import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './RegistrationForm.css'; // Import your CSS file

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      // Send form data to backend (replace with your API call)
      console.log('Form submitted:', formData);
      setFormData({ username: '', password: '' });
      // Redirect to the login page upon successful registration
      navigate('/login'); // Use navigate instead of history.push
    } else {
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const validationErrors = {};

    if (!formData.username) {
      validationErrors.username = 'Username is required.';
    }

    if (!formData.password || formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long.';
    }

    return validationErrors;
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Registration Form</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          className={errors.username ? 'error' : ''}
        />
        {errors.username && <span className="error-message">{errors.username}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
