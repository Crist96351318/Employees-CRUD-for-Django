import axios from 'axios';
import { API_BASE_URL } from './api/config';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Types based on Django Models
// Based on models.py
export interface Employee {
    id: number;
    employee_name: string;
    employee_position: string;
}

export interface Department {
    id: number;
    department_name: string;
    employee: number; // This is the ID of the Department Head
    workers: number[]; // Add this line so TypeScript knows about the workers array!
}

export interface Project {
    id: number;
    project_name: string;
    department: number; // OneToOneField
    employees: number[]; // ManyToManyField
}

// Employee Methods
export const getEmployees = () => axiosInstance.get<Employee[]>('employees/').then(res => res.data);
export const createEmployee = (data: Omit<Employee, 'id'>) => axiosInstance.post<Employee>('employees/', data).then(res => res.data);
export const deleteEmployee = (id: number) => axiosInstance.delete(`employees/${id}/`);

// Department Methods
export const getDepartments = () => axiosInstance.get<Department[]>('departments/').then(res => res.data);
export const createDepartment = (data: Omit<Department, 'id'>) => axiosInstance.post<Department>('departments/', data).then(res => res.data);

// Project Methods
export const getProjects = () => axiosInstance.get<Project[]>('projects/').then(res => res.data);
export const createProject = (data: Omit<Project, 'id'>) => axiosInstance.post<Project>('projects/', data).then(res => res.data);

export default axiosInstance;