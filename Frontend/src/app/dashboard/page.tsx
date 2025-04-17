"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/ui/sidebar";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import AccessRequired from "@/components/functional/accessRequired";
import { useRouter } from "next/navigation";
import StatCard from "@/components/functional/statCard";
import { CarDetailsTable } from "@/components/ui/table"; // Ensure correct import
// import FormInputGrid from "@/components/functional/formInputGrid";
import { getUserDetailsFromToken, getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { toast } from "sonner";
import Logo from "@/components/ui/logo";
// import HeavyMachineryForm from "@/components/functional/formForHeavyMachinery";
// import TruckForm from "@/components/functional/formForTrucks";
// import CarForm from "@/components/functional/formForCar";
import { carsRegistration } from "@/lib/types/typeCarsRegistration";
import { truckRegistration } from "@/lib/types/typeTruckRegistration";
import { heavyMachineryRegistration } from "@/lib/types/typeheavyMachineryRegistration";


export default function Dashboard() {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cars, setCars] = useState<any[]>([]);
    const [trucks, setTrucks] = useState<any[]>([]);
    const [heavy, setHeavy] = useState<any[]>([]);
    const [selectedCar, setSelectedCar] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [activeForm, setActiveForm] = useState<"car" | "truck" | "heavy" | null>(null);

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
        imageBase64: "",
        color: "",
        fuelType: "",
        transmission: "",
        userId: "", // This will be set from JWT or localStorage
    });

    const router = useRouter();


    const [userName, setUserName] = useState<string>("");

 // Fetch token and user details on component mount
 useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Decoded user details:", getUserDetailsFromToken());

    if (!storedToken) {
        router.push("/"); // If no token, redirect to login page
        return;
    }

    const user = getUserDetailsFromToken();
    if (user) {
        setUserName(user.name); 

            setUserId(user.id);  // Set user ID
            }

    setToken(storedToken);  // Set token
    setIsLoading(false);  // Loading complete
}, []);


// Optional: If you want to handle userId separately in another useEffect (for specific purposes)
useEffect(() => {
    const storedUserId = getUserIdFromToken() || localStorage.getItem("userId");
    if (storedUserId) {
        setUserId(storedUserId);
    }
}, []);

// Fetch car data after token is available and userId exists
useEffect(() => {
    if (token && userId) {
        fetchCars();
        fetchTrucks();
        fetchHeavyMachinery();
    }
}, [token, userId]);

const fetchCars = async () => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken() || localStorage.getItem("userId");

    if (!token) {
        setIsLoading(false);
        setError("No token found. Please sign in.");
        return;
    }

    if (!userId) {
        setIsLoading(false);
        setError("No user ID found. Please sign in again.");
        return;
    }

    try {
        const res = await fetch(`https://backend-portal-hinb.onrender.com/api/cars?userId=${userId}`, {
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
            router.push('/');        
        }

        if (Array.isArray(data.cars)) {
            // Map the cars to ensure the imageBase64 key is used
            const mappedCars = data.cars.map((car: carsRegistration) => ({
                ...car,
                imageBase64: car.imageBase64, // Mapping imageUrl to imageBase64
            }));
            setCars(mappedCars.filter((car: { userId: string; }) => car.userId === userId));
        } else {
            setCars([]);
        }
    } catch (error) {
        console.error('Error fetching cars:', error);
        setIsLoading(false); 
        setError("Error fetching cars");
    }
};

const fetchTrucks = async () => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken() || localStorage.getItem("userId");

    if (!token) {
        setIsLoading(false);
        setError("No token found. Please sign in.");
        return;
    }

    if (!userId) {
        setIsLoading(false);
        setError("No user ID found. Please sign in again.");
        return;
    }

    try {
        const res = await fetch(`https://backend-portal-hinb.onrender.com/api/truck?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        console.log('Fetched trucks:', data);

        if (res.status === 401 || data.message === 'Unauthorized, JWT token is wrong or expired') {
            setIsLoading(false);
            setError("Unauthorized, JWT token is wrong or expired");
            toast.error("Unauthorized, JWT token is wrong or expired");
            router.push('/');
        }

        if (Array.isArray(data.trucks)) {
            const mappedTrucks = data.trucks.map((truck: truckRegistration) => ({
                ...truck,
                imageBase64: truck.imageBase64, // preserve base64
            }));
            setTrucks(mappedTrucks.filter((truck: { userId: string }) => truck.userId === userId));
        } else {
            setTrucks([]);
        }
    } catch (error) {
        console.error('Error fetching trucks:', error);
        setIsLoading(false);
        setError("Error fetching trucks");
    }
};
const fetchHeavyMachinery = async () => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken() || localStorage.getItem("userId");

    if (!token) {
        setIsLoading(false);
        setError("No token found. Please sign in.");
        return;
    }

    if (!userId) {
        setIsLoading(false);
        setError("No user ID found. Please sign in again.");
        return;
    }

    try {
        const res = await fetch(`https://backend-portal-hinb.onrender.com/api/heavy?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        console.log("Fetched heavy machinery:", data);

        if (res.status === 401 || data.message === "Unauthorized, JWT token is wrong or expired") {
            setIsLoading(false);
            setError("Unauthorized, JWT token is wrong or expired");
            toast.error("Unauthorized, JWT token is wrong or expired");
            router.push('/');
            return;
        }

        // 🔑 Check correct key from backend
        if (Array.isArray(data.heavyMachineries)) {
            const mappedHeavy = data.heavyMachineries.map((machine: heavyMachineryRegistration) => ({
                ...machine,
                imageBase64: machine.imageBase64,
            }));

            setHeavy(mappedHeavy.filter((machine: { userId: string }) => machine.userId === userId));
        } else {
            setHeavy([]);
        }

        setIsLoading(false);
    } catch (error) {
        console.error('Error fetching heavy machinery:', error);
        setIsLoading(false);
        setError("Error fetching heavy machinery");
    }
};

    if (isLoading) return <LoadingSpinner />;
    if (!token) return <AccessRequired />;


    const recentCar = cars.length > 0 ? cars[cars.length - 1] : null;
    const cityCount = Array.isArray(cars) ? new Set(cars.map((car) => car.registrationCity)).size : 0;


    return (
        <div className="min-h-screen bg-gray-900 p-0 flex">

            <div className="absolute top-1 right-1 z-10 md:block hidden">
                <Logo />
            </div>
            <Sidebar
                cars={cars}
                onCarClick={setSelectedCar}
                onLogout={() => {
                    localStorage.removeItem("token");
                    router.push("/");
                } }
                children={undefined}
                trucks={trucks}
                 heavyMachinery={heavy}                
                  />


            {/* Remove rounded and margin */}
            <div className="flex-1 bg-white shadow-2xl border border-gray-200 ">
                <div className="p-8">
                    <div className="md:hidden block mb-4">
                        <Logo />
                    </div>
                    <h2 className="text-4xl font-extrabold mb-8 text-black text-center">
                        Universal Motors Registration Dashboard
                    </h2>

                    {error && <div className="text-red-500 mb-4">Error: {error}</div>}

                    <div className="text-center mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-lg">
                        <h2 className="text-2xl text-gray-700 mb-4">
                            Welcome back,
                            <span className="font-bold text-4xl ml-2 inline-block transform hover:scale-110 transition-all duration-300 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent animate-pulse hover:animate-none hover:shadow-lg">
                                {userName}
                            </span>
                        </h2>
                        <h2 className="text-xl text-gray-600 mb-4 font-medium">
                            Your trusted platform for vehicle management and registration
                        </h2>
                        <h2 className="text-lg text-gray-500 mt-4 font-medium">
                            You have registered
                            <span className="font-bold text-red-500 mx-2">{cars.length}</span>
                            vehicles across
                            <span className="font-bold text-red-500 mx-2">
                                {new Set(cars.map(car => car.registrationCity)).size}
                            </span>
                            cities
                        </h2>
                        
                            </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-16">



                        <StatCard
                            title="Latest Car Registered"
                            value={recentCar ? `${recentCar.make} ${recentCar.model}` : "No cars yet"}
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

                    <div>
                        <div className="flex flex-col items-center mb-6">
                            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                                Choose Your Vehicle Type for Registration
                                <p className="text-lg font-normal text-gray-600 mt-2">
                                    Whether you're registering a personal vehicle, commercial truck, or heavy machinery -
                                    we've got you covered with our specialized registration forms
                                </p>
                                <div className="flex justify-center gap-4 mt-4">
                                    <span className="text-sm text-gray-500">✓ Fast Processing</span>
                                    <span className="text-sm text-gray-500">✓ Secure Registration</span>
                                    <span className="text-sm text-gray-500">✓ 24/7 Support</span>
                                </div>
                            </h2>

                            <div className="flex gap-4 justify-center w-full max-w-3xl">
                                <Button
                                    className="p-3 rounded-xl bg-red-100 text-red-600
            hover:bg-red-200 transition-all duration-300
            flex items-center justify-center gap-2 font-semibold"
                                    onClick={() => {
                                        setActiveForm("car");
                                        router.push("/carsRegistration");
                                    }}
                                    variant={activeForm === "car" ? "default" : "outline"}
                                >
                                    Car Registration
                                </Button>

                                <Button
                                    className="p-3 rounded-xl bg-red-100 text-red-600
            hover:bg-red-200 transition-all duration-300
            flex items-center justify-center gap-2 font-semibold"
                                    onClick={() =>{ setActiveForm("truck")
                                        router.push("/truckRegistration");
                                    }}
                                    variant={activeForm === "truck" ? "default" : "outline"}
                                >
                                    Truck Registration
                                </Button>

                                <Button
                                    className="p-3 rounded-xl bg-red-100 text-red-600
            hover:bg-red-200 transition-all duration-300
            flex items-center justify-center gap-2 font-semibold"
                                    onClick={() => {setActiveForm("heavy")
                                        router.push("/heavyMachineryRegistration");
                                    }}
                                    variant={activeForm === "heavy" ? "default" : "outline"}
                                >
                                    Heavy Machinery Registration
                                </Button>
                            </div>
                        </div>
                        {/* {activeForm === "car" && (
                            <CarForm />
                        )} */}

                        {/* {activeForm === "truck" && (
                            <TruckForm />
                        )} */}
                        {/* {activeForm === "heavy" && (
                            <HeavyMachineryForm />
                        )} */}
                    </div>
                    {selectedCar && <CarDetailsTable car={selectedCar} />}
                </div>
            </div>
        </div>
    )}