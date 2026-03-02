import React, { useState, useEffect } from 'react';
import { api } from '../api';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({ project_name: '', department: 0, employees: [] as number[] });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const [pRes, dRes, eRes] = await Promise.all([
        api.projects.get(),
        api.departments.get(),
        api.employees.get()
      ]);
      setProjects(pRes.data);
      setDepartments(dRes.data);
      setEmployees(eRes.data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.department === 0) {
      alert("Please assign a Department.");
      return;
    }
    if (formData.employees.length === 0) {
      alert("Please assign at least one Department Worker.");
      return;
    }
    try {
      if (editingId) {
        await api.projects.update(editingId, formData);
        setEditingId(null);
      } else {
        await api.projects.create(formData);
      }
      setFormData({ project_name: '', department: 0, employees: [] });
      fetchData();
    } catch (err: any) {
      console.error('Failed to save project', err);
      if (err.response && err.response.data) {
        alert("Error saving project: " + JSON.stringify(err.response.data));
      } else {
        alert("Network Error! Ensure your Django backend is running.");
      }
    }
  };

  const handleEdit = (proj: any) => {
    setEditingId(proj.id);
    setFormData({
      project_name: proj.project_name,
      department: proj.department,
      employees: proj.employees
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ project_name: '', department: 0, employees: [] });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.projects.delete(id);
        fetchData();
      } catch (err) {
        console.error('Failed to delete project', err);
      }
    }
  };

  const getDepartmentName = (id: number) => {
    const dept = departments.find(d => d.id === id);
    return dept ? dept.department_name : 'Unknown';
  };

  return (
    <div className="p-6 pl-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Projects</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 border border-gray-200 rounded-lg">
        <div className="flex flex-col gap-3">
          <input 
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project Name"
            value={formData.project_name}
            onChange={e => setFormData({...formData, project_name: e.target.value})}
            required
          />
          <select 
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData.department}
            onChange={e => setFormData({...formData, department: parseInt(e.target.value)})}
            required
          >
            <option value={0} disabled>Assign Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.department_name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Assign Workers (Hold Ctrl/Cmd to select multiple)</label>
          <select 
            multiple 
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 bg-white"
            value={formData.employees.map(String)}
            onChange={e => setFormData({
              ...formData, 
              employees: Array.from(e.target.selectedOptions, option => parseInt(option.value))
            })}
          >
            {employees
              .filter(emp => emp.employee_position === 'Department Worker')
              .map(emp => (
                <option key={emp.id} value={emp.id}>{emp.employee_name} - {emp.employee_position}</option>
              ))}
          </select>
        </div>

        <div className="md:col-span-2 flex gap-3 mt-2">
          <button 
            type="submit" 
            className={`px-6 py-2 rounded text-white font-semibold transition-colors ${
              editingId ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {editingId ? 'Update Project' : 'Create Project'}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              onClick={handleCancelEdit} 
              className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded font-semibold transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold text-gray-700">Project Name</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Department</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Team Size</th>
              <th className="p-3 text-sm font-semibold text-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj, index) => {
              // Find department head for this project
              const dept = departments.find(d => d.id === proj.department);
              const head = dept ? employees.find(e => e.id === dept.employee) : null;
              // Find workers for this project
              const workers = employees.filter(e => proj.employees.includes(e.id));
              return (
                <React.Fragment key={proj.id}>
                  <tr className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-3 text-sm text-gray-900 font-medium">{proj.project_name}</td>
                    <td className="p-3 text-sm text-gray-600">{getDepartmentName(proj.department)}</td>
                    <td className="p-3 text-sm text-gray-600">{proj.employees.length} Members</td>
                    <td className="p-3 text-sm text-center space-x-3">
                      <button onClick={() => handleEdit(proj)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                      <button onClick={() => handleDelete(proj.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                    </td>
                  </tr>
                  <tr className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td colSpan={4} className="p-0">
                      <details className="px-6 py-2">
                        <summary className="cursor-pointer text-xs text-gray-500 hover:text-indigo-600">Show Team Details</summary>
                        <div className="mt-2 text-xs text-gray-700">
                          <div><span className="font-semibold">Head:</span> {head ? head.employee_name : 'None'}</div>
                          <div className="mt-1"><span className="font-semibold">Workers:</span> {workers.length > 0 ? (
                            <ul className="list-disc ml-5">
                              {workers.map(w => <li key={w.id}>{w.employee_name}</li>)}
                            </ul>
                          ) : 'None'}</div>
                        </div>
                      </details>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="p-4 text-center text-gray-500 text-sm">No projects found. Create one above!</div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;