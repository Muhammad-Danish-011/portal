'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import Textarea from "@/components/ui/textarea";

type Car = {
  make: string;
  model: string;
  year: string;
  mileage: string;
  transmission: string;
  fuelType: string;
  color: string;
  price: string;
  registrationCity: string;
  vinNumber: string;
  numberOfDoors: string;
  engineSize: string;
  description: string;
  imageUrl: string;
};



export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [selectedView, setSelectedView] = useState<string>('');
  const [formData, setFormData] = useState<Car>({
    make: "", model: "", year: "", mileage: "", transmission: "",
    fuelType: "", color: "", price: "", registrationCity: "",
    vinNumber: "", numberOfDoors: "", engineSize: "", description: "", imageUrl: ""
  });

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch cars from your API or server
    const fetchCars = async () => {
        try {
            const res = await fetch('/api/car'); // Adjust the endpoint to your API
            const data = await res.json();
            if (res.ok) {
                setCars(data); // Set the fetched data
            }
        } catch (err) {
            console.error("Failed to fetch cars", err);
        }
    };

    fetchCars();
}, []); // Fetch data once when the component mounts


  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/car', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      alert(result.message);
      if (res.ok) {
        setCars([...cars, formData]);
        setFormData({
          make: "", model: "", year: "", mileage: "", transmission: "", fuelType: "", color: "",
          price: "", registrationCity: "", vinNumber: "", numberOfDoors: "", engineSize: "", description: "", imageUrl: ""
        });
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const recentCar = cars[cars.length - 1];
  const cityCount = new Set(cars.map(car => car.registrationCity)).size;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="ml-8 bg-gray-800 p-6 rounded-xl flex-1 text-white">
          <p>Loading cars...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="ml-8 bg-gray-800 p-6 rounded-xl flex-1 text-white">
          <p>Error: {error}</p>
        </div>
      );
    }

    switch(selectedView) {
      case 'totalCars':
        return (
          <div className="ml-8 bg-gray-800 p-6 rounded-xl flex-1">
            <h2 className="text-2xl text-white mb-4">Total Cars: {cars.length}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cars.map((car, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg text-white">
                  <h3>{car.make} {car.model}</h3>
                  <p>Year: {car.year}</p>
                  <p>Price: Rs. {car.price}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'recentCar':
        return recentCar ? (
          <div className="ml-8 bg-gray-800 p-6 rounded-xl flex-1 text-white">
            <h2 className="text-2xl mb-4">Most Recent Car</h2>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3>{recentCar.make} {recentCar.model}</h3>
              <p>Year: {recentCar.year}</p>
              <p>Mileage: {recentCar.mileage}</p>
              <p>Price: Rs. {recentCar.price}</p>
              <p>Description: {recentCar.description}</p>
            </div>
          </div>
        ) : null;
      case 'cityCount':
        return (
          <div className="ml-8 bg-gray-800 p-6 rounded-xl flex-1 text-white">
            <h2 className="text-2xl mb-4">Cities Coverage</h2>
            <p>Cars registered in {cityCount} different cities</p>
            <div className="mt-4">
              {Array.from(new Set(cars.map(car => car.registrationCity))).map((city, index) => (
                <div key={index} className="bg-gray-700 p-2 rounded mb-2">
                  {city}
                </div>
              ))}
            </div>
          </div>
        );
      case 'form':
        return (
          <div className="ml-8 bg-gray-800 p-6 rounded-xl flex-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Add your form fields here */}
            </form>
          </div>
        );
      default:
        return (
          <div className="ml-8 bg-gray-800 p-6 rounded-xl flex-1 text-white">
            <h2 className="text-2xl">Welcome to Dashboard</h2>
            <p>Please select an option from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 flex">
      <div className="w-64 bg-gray-800 text-white p-6 rounded-xl shadow-md">
  <h1 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-4">Dashboard</h1>
  <ul className="space-y-2">
    <li>
      <button 
        onClick={() => setSelectedView('totalCars')}
        className={`w-full py-3 px-4 rounded-lg transition-all duration-200 ${
          selectedView === 'totalCars' 
            ? 'bg-blue-600 text-white' 
            : 'hover:bg-gray-700 text-gray-300 hover:text-white'
        }`}
      >
        Total Cars
      </button>
    </li>
    <li>
      <button 
        onClick={() => setSelectedView('recentCar')}
        className={`w-full py-3 px-4 rounded-lg transition-all duration-200 ${
          selectedView === 'recentCar'
            ? 'bg-blue-600 text-white'
            : 'hover:bg-gray-700 text-gray-300 hover:text-white'
        }`}
      >
        Recent Car
      </button>
    </li>
    <li>
      <button 
        onClick={() => setSelectedView('cityCount')}
        className={`w-full py-3 px-4 rounded-lg transition-all duration-200 ${
          selectedView === 'cityCount'
            ? 'bg-blue-600 text-white'
            : 'hover:bg-gray-700 text-gray-300 hover:text-white'
        }`}
      >
        Cities Count
      </button>
    </li>

  </ul>
</div>      {renderContent()}
    </div>
  );
}
