import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginForm.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      console.log('Login attempted:', formData);
      setFormData({ username: '', password: '' });
      navigate('/events'); // Use navigate to redirect to the events page
    } else {
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const validationErrors = {};
    if (!formData.username) validationErrors.username = 'Username is required.';
    if (!formData.password) validationErrors.password = 'Password is required.';
    return validationErrors;
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login Form</h2>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
