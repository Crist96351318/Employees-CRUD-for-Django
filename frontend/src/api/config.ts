export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

export const API_ENDPOINTS = {
  employees: `${API_BASE_URL}/employees/`,
  departments: `${API_BASE_URL}/departments/`,
  projects: `${API_BASE_URL}/projects/`,
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
};