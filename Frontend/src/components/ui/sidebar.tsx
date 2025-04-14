'use client';
import React, { useState } from 'react';
import { ICar } from "@/models/car";

interface SidebarProps {
  cars: ICar[];
  onCarClick: (car: ICar) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ cars, onCarClick, onLogout, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative">
    {/* Sidebar */}
    <div
      className={`fixed top-0 left-0 h-full z-40 transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="w-80 h-full bg-white p-6 shadow-xl border-r border-gray-200 flex flex-col relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-4">
          Available Cars
        </h2>
  
        <ul className="space-y-4 flex-grow overflow-auto pr-1">
          {cars.map((car, index) => (
            <li
              key={index}
              className="p-4 rounded-xl bg-white/30 backdrop-blur-md border border-gray-200 
                      shadow-sm cursor-pointer transition-all duration-300
                      hover:bg-blue-100/50 hover:border-blue-300 hover:scale-[1.02]"
              onClick={() => onCarClick(car)}
            >
              <div className="font-semibold text-gray-800">{car.make}</div>
              <div className="text-sm text-gray-500">{car.modelName}</div>
            </li>
          ))}
        </ul>
  
        <button
          onClick={onLogout}
          className="mt-6 w-full p-3 rounded-xl bg-red-100 text-red-600
                    hover:bg-red-200 transition-all duration-300
                    flex items-center justify-center gap-2 font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11 4.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5zm0 2a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5zm-7 0a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 .5.5z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  
    {/* Sidebar Toggle Button */}
    <button
  onClick={() => setIsOpen(!isOpen)}
  className={`fixed top-0 z-50 transition-all duration-300 
    ${isOpen ? 'left-[320px]' : 'left-0'} group/toggler`}
>
  <div
    className="bg-white text-gray-700 hover:bg-black hover:text-white 
    hover:scale-110 transform transition-all duration-300 
    p-2 rounded-md shadow-md border border-gray-300"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  </div>
</button>

  
    {/* Main Content */}
    <main
      className={`transition-all duration-500 h-full w-full overflow-auto ${
        isOpen ? 'ml-80' : 'ml-0'
      }`}
    >
      {children}
    </main>
  </div>
  )}


export default Sidebar;
