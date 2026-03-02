import React, { useState, useEffect } from 'react';
import { api } from '../api';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [formData, setFormData] = useState({ employee_name: '', employee_position: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchEmployees = async () => {
    try {
      const res = await api.employees.get();
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to fetch employees', err);
    }
  };

  useEffect(() => { 
    fetchEmployees(); 
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.employee_position === '') {
      alert("Please select a position.");
      return;
    }
    try {
      if (editingId) {
        await api.employees.update(editingId, formData);
        setEditingId(null);
      } else {
        await api.employees.create(formData);
      }
      setFormData({ employee_name: '', employee_position: '' });
      fetchEmployees();
    } catch (err) {
      console.error('Failed to save employee', err);
    }
  };

  const handleEdit = (emp: any) => {
    setEditingId(emp.id);
    setFormData({ 
      employee_name: emp.employee_name, 
      employee_position: emp.employee_position 
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ employee_name: '', employee_position: '' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.employees.delete(id);
        fetchEmployees();
      } catch (err) {
        console.error('Failed to delete employee', err);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Employees</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 flex gap-3 items-center flex-wrap">
        <input 
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={formData.employee_name}
          onChange={e => setFormData({...formData, employee_name: e.target.value})}
          required
        />
        
        <select 
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={formData.employee_position}
          onChange={e => setFormData({...formData, employee_position: e.target.value})}
          required
        >
          <option value="" disabled>Select Position</option>
          <option value="Department Head">Department Head</option>
          <option value="Department Worker">Department Worker</option>
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
              <th className="p-3 text-sm font-semibold text-gray-700">Name</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Position</th>
              <th className="p-3 text-sm font-semibold text-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="p-3 text-sm text-gray-900">{emp.employee_name}</td>
                <td className="p-3 text-sm text-gray-600">{emp.employee_position}</td>
                <td className="p-3 text-sm text-center space-x-3">
                  <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                  <button onClick={() => handleDelete(emp.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {employees.length === 0 && (
          <div className="p-4 text-center text-gray-500 text-sm">No employees found. Add one above!</div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;