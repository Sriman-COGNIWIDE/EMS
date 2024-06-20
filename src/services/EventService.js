import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/events';

export const listEvents = () => axios.get(`${REST_API_BASE_URL}/all-events`);
export const createEvent = (event) => axios.post(`${REST_API_BASE_URL}`, event);
