import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

// export const listEmployees = () =>{
//     return axios.get(REST_API_BASE_URL);     // we can simplify the above code as the below
// }

export const listEmployees = () => axios.get(`${REST_API_BASE_URL}/all`);
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);