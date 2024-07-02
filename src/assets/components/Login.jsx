import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { authenticateUser } from '../../services/AuthService'; // Assuming AuthService handles authentication
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // State to track if login as admin is checked
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            let success = false;
    
            if (isAdmin) {
                console.log("you are admin");
                if (email === 'srimancogn@email.com' && password === 'Sriman@12345') {
                    success = await authenticateUser(email, password);
                    if (success) {
                        localStorage.setItem('email',email); // Store email in local storage
                        navigate('/list-employees');
                    }
                    return;
                } else {
                    toast.error('You must log in as admin with these credentials');
                    return; // Exit the function early
                }
            } 

            if (!isAdmin) {
                console.log("you are user");
                try {
                    const response = await axios.post('http://localhost:8080/api/employees/userLogin', { email, password });
                    console.log(response.data)
                    if (response.status === 200) {
                        localStorage.setItem('email', email); // Store email in local storage
                        navigate('/card-events'); 
                    } 
                    return;
                } catch (error) {
                    toast.error('Invalid credentials');
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <div className="login-container">
            <div className="login-content">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            Login as admin
                        </label>
                    </div>
                    <button type="submit" className="submit-btn">
                        Login
                    </button>
                </form>
                <div className="register-link">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="register-text">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
