// ============= Employee Types =============
export interface Employee {
  id: number;
  employee_name: string; // Matches models.py
  employee_position: string; // Matches models.py
}

export interface CreateEmployeeRequest {
  employee_name: string;
  employee_position: string;
}

export interface UpdateEmployeeRequest {
  employee_name?: string;
  employee_position?: string;
}

// ============= Department Types =============
export interface Department {
  id: number;
  department_name: string; // Matches models.py
  employee: number; // Foreign Key to Employee ID
}

export interface CreateDepartmentRequest {
  department_name: string;
  employee: number;
}

export interface UpdateDepartmentRequest {
  department_name?: string;
  employee?: number;
}

// ============= Project Types =============
export interface Project {
  id: number;
  project_name: string; // Matches models.py
  department: number; // One-to-One Field to Department ID
  employees: number[]; // Many-to-Many Field to Employee IDs
}

export interface CreateProjectRequest {
  project_name: string;
  department: number;
  employees: number[];
}

export interface UpdateProjectRequest {
  project_name?: string;
  department?: number;
  employees?: number[];
}

// ============= API Response Types =============
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ============= Component Props Types =============
export interface ListComponentProps {
  onRefresh?: () => void;
}

export interface FormComponentProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: any;
}