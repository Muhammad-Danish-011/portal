'use client';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { carFormSchema } from '../../components/functional/FormValidations/carValidation';
import { getUserIdFromToken } from '@/utils/getUserIdFromToken';
import { toast } from 'sonner';
import { carsRegistration } from '@/lib/types/typeCarsRegistration';

const FormForCar = () => {
    const model = ['Civic', 'Corolla', 'City', 'Swift', 'Cultus', 'Alto'];
    const makes = ['Toyota', 'Honda', 'Suzuki'];
    const conditions = ['New', 'Used', 'Certified'];
    const inventoryLocations = ['Karachi', 'Lahore', 'Islamabad'];
    const transmissions = ['Automatic', 'Manual'];
    const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
    const drivetrains = ['FWD', 'RWD', 'AWD', '4WD'];
    const hotLocations = ['Featured', 'Hot Sale', 'Discounted'];
    const steerings = ['Right', 'Left'];
    const colors = ['White', 'Black', 'Red', 'Blue', 'Gray'];
    const bodyTypes = ['SUV', 'Sedan', 'Hatchback', 'Pickup'];
    const carOptions = ['AC', 'Power Steering', 'ABS', 'Airbags'];
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // lib/submitVehicleForm.ts

    const [formData, setFormData] = useState<carsRegistration>({
        imageBase64: '',
        listingTitle: '',
        make: '',
        model: '',
        condition: '',
        inventoryLocation: '',
        transmission: '',
        fuelType: '',
        bodyType: '',
        color: '',
        year: 0,
        mileage: 0,
        price: 0,
        description: '',
        drivetrain: '',
        hotLocation: '',
        steering: '',
        engineSize: 0,
        doors: 0,
        seats: 0,
        modelCode: '',
        auctionGrade: '',
        loadingCapacity: 0,
        engineNumber: '',
        chassisNo: '',
        dimensionLength: 0,
        dimensionWidth: 0,
        dimensionHeight: 0,
        carOptions: [],
        vin: '',
        stockNumber: '',
        dealerStock: false,
        userId: '',
    });

    useEffect(() => {
        const storedUserId = getUserIdFromToken() || localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
            setFormData((prev) => ({
                ...prev,
                userId: storedUserId,
            }));
        }
    }, []);


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

    const handleSubmit = async (formData: carsRegistration) => {
        console.log("Form submitted with data:", formData);

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("🔐 No token found. Please sign in.");
            return;
        }

        if (!formData.make || !formData.model || !formData.userId) {
            toast.error("⚠️ Required fields are missing!");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch("https://backend-portal-hinb.onrender.com/api/cars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                console.error("API error:", data);
                toast.error(`❌ ${data.message || "Failed to create car"}`);
                return;
            }
            toast.success("✅ Car listed successfully!");
            window.location.href = '/dashboard';
            // Optionally reset form or trigger a refetch
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("❌ An error occurred during submission.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 rounded-2xl shadow-lg bg-white w-full min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Vehicle Listing</h2>

            <Formik
                initialValues={{
                    listingTitle: '',
                    dealerStock: false,
                    make: '',
                    model: '',
                    condition: '',
                    inventoryLocation: '',
                    transmission: '',
                    fuelType: '',
                    drivetrain: '',
                    hotLocation: '',
                    steering: '',
                    color: '',
                    bodyType: '',
                    engineSize: 0,
                    year: 0,
                    price: 0,
                    doors: 0,
                    seats: 0,
                    modelCode: '',
                    auctionGrade: '',
                    loadingCapacity: 0,
                    mileage: 0,
                    engineNumber: '',
                    chassisNo: '',
                    dimensionLength: 0,
                    dimensionWidth: 0,
                    dimensionHeight: 0,
                    carOptions: [],
                    vin: '',
                    stockNumber: '',
                    userId: userId || '',
                    imageBase64: '',
                    description: '',
                }}
                validationSchema={carFormSchema}
                onSubmit={(values) => {
                    const finalData = {
                        ...values,
                        imageBase64: formData.imageBase64,
                        userId: userId || '',
                        dealerStock: values.dealerStock,
                        listingTitle: values.listingTitle,
                        make: values.make,
                        model: values.model,
                        condition: values.condition,
                        inventoryLocation: values.inventoryLocation,
                        transmission: values.transmission,
                        fuelType: values.fuelType,
                        drivetrain: values.drivetrain,
                        hotLocation: values.hotLocation,
                        steering: values.steering,
                        color: values.color,
                        bodyType: values.bodyType,
                        year: Number(values.year),
                        price: Number(values.price),
                        mileage: Number(values.mileage),
                        engineSize: Number(values.engineSize),
                        doors: Number(values.doors),
                        seats: Number(values.seats),
                        loadingCapacity: Number(values.loadingCapacity),
                        dimensionLength: Number(values.dimensionLength),
                        dimensionWidth: Number(values.dimensionWidth),
                        dimensionHeight: Number(values.dimensionHeight),
                        carOptions: Array.isArray(values.carOptions) ? values.carOptions : [values.carOptions],
                        stockNumber: values.stockNumber,
                        vin: values.vin,
                        auctionGrade: values.auctionGrade,
                        modelCode: values.modelCode,
                        chassisNo: values.chassisNo,
                        engineNumber: values.engineNumber,
                        description: values.description
                    };
                    handleSubmit(finalData);
                }}
            >
                {() => (
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-lg">
                        {/* Common Form Group */}
                        {[
                            { label: "Listing Title", name: "listingTitle", type: "text" },
                            { label: "Engine Size (cc)", name: "engineSize", type: "number" },
                            { label: "Year", name: "year", type: "number" },
                            { label: "Price", name: "price", type: "number" },
                            { label: "Number of Doors", name: "doors", type: "number" },
                            { label: "Number of Seats", name: "seats", type: "number" },
                            { label: "Model Code", name: "modelCode", type: "text" },
                            { label: "Auction Grade", name: "auctionGrade", type: "text" },
                            { label: "Loading Capacity (kg)", name: "loadingCapacity", type: "number" },
                            { label: "Mileage (km)", name: "mileage", type: "number" },
                            { label: "Engine Number", name: "engineNumber", type: "text" },
                            { label: "Chassis Number", name: "chassisNo", type: "text" },
                            { label: "Length (mm)", name: "dimensionLength", type: "number" },
                            { label: "Width (mm)", name: "dimensionWidth", type: "number" },
                            { label: "Height (mm)", name: "dimensionHeight", type: "number" },
                            { label: "VIN", name: "vin", type: "text" },
                            { label: "Stock Number", name: "stockNumber", type: "text" },
                        ].map((field) => (
                            <div key={field.name} className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">{field.label}</label>
                                <Field
                                    type={field.type}
                                    name={field.name}
                                    className={`w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-400 focus:outline-none ${field.type === "checkbox" ? "w-fit ml-2" : ""
                                        }`}
                                />
                                <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
                            </div>
                        ))}

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Dealer Stock</label>
                            <Field
                                type="checkbox"
                                name="dealerStock"
                                className="w-fit ml-2 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
                            />
                            <ErrorMessage name="dealerStock" component="div" className="text-red-500 text-sm" />
                        </div>
                        {/* Select Dropdowns */}
                        {[
                            { label: "Make", name: "make", options: makes },
                            { label: "Model", name: "model", options: model },
                            { label: "Condition", name: "condition", options: conditions },
                            { label: "Inventory Location", name: "inventoryLocation", options: inventoryLocations },
                            { label: "Transmission", name: "transmission", options: transmissions },
                            { label: "Fuel Type", name: "fuelType", options: fuelTypes },
                            { label: "Drivetrain", name: "drivetrain", options: drivetrains },
                            { label: "Hot Location", name: "hotLocation", options: hotLocations },
                            { label: "Steering", name: "steering", options: steerings },
                            { label: "Color", name: "color", options: colors },
                            { label: "Body Type", name: "bodyType", options: bodyTypes },
                        ].map((dropdown) => (
                            <div key={dropdown.name} className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">{dropdown.label}</label>
                                <Field
                                    as="select"
                                    name={dropdown.name}
                                    className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-red-400"
                                >
                                    <option value="">Select {dropdown.label}</option>
                                    {dropdown.options.map((opt: string) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name={dropdown.name} component="div" className="text-red-500 text-sm" />
                            </div>
                        ))}

                        {/* Multi-select */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Car Options</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {carOptions.map((option) => (
                                    <label
                                        key={option}
                                        className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl hover:bg-red-100 transition-all duration-200"
                                    >
                                        <Field
                                            type="checkbox"
                                            name="carOptions"
                                            value={option}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                        />
                                        <span className="text-gray-700 text-sm">{option}</span>
                                    </label>
                                ))}
                            </div>
                            <ErrorMessage name="carOptions" component="div" className="text-red-500 text-sm" />
                        </div>


                        {/* Image Upload */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Car Image</label>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="w-full border border-gray-300 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-red-100 file:text-red-600 hover:file:bg-red-200"
                            />
                            <ErrorMessage name="imageBase64" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Description - Full Width */}
                        <div className="md:col-span-2 flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <Field
                                as="textarea"
                                name="description"
                                rows={5}
                                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-400"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-end space-x-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                            <button
                                type="button"
                                onClick={() => window.location.href = '/dashboard'}
                                className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 disabled:opacity-50"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </Form>

                )}
            </Formik>
        </div>
    )
}
export default FormForCar;