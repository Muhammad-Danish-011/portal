// ✅ Add this at the top
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-3xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-white bg-gradient-to-r from-blue-500 to-purple-500 inline-block text-transparent bg-clip-text">
          Car Register
        </h2>

        <div className="flex justify-end">
          <Button 
            onClick={toggleForm} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {showForm ? "Close Form" : "Add New Car"}
          </Button>
        </div>
        {showForm && (
          <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input placeholder="Car Make (e.g., Toyota)" required className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Input placeholder="Car Model (e.g., Corolla)" required className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Input placeholder="Year (e.g., 2020)" required type="number" className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Input placeholder="Mileage (km)" required type="number" className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Input placeholder="Transmission (e.g., Automatic)" required className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Input placeholder="Fuel Type (e.g., Petrol)" required className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Input placeholder="Color" required className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Input placeholder="Price (AED)" required type="number" className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Input placeholder="Registration City" required className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Input placeholder="VIN Number" className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Input placeholder="Number of Doors" type="number" className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Input placeholder="Engine Size (e.g., 2.0L)" className="bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" />
            <Textarea 
              placeholder="Additional Features / Description" 
              className="md:col-span-2 bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl min-h-[120px]" 
            />
            <Input 
              placeholder="Upload Car Image URL" 
              className="md:col-span-2 bg-white text-gray-900 border-gray-300 focus:border-blue-500 rounded-xl" 
            />

            <Button 
              type="submit" 
              className="md:col-span-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Submit 
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
