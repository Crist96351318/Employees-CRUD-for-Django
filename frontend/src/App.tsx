import React, { useState } from 'react';
import './index.css'; // Ensure this line exists!
import EmployeeList from './component/EmployeeList';
import DepartmentList from './component/DepartmentList';
import ProjectList from './component/ProjectList';
type Section = 'employees' | 'departments' | 'projects';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('employees');

  const renderSection = () => {
    switch (activeSection) {
      case 'employees': return <EmployeeList />;
      case 'departments': return <DepartmentList />;
      case 'projects': return <ProjectList />;
      default: return <EmployeeList />;
    }
  };

  const navItems = [
    { id: 'employees', label: 'Employees', icon: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' },
    { id: 'departments', label: 'Departments', icon: 'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2h8v-2zM2 15a4 4 0 008 0v2H2v-2z' },
    { id: 'projects', label: 'Projects', icon: 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414l4 4v10.172A2 2 0 0114 16H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1v-6z' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 font-sans text-gray-900">
      {/* Modern Glassy Header */}
      <header className="backdrop-blur bg-indigo-700/80 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-lg">Employee Management System</h1>
            <p className="text-indigo-200 mt-1 text-sm font-medium">Manage Records, Departments & Projects</p>
          </div>
          <div className="hidden sm:block">
            <span className="inline-block bg-white/10 rounded-full px-4 py-1 text-xs font-semibold tracking-wide border border-white/20 shadow-sm">Powered by Django & React</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Modern Interactive Navigation Tabs */}
        <div className="mb-10 flex justify-center">
          <nav className="inline-flex rounded-xl shadow bg-white/80 border border-gray-200 overflow-hidden" aria-label="Tabs">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`
                  flex items-center gap-2 px-6 py-3 text-base font-semibold transition-colors duration-200 focus:outline-none
                  ${activeSection === item.id 
                    ? 'bg-indigo-600 text-white shadow-inner' 
                    : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'}
                `}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d={item.icon} />
                </svg>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Card-style Content Section */}
        <div className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10 transition-all duration-300">
          {renderSection()}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Employee Management System. All rights reserved.
      </footer>
    </div>
  );
}

export default App;