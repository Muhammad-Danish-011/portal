"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/ui/sidebar";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import AccessRequired from "@/components/functional/accessRequired";
import { useRouter } from "next/navigation";
import StatCard from "@/components/functional/statCard";
import CarDetailsTable from "@/components/ui/table";
import FormInputGrid from "@/components/functional/formInputGrid";

export default function Dashboard() {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cars, setCars] = useState<any[]>([]);
    const [selectedCar, setSelectedCar] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        stockId: "", // Required field
        make: "",
        modelName: "",
        year: "",
        mileage: 0, // Update this to a number (as expected by the type)
        trim: "", // Required field
        additionalInfoEn: "", // Required field
        additionalInfoAr: "", // Required field
        saudiSwitch: false, // Required field
        price: 0, // Update this to a number (as expected by the type)
        registrationCity: "",
        vinNumber: "",
        numberOfDoors: 0, // Update this to a number
        engineSize: "",
        description: "",
        imageUrl: "",
        color: "",         // Optional field
        fuelType: "",        // Optional field
        transmission: "",    // Optional field
        userId: ""    
    });

    const router = useRouter();

    // Fetch token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            router.push("/");  // Redirect to login if no token found
        } else {
            setToken(storedToken);  // Set token to state
        }

        setIsLoading(false);
    }, []);

    // Fetch car data after token is available
    useEffect(() => {
        if (token) {
            fetchCars();
        }
    }, [token]);

    // Fetch car data
    const fetchCars = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/cars");

            if (!response.ok) {
                throw new Error("Failed to fetch cars.");
            }

            const data = await response.json();
            setCars(data.cars || []);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error fetching cars");
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const carData = {
        stockId: formData.stockId,
        modelName: formData.modelName,
        mileage: formData.mileage,
        trim: formData.trim,
        additionalInfoEn: formData.additionalInfoEn,
        additionalInfoAr: formData.additionalInfoAr, 
        saudiSwitch: formData.saudiSwitch,
        price: formData.price,
        description: formData.description,
        make: formData.make,
        year: formData.year,
        registrationCity: formData.registrationCity,
        vinNumber: formData.vinNumber,
        numberOfDoors: formData.numberOfDoors,
        engineSize: formData.engineSize,
        imageUrl: formData.imageUrl,
        color:formData.color,
        fuelType:formData.fuelType ,
        transmission:formData.transmission,
        userId:formData.userId,
    };

    try {
        const response = await fetch("http://localhost:8080/api/cars", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            
            body: JSON.stringify(carData),
        });
        console.log("Car", response);
        console.log("Car", formData);


        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to create car");
        }

        const result = await response.json();
        console.log("Car created successfully:", result);
        
        // Reset form and refresh car list
        setFormData({
            stockId: "",
            make: "",
            modelName: "",
            year: "",
            mileage: 0,
            trim: "",
            additionalInfoEn: "",
            additionalInfoAr: "",
            saudiSwitch: false,
            price: 0,
            registrationCity: "",
            vinNumber: "",
            numberOfDoors: 0,
            engineSize: "",
            description: "",
            imageUrl: "",
            color: "",
            fuelType: "",
            transmission: "",
            userId: ""
        });
        setShowForm(false);
        fetchCars();
        
    } catch (error) {
        console.error("Error creating car:", error);
        setError(error instanceof Error ? error.message : "Error creating car");
    }
};    

    // Handle form field change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    // If token is not yet loaded, show loading spinner
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // If no token, show AccessRequired (redirect to login)
    if (!token) {
        return <AccessRequired />;
    }

    const recentCar = cars[cars.length - 1];
    const cityCount = new Set(cars.map((car: any) => car.registrationCity)).size;

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 flex">
            <Sidebar cars={cars} onCarClick={setSelectedCar} onLogout={() => {
                localStorage.removeItem("token");
                router.push("/");
            }} />
            <div className="flex-1 p-8 bg-white shadow-2xl rounded-3xl border border-gray-200">
                <h2 className="text-4xl font-extrabold mb-8 text-black">🚗 Car Registration Dashboard ✨</h2>
                {error && <div className="text-red-500 mb-4">Error: {error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard
                        title="Latest Car Registered"
                        value={recentCar ? `${recentCar.make} ${recentCar.model}` : 'No cars yet'}
                        fromColor="green-500"
                        toColor="emerald-500"
                    />
                    <StatCard
                        title="Total Cars Registered"
                        value={cars.length.toString()}
                        fromColor="gray-900"
                        toColor="purple-900"
                    />
                    <StatCard
                        title="Cities Registered From"
                        value={cityCount.toString()}
                        fromColor="blue-500"
                        toColor="red-500"
                    />
                </div>
                {showForm && (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <FormInputGrid
                            formData={formData}
                            handleChange={handleChange}
                            handleBooleanChange={(name: string, value: boolean) => {
                                setFormData(prev => ({
                                    ...prev,
                                    [name]: value
                                }));
                            }}
                            handleValueChange={(name: string, value: string) => {
                                setFormData(prev => ({
                                    ...prev,
                                    [name]: value
                                }));
                            }}                                             />
                        <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold">
                            Submit
                        </Button>
                    </form>
                )}
                <div className="flex justify-end mb-6 sticky top-0 z-10 bg-white py-4">
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                    >
                        {showForm ? "Close Form" : "Add New Car"}
                    </Button>
                </div>

                {/* Display selected car details if available */}
                {selectedCar && <CarDetailsTable car={selectedCar} />}
            </div>
        </div>
    );
}
