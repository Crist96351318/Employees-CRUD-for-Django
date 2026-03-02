import React, { useState, useEffect } from 'react';
import { Department, Employee, getDepartments, getEmployees, axiosInstance } from '../api';

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState({ department_name: '', employee: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const [deptData, empData] = await Promise.all([getDepartments(), getEmployees()]);
      setDepartments(deptData);
      setEmployees(empData);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.employee === 0) {
      alert("Please select a Department Head.");
      return;
    }

    try {
      if (editingId) {
        await axiosInstance.put(`departments/${editingId}/`, formData);
        setEditingId(null);
      } else {
        await axiosInstance.post('departments/', formData);
      }
      setFormData({ department_name: '', employee: 0 });
      fetchData();
    } catch (err) {
      console.error('Failed to save department', err);
    }
  };

  const handleEdit = (dept: Department) => {
    setEditingId(dept.id);
    setFormData({
      department_name: dept.department_name,
      employee: dept.employee
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ department_name: '', employee: 0 });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await axiosInstance.delete(`departments/${id}/`);
        fetchData();
      } catch (err) {
        console.error('Failed to delete department', err);
      }
    }
  };

  const getEmployeeName = (id: number) => {
    const emp = employees.find(e => e.id === id);
    return emp ? emp.employee_name : 'Unknown';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Departments</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 flex gap-3 items-center flex-wrap">
        <input 
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Department Name"
          value={formData.department_name}
          onChange={e => setFormData({...formData, department_name: e.target.value})}
          required
        />
        
        <select 
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={formData.employee}
          onChange={e => setFormData({...formData, employee: parseInt(e.target.value)})}
          required
        >
          <option value={0} disabled>Select Dept Head</option>
          {employees
            .filter(emp => emp.employee_position === 'Department Head')
            .map(emp => (
              <option key={emp.id} value={emp.id}>{emp.employee_name}</option>
            ))}
        </select>
        
        <button 
          type="submit" 
          className={`px-4 py-2 rounded text-white font-semibold transition-colors ${
            editingId ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {editingId ? 'Update' : 'Add'}
        </button>
        
        {editingId && (
          <button 
            type="button" 
            onClick={handleCancelEdit} 
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded font-semibold transition-colors"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold text-gray-700">Department Name</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Department Head</th>
              <th className="p-3 text-sm font-semibold text-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={dept.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="p-3 text-sm text-gray-900">{dept.department_name}</td>
                <td className="p-3 text-sm text-gray-600">{getEmployeeName(dept.employee)}</td>
                <td className="p-3 text-sm text-center space-x-3">
                  <button onClick={() => handleEdit(dept)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                  <button onClick={() => handleDelete(dept.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {departments.length === 0 && (
          <div className="p-4 text-center text-gray-500 text-sm">No departments found. Add one above!</div>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;