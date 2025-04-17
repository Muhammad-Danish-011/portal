import React from 'react';
import Logo from '../ui/logo';

const AccessRequired: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
        
<div className="absolute top-4 left-4 z-10">
       <Logo/>
      </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🔐 Access Required</h2>
        <p className="text-gray-600 text-center">Please log in to access the dashboard.</p>
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccessRequired;
