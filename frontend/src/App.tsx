import React, { useState } from 'react';
import EmployeeList from './component/EmployeeList';
import DepartmentList from './component/DepartmentList';
import ProjectList from './component/ProjectList';

function App() {
  const [activeTab, setActiveTab] = useState('employees');

  const tabs = [
    { id: 'employees', label: 'Employees', icon: '👥' },
    { id: 'departments', label: 'Departments', icon: '🏢' },
    { id: 'projects', label: 'Projects', icon: '📁' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-indigo-600">Aton Corp.</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            {activeTab} Management
          </h2>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {activeTab === 'employees' && <EmployeeList />}
            {activeTab === 'departments' && <DepartmentList />}
            {activeTab === 'projects' && <ProjectList />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;