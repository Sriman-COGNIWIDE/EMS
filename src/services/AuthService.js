// AuthService.js

export const authenticateUser = async (email,password) => {
    try {
        const response = await fetch('http://localhost:8080/api/employees/userLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Assuming backend sends a token upon successful login
        return true; // Login successful
    } catch (error) {
        console.error('Failed to log in:', error);
        return false; // Login failed
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null; // Return true if token exists, else false
};

export const logout = () => {
    localStorage.removeItem('token');
};
