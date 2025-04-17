import { carsRegistration } from "@/lib/types/typeCarsRegistration";

export interface CarDetailsTableProps {
  car: carsRegistration;
}
export const CarDetailsTable: React.FC<CarDetailsTableProps> = ({ car }) => {
  const carDetails = Object.keys(car)
    .map((key) => {
      const label =
        key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
      const value = car[key as keyof carsRegistration] ?? "N/A";
      console.log(car.imageUrl);
      if (key === "imageBase64") return null; // Do not include base64 in car details

      if (key === "imageUrl") return null; // Do not include base64 in car details
      return { label, value };
    })
    .filter((detail) => detail !== null); // Filter out null values

  return (
    <div className="overflow-x-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
        Vehicle Information
      </h2>

      {/* Car Image */}
      <div className="flex justify-center mb-8">
        {/* Image Card */}
        <div className="relative">
          <img
            src={car.imageUrl || "https://via.placeholder.com/150"} // Show imageUrl
            alt={car.model}
            className="w-full h-96 object-cover rounded-xl shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl"
          />
          {/* Optional overlay for extra effect */}
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 rounded-xl transition-all duration-300"></div>
        </div>
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
          {carDetails.map((detail, index) => {
            // TypeScript will no longer complain about 'detail' being null because of the filter
            if (detail === null) return null;
            return (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-blue-50" : "bg-gray-100"
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
  );
};