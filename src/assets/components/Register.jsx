import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'; // Import CSS file for styling
import { createEmployee } from '../../services/EmployeeService'; // Assuming correct path to EmployeeService

const Register = () => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const validatePhone = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    if (password.length < 8) {
      setPasswordStrength('Weak');
      return false;
    }
    if (regex.test(password)) {
      setPasswordStrength('Strong');
      return true;
    }
    setPasswordStrength('Weak');
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      validateEmail(form.email) &&
      validatePhone(form.phoneNumber) &&
      validatePassword(form.password)
    ) {
      try {
        const response = await createEmployee(form); // Using async/await to handle promise

        if (response.status === 201) {
          // Store the email in local storage
          localStorage.setItem('email', form.email);

          // Retrieve the email from local storage
          const storedEmail = localStorage.getItem('email');

          // Assuming you have an eventId from somewhere
          const eventId = 'soori2'; // Replace this with your actual event ID

          // Log the email ID and event ID to the console
          console.log(`Event ID: ${eventId}, Email: ${storedEmail}`);

          toast.success('Registered Successfully!');
          setForm({
            firstname: '',
            lastname: '',
            email: '',
            phoneNumber: '',
            password: '',
          });
          navigate('/login'); // Redirect to login page after successful registration
        } else {
          toast.error('Registration Failed!');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again.');
      }
    } else {
      toast.error('Please fill the form correctly!');
    }
  };

  const handleCancel = () => {
    setForm({
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      password: '',
    });
    toast.info('Registration Cancelled!');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={(e) => {
                handleChange(e);
                validatePassword(e.target.value);
              }}
              required
              className="form-input"
            />
            <small className={`password-strength ${passwordStrength.toLowerCase()}`}>
              {passwordStrength && `Password Strength: ${passwordStrength}`}
            </small>
            <small className="password-requirements">
              <br />
              Password must contain at least 8 characters, including one uppercase letter, one symbol, and one number.
            </small>
          </div>
          <div className="button-group">
            <button type="submit" className="submit-btn">Register</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
        <div className="back-link">
          <p>Already have an account? <Link to="/login" className="back-text">Back to Login</Link></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
