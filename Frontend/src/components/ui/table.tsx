import { Car } from '@/app/dashboard/types/carTypes';
import React from 'react';


export interface CarDetailsTableProps {
  car: Car;
}

const CarDetailsTable: React.FC<CarDetailsTableProps> = ({ car }) => {
  // Dynamically map car properties to table rows, handling optional values
  const carDetails = Object.keys(car).map((key) => {
    const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    // Use a fallback for undefined values
    const value = car[key as keyof Car] ?? 'N/A'; 
    return { label, value };
  });

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center text-blue-600">Car Details</h3>
      <table className="min-w-full table-auto border-separate border-spacing-0.5 rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700 rounded-tl-lg">Field</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700 rounded-tr-lg">Value</th>
          </tr>
        </thead>
        <tbody>
          {carDetails.map((detail, index) => (
            <tr key={index} className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <td className="px-6 py-4 text-sm font-semibold text-gray-700">{detail.label}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{detail.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display image if exists */}
      {car.imageUrl && (
        <div className="mt-4">
          <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
};

export default CarDetailsTable;
