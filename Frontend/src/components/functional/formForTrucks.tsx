// components/VehicleFormStep2.tsx
"use client";

import { useState } from "react";

// Dropdown options
const transmissionOptions = ["Automatic", "Manual"];
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
const steeringOptions = ["Left", "Right"];
const conditions = ["New", "Used", "Reconditioned"];
const axleConfigs = ["4x2", "4x4", "6x4"];
const colors = ["White", "Black", "Blue", "Red", "Silver"];

// Step 2 form data type
export type VehicleFormStep2Data = {
  model: string;
  transmission: string;
  fuelType: string;
  steering: string;
  condition: string;
  axleConfig: string;
  color: string;
  engineSize: string;
  year: string;
  price: string;
  doors: string;
  seats: string;
  modelCode: string;
  auctionGrade: string;
  loadingCapacity: string;
  mileage: string;
  engineNumber: string;
  chasisNo: string;
  length: string;
  width: string;
  height: string;
};

export default function VehicleFormStep2() {
  const [formData, setFormData] = useState<VehicleFormStep2Data>({
    model: "",
    transmission: "",
    fuelType: "",
    steering: "",
    condition: "",
    axleConfig: "",
    color: "",
    engineSize: "",
    year: "",
    price: "",
    doors: "",
    seats: "",
    modelCode: "",
    auctionGrade: "",
    loadingCapacity: "",
    mileage: "",
    engineNumber: "",
    chasisNo: "",
    length: "",
    width: "",
    height: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-8 rounded-3xl shadow-xl bg-gradient-to-br from-white to-gray-50 max-w-5xl mx-auto mt-10 border border-gray-100">
    <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">Add Vehicle Listing</h2>

    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Dropdown fields */}
      <div className="relative">
        <select name="model" value={formData.model} onChange={handleChange} className="input appearance-none bg-white w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200">
          <option value="">Select Model</option>
          <option value="D-Max">D-Max</option>
          <option value="Elf">Elf</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

      <div className="relative">
        <select name="transmission" value={formData.transmission} onChange={handleChange} className="input appearance-none bg-white w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200">
          <option value="">Select Transmission</option>
          {transmissionOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

      <div className="relative">
        <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="input appearance-none bg-white w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200">
          <option value="">Select Fuel Type</option>
          {fuelTypes.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

      <div className="relative">
        <select name="steering" value={formData.steering} onChange={handleChange} className="input appearance-none bg-white w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200">
          <option value="">Select Steering</option>
          {steeringOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

      <div className="relative">
        <select name="condition" value={formData.condition} onChange={handleChange} className="input appearance-none bg-white w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200">
          <option value="">Select Condition</option>
          {conditions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

      <div className="relative">
        <select name="axleConfig" value={formData.axleConfig} onChange={handleChange} className="input appearance-none bg-white w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200">
          <option value="">Select Axle Config</option>
          {axleConfigs.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

      <div className="relative">
        <select name="color" value={formData.color} onChange={handleChange} className="input appearance-none bg-white w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200">
          <option value="">Select Color</option>
          {colors.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

      {/* Text fields */}
      {[
        { label: "Engine Size", name: "engineSize" },
        { label: "Year", name: "year" },
        { label: "Price", name: "price" },
        { label: "No. of Doors", name: "doors" },
        { label: "No. of Seats", name: "seats" },
        { label: "Model Code", name: "modelCode" },
        { label: "Auction Grade", name: "auctionGrade" },
        { label: "Loading Capacity", name: "loadingCapacity" },
        { label: "Mileage", name: "mileage" },
        { label: "Engine Number", name: "engineNumber" },
        { label: "Chasis No", name: "chasisNo" },
        { label: "Length", name: "length" },
        { label: "Width", name: "width" },
        { label: "Height", name: "height" },
      ].map(({ label, name }) => (
        <input
          key={name}
          type="text"
          name={name}
          value={formData[name as keyof VehicleFormStep2Data]}
          onChange={handleChange}
          placeholder={label}
          className="input bg-white px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200 placeholder:text-gray-400"
        />
      ))}
      <div className="md:col-span-2 flex justify-center">
        <button
          type="submit"
          className="mt-6 w-40 p-3 rounded-xl bg-red-100 text-red-600
          hover:bg-red-200 transition-all duration-300
          flex items-center justify-center gap-2 font-semibold"
        >
          Save Vehicle
        </button>
      </div>
    </form>
    </div>
  )}
