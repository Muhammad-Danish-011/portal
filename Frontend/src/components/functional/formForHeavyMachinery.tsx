"use client";

import { useState } from "react";

const options = {
  makes: ["JCB", "Caterpillar", "Komatsu"],
  models: ["Model A", "Model B"],
  transmissions: ["Automatic", "Manual"],
  fuelTypes: ["Diesel", "Electric"],
  steerings: ["Left", "Right"],
  conditions: ["New", "Used"],
  axleConfigs: ["4x2", "6x4"],
  colors: ["Yellow", "Orange", "White"],
  locations: ["Lahore", "Karachi", "Islamabad"],
  categories: ["Excavator", "Loader", "Bulldozer"],
};

type HeavyMachineryFormData = {
  model: string;
  transmission: string;
  fuelType: string;
  steering: string;
  condition: string;
  axleConfig: string;
  color: string;
  constructionYear: string;
  operationalHours: string;
  price: string;
  inventoryLocation: string;
  hotLocation: string;
  category: string;
  adminNote: string;
  description: string;
};

export default function HeavyMachineryForm() {
  const [formData, setFormData] = useState<HeavyMachineryFormData>({
    model: "",
    transmission: "",
    fuelType: "",
    steering: "",
    condition: "",
    axleConfig: "",
    color: "",
    constructionYear: "",
    operationalHours: "",
    price: "",
    inventoryLocation: "",
    hotLocation: "",
    category: "",
    adminNote: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white max-w-5xl mx-auto mt-10">
    <h2 className="text-2xl font-bold mb-6">Add Vehicle Listing</h2>

    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { label: "Model", name: "model", options: options.models },
        { label: "Transmission", name: "transmission", options: options.transmissions },
        { label: "Fuel Type", name: "fuelType", options: options.fuelTypes },
        { label: "Steering", name: "steering", options: options.steerings },
        { label: "Condition", name: "condition", options: options.conditions },
        { label: "Axle Config", name: "axleConfig", options: options.axleConfigs },
        { label: "Color", name: "color", options: options.colors },
        { label: "Inventory Location", name: "inventoryLocation", options: options.locations },
        { label: "Hot Location", name: "hotLocation", options: options.locations },
        { label: "Category", name: "category", options: options.categories },
      ].map(({ label, name, options }) => (
        <select
          key={name}
          name={name}
          value={formData[name as keyof HeavyMachineryFormData]}
          onChange={handleChange}
          className="input bg-white px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200 placeholder:text-gray-400"
        >
          <option value="">{`Select ${label}`}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ))}

      <input
        type="text"
        name="constructionYear"
        placeholder="Construction Year"
        value={formData.constructionYear}
        onChange={handleChange}
        className="input bg-white px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200 placeholder:text-gray-400"
        />

      <input
        type="text"
        name="operationalHours"
        placeholder="Operational Hours"
        value={formData.operationalHours}
        onChange={handleChange}
        className="input bg-white px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200 placeholder:text-gray-400"
        />

      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="input bg-white px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200 placeholder:text-gray-400"
        />

      <textarea
        name="adminNote"
        placeholder="Admin Note"
        value={formData.adminNote}
        onChange={handleChange}
        className="input bg-white px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200 placeholder:text-gray-400"
        />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="input bg-white px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200 placeholder:text-gray-400"
        />

      <div className="col-span-3 flex gap-4">
        <button type="button"  className="mt-6 w-40 p-3 rounded-xl bg-red-100 text-red-600
                        hover:bg-red-200 transition-all duration-300
                        flex items-center justify-center gap-2 font-semibold">
          Upload Featured Image
        </button>
        <button type="button"  className="mt-6 w-40 p-3 rounded-xl bg-red-100 text-red-600
                        hover:bg-red-200 transition-all duration-300
                        flex items-center justify-center gap-2 font-semibold">
          Upload Additional Images
        </button>
      </div>
      <div className="md:col-span-2">
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
  );
}
