import React, { useState, useEffect } from 'react';
import { api } from '../api';

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [formData, setFormData] = useState({ department_name: '', employee: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const [deptRes, empRes] = await Promise.all([api.departments.get(), api.employees.get()]);
      setDepartments(deptRes.data); setEmployees(empRes.data);
    } catch (err) { console.error('Failed to fetch data', err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.employee === 0) return alert("Please select a Department Head.");
    try {
      if (editingId) {
        await api.departments.update(editingId, formData);
        setEditingId(null);
      } else {
        await api.departments.create(formData);
      }
      setFormData({ department_name: '', employee: 0 });
      fetchData();
    } catch (err) { console.error('Failed to save department', err); }
  };

  const handleEdit = (dept: any) => {
    setEditingId(dept.id);
    setFormData({ department_name: dept.department_name, employee: dept.employee });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ department_name: '', employee: 0 });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this department?')) {
      try {
        await api.departments.delete(id); fetchData();
      } catch (err) { console.error('Failed to delete', err); }
    }
  };

  const getEmployeeName = (id: number) => {
    return employees.find(e => e.id === id)?.employee_name || 'Unknown';
  };

  return (
    <div className="pl-4">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Departments</h2>
        <p className="text-sm text-gray-500">Manage organizational structures and heads.</p>
      </div>
      
      {/* Grid Layout Form like the 2nd picture */}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Department Name</label>
            <input 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              value={formData.department_name}
              onChange={e => setFormData({...formData, department_name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Department Head</label>
            <select 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
              value={formData.employee}
              onChange={e => setFormData({...formData, employee: parseInt(e.target.value)})}
              required
            >
              <option value={0} disabled>Select a leader</option>
              {/* Preserved filter logic */}
              {employees.filter(emp => emp.employee_position === 'Department Head').map(emp => (
                <option key={emp.id} value={emp.id}>{emp.employee_name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Removed assign workers field */}
        
        <div className="md:col-span-2 flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow transition-colors">
            {editingId ? 'Update Department' : 'Create Department'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-lg shadow-sm transition-colors">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-hidden ring-1 ring-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getEmployeeName(dept.employee)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(dept)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(dept.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentList;