import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

export const api = {
    employees: {
        get: () => axios.get(`${API_BASE}/employees/`),
        create: (data: any) => axios.post(`${API_BASE}/employees/`, data),
        update: (id: number, data: any) => axios.put(`${API_BASE}/employees/${id}/`, data),
        delete: (id: number) => axios.delete(`${API_BASE}/employees/${id}/`),
    },
    departments: {
        get: () => axios.get(`${API_BASE}/departments/`),
        create: (data: any) => axios.post(`${API_BASE}/departments/`, data),
        update: (id: number, data: any) => axios.put(`${API_BASE}/departments/${id}/`, data),
        delete: (id: number) => axios.delete(`${API_BASE}/departments/${id}/`),
    },
    projects: {
        get: () => axios.get(`${API_BASE}/projects/`),
        create: (data: any) => axios.post(`${API_BASE}/projects/`, data),
        update: (id: number, data: any) => axios.put(`${API_BASE}/projects/${id}/`, data),
        delete: (id: number) => axios.delete(`${API_BASE}/projects/${id}/`),
    }
};