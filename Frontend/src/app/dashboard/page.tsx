"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/ui/sidebar";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import AccessRequired from "@/components/functional/accessRequired";
import { useRouter } from "next/navigation";
import StatCard from "@/components/functional/statCard";
import { CarDetailsTable } from "@/components/ui/table"; // Ensure correct import
import FormInputGrid from "@/components/functional/formInputGrid";
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { toast } from "sonner";

export default function Dashboard() {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cars, setCars] = useState<any[]>([]);
    const [selectedCar, setSelectedCar] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
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
        // imageUrl: "",
        imageBase64: "",
        color: "",
        fuelType: "",
        transmission: "",
        userId: "", // This will be set from JWT or localStorage
    });

    const router = useRouter();

    // Fetch token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            router.push("/");
        } else {
            setToken(storedToken);
        }

        setIsLoading(false);
    }, []);

    // Set userId from JWT or localStorage when the component loads
    useEffect(() => {
        const storedUserId = getUserIdFromToken() || localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
            setFormData((prev) => ({
                ...prev,
                userId: storedUserId, // Updating formData with the correct userId
            }));
        }
    }, []);

    // Fetch car data after token is available
    useEffect(() => {
        if (token) {
            fetchCars();
        }
    }, [token]);

    const fetchCars = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsLoading(false);
            setError("No token found. Please sign in.");
            return;
        }

        try {
            const res = await fetch("https://backend-portal-l8rn.onrender.com/api/cars/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            console.log('Fetched cars:', data);

            if (res.status === 401 || data.message === 'Unauthorized, JWT token is wrong or expired') {
                setIsLoading(false);
                setError("Unauthorized, JWT token is wrong or expired");
                toast.error("Unauthorized, JWT token is wrong or expired");
                router.push('/'); // Redirect to login page after showing error         
            }
            if (Array.isArray(data.cars)) {
                setCars(data.cars); // ✅ Correctly accessing the cars array
            } else {
                setCars([]); // No cars found or bad format
                // console.error('Fetched data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
            setIsLoading(false);
            setError("Error fetching cars");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const carData = { ...formData };

        try {
            const response = await fetch("https://backend-portal-l8rn.onrender.com/api/cars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(carData),
            });

            if (!response.ok) {
                const error = await response.json();
                console.log("Failed to create car", error);
                toast.error(`❌ ${error instanceof Error ? error.message : "Error submitting form"}`);
            }

            if (!formData.make || !formData.modelName || !formData.userId) {
                toast.error("⚠️ Required fields are missing!");
                return;
            }
            const result = await response.json();
            console.log("Car created successfully:", result);
            toast.success("✅ Car registered successfully!");


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
                // imageUrl: "",
                imageBase64: "",
                color: "",
                fuelType: "",
                transmission: "",

                userId: userId || "", // Ensure userId is set
            });

            fetchCars();
        } catch (error) {
            console.error("Error creating car:", error);
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,

        }));
    };
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setFormData(prev => ({
                ...prev,
                imageBase64: base64String  // ✅ sahi key
            }));
        };
        reader.readAsDataURL(file);
    };


    if (isLoading) return <LoadingSpinner />;
    if (!token) return <AccessRequired />;


    const recentCar = cars.length > 0 ? cars[cars.length - 1] : null;
    const cityCount = Array.isArray(cars) ? new Set(cars.map((car) => car.registrationCity)).size : 0;


    return (
        <div className="min-h-screen bg-gray-900 p-0 flex">
            <Sidebar
                cars={cars}
                onCarClick={setSelectedCar}
                onLogout={() => {
                    localStorage.removeItem("token");
                    router.push("/");
                }}
                children={undefined}
            />

            {/* Remove rounded and margin */}
            <div className="flex-1 bg-white shadow-2xl border border-gray-200">
                <div className="p-8">
                    <h2 className="text-4xl font-extrabold mb-8 text-black">
                        Car Registration Dashboard ✨
                    </h2>

                    {error && <div className="text-red-500 mb-4">Error: {error}</div>}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <StatCard
                            title="Latest Car Registered"
                            value={recentCar ? `${recentCar.make} ${recentCar.modelName}` : "No cars yet"}
                            fromColor="black"
                            toColor="black"
                        />
                        <StatCard
                            title="Total Cars Registered"
                            value={cars.length.toString()}
                            fromColor="black"
                            toColor="black"
                        />
                        <StatCard
                            title="Cities Registered From"
                            value={cityCount.toString()}
                            fromColor="black"
                            toColor="black"
                        />
                    </div>

                    {showForm && (
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <FormInputGrid
                                formData={formData}
                                handleChange={handleChange}
                                handleBooleanChange={(name: string, value: boolean) => {
                                    setFormData((prev) => ({ ...prev, [name]: value }));
                                }}
                                handleValueChange={(name: string, value: string) => {
                                    setFormData((prev) => ({ ...prev, [name]: value }));
                                }}
                                handleImageUpload={handleImageUpload}
                            />
                            <div className="flex justify-end gap-4">
                                <Button
                                    type="submit"
                                    className="mt-6 w-40 p-3 rounded-xl bg-red-100 text-red-600
                                            hover:bg-red-200 transition-all duration-300
                                            flex items-center justify-center gap-2 font-semibold"
                                >
                                    Submit
                                </Button>
                                <Button
                                    onClick={() => setShowForm(!showForm)}
                                    className="mt-6 w-40 p-3 rounded-xl bg-red-100 text-red-600
                                            hover:bg-red-200 transition-all duration-300
                                            flex items-center justify-center gap-2 font-semibold"
                                >
                                    {showForm ? "Close Form" : "Add New Car"}
                                </Button>
                            </div>
                        </form>
                    )}

                    {!showForm && (
                        <div className="flex justify-end mb-6 sticky top-0 z-10 bg-white py-4">
                            <Button
                                onClick={() => setShowForm(!showForm)}
                                className="mt-6 w-40 p-3 rounded-xl bg-red-100 text-red-600
                                        hover:bg-red-200 transition-all duration-300
                                        flex items-center justify-center gap-2 font-semibold"
                            >
                                {showForm ? "Close Form" : "Add New Car"}
                            </Button>
                        </div>
                    )}
                    {selectedCar && <CarDetailsTable car={selectedCar} />}
                </div>
            </div>
        </div>

    )
}