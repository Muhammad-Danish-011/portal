import { carsRegistration } from "@/lib/types/typeCarsRegistration";

export interface CarDetailsTableProps {
  car: carsRegistration;
}
export const CarDetailsTable: React.FC<CarDetailsTableProps> = ({ car }) => {
  const carDetails = Object.keys(car)
    .map((key) => {
      const label =
        key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
      let value = car[key as keyof carsRegistration] ?? "N/A";
      if (key === "dealerStock") {
        value = value === true ? "Yes" : "No";
      }
      if (key === "imageBase64") return null;
      if (key === "_id") return null;
      if (key === "__v") return null;
      if (key === "imageUrl") return null;
      return { label, value };
    })
    .filter((detail) => detail !== null);

  return (
    <div className="overflow-x-auto bg-white p-4 md:p-8 rounded-lg md:rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-8 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
        Vehicle Information
      </h2>

      {/* Car Image */}
      <div className="flex justify-center mb-4 md:mb-8">
        <div className="relative w-full md:w-auto">
          <img
            src={car.imageUrl || "https://via.placeholder.com/150"}
            alt={car.model}
            className="w-full h-48 md:h-96 object-cover rounded-lg md:rounded-xl shadow-md md:shadow-lg transition-all duration-500 hover:scale-105 md:hover:scale-110 hover:shadow-xl md:hover:shadow-2xl"
          />
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 rounded-lg md:rounded-xl transition-all duration-300"></div>
        </div>
      </div>

      {/* Responsive Table/Card View */}
      <div className="block md:hidden">
        {carDetails.map((detail, index) => {
          if (detail === null) return null;
          return (
            <div 
              key={index}
              className={`mb-2 p-4 rounded-lg ${
                index % 2 === 0 ? "bg-blue-50" : "bg-gray-100"
              }`}
            >
              <div className="font-medium text-gray-700 mb-1">{detail.label}</div>
              <div className="text-gray-900">{detail.value}</div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="min-w-full table-auto border-separate border-spacing-y-2 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-slate-800 text-white text-sm uppercase">
              <th className="px-6 py-3 text-left rounded-tl-lg">Field</th>
              <th className="px-6 py-3 text-left rounded-tr-lg">Value</th>
            </tr>
          </thead>
          <tbody>
            {carDetails.map((detail, index) => {
              if (detail === null) return null;
              return (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-blue-50" : "bg-gray-100"
                  } hover:bg-indigo-50 transition-colors duration-200 rounded-lg`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {detail.label}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {detail.value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
