import React from 'react';
import { Car } from "@/models/car";

interface SidebarProps {
    cars: Car[];
    onCarClick: (car: Car) => void;
    onLogout: () => void; // Added logout handler prop
}

const Sidebar: React.FC<SidebarProps> = ({ cars, onCarClick, onLogout }) => {
    return (
        <div className="sidebar w-80 bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
                Available Cars
            </h2>
            <ul className="space-y-4 flex-grow">
                {cars.map((car, index) => (
                    <li
                        key={index}
                        className="p-4 rounded-xl bg-gray-700/30 backdrop-blur-sm 
                                 text-white cursor-pointer transition-all duration-300
                                 hover:bg-blue-500/20 hover:text-blue-400 hover:translate-x-2
                                 hover:shadow-lg hover:shadow-blue-500/10"
                        onClick={() => onCarClick(car)}
                    >
                        <div className="font-medium">{car.make}</div>
                        <div className="text-sm text-gray-400">{car.model}</div>
                    </li>
                ))}
            </ul>
            
            <button
                onClick={onLogout}
                className="mt-6 w-full p-3 rounded-xl bg-red-500/20 text-red-400
                         hover:bg-red-500/30 transition-all duration-300
                         flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11 4.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5zm0 2a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5zm-7 0a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 .5.5z" clipRule="evenodd" />
                </svg>
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
