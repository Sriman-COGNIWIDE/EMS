import React, { useEffect, useState } from 'react';
import { listEmployees } from '../../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListEmployeeComponent = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await listEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const viewEvents = () => {
        navigate('/list-events'); // Navigate to '/list-events' route
    };

    const deleteEmployee = async (email) => {
        try {
            await axios.delete(`http://localhost:8080/api/employees/${email}`);
            fetchEmployees(); // Refresh the list after successful deletion
            toast.success('Employee deleted successfully!');
        } catch (error) {
            console.error('Error deleting employee:', error);
            toast.error('Error deleting employee: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">List of Users</h2>
            <button className="btn btn-outline-primary" onClick={viewEvents}>
                View Events
            </button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>User Email</th>
                        <th>User Firstname</th>
                        <th>User Lastname</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.email}>
                            <td>{employee.email}</td>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
