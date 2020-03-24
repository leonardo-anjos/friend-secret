import axios from 'axios';

const index = axios.create({
  baseURL: 'http://localhost:8069/api/v1',
});

export { index };