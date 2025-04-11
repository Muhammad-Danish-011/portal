import { Car } from "@/app/dashboard/types/carTypes";

export interface CarDetailsTableProps {
  car: Car;
}

export const CarDetailsTable: React.FC<CarDetailsTableProps> = ({ car }) => {
  const carDetails = Object.keys(car).map((key) => {
    const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
    const value = car[key as keyof Car] ?? "N/A";
    return { label, value };
  });

  return (
    <div className="overflow-x-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
      <h3 className="text-3xl font-bold mb-6 text-center text-gray-800 tracking-wide">Car Details</h3>

      {/* Car Image */}
      <div className="flex justify-center mb-8">
        <img
          src={car.imageUrl || "https://via.placeholder.com/150"}
          alt={car.modelName}
          className="max-w-xs rounded-xl shadow-md"
        />
      </div>

      {/* Fancy Table */}
      <table className="min-w-full table-auto border-separate border-spacing-y-2 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-slate-800 text-white text-sm uppercase">
            <th className="px-6 py-3 text-left rounded-tl-lg">Field</th>
            <th className="px-6 py-3 text-left rounded-tr-lg">Value</th>
          </tr>
        </thead>
        <tbody>
          {carDetails.map((detail, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-blue-50" : "bg-gray-100"
                } hover:bg-indigo-50 transition-colors duration-200 rounded-lg`}
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-700">{detail.label}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{detail.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};
