'use client';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { getUserIdFromToken } from '@/utils/getUserIdFromToken';
import { toast } from 'sonner';
import { heavyMachineryRegistration } from '@/lib/types/typeheavyMachineryRegistration';
import { heavyMachineryFormSchema } from '@/components/functional/FormValidations/heavyMachineryValidation';
import Footer from '@/components/ui/footer';

const FormForHeavyMachinery = () => {
    const model = ['Civic', 'Corolla', 'City', 'Swift', 'Cultus', 'Alto'];
    const makes = ['Toyota', 'Honda', 'Suzuki'];
    const conditions = ['New', 'Used', 'Certified'];
    const inventoryLocations = ['Karachi', 'Lahore', 'Islamabad'];
    const transmissions = ['Automatic', 'Manual'];
    const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
    const axleConfig = ['4x2', '6x2', '6x4', '8x4'];
    const category = ['Light', 'Medium', 'Heavy'];
    const hotLocations = ['Featured', 'Hot Sale', 'Discounted'];
    const steerings = ['Right', 'Left'];
    const colors = ['White', 'Black', 'Red', 'Blue', 'Gray'];
    const carOptions = ['AC', 'Power Steering', 'ABS', 'Airbags'];
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<heavyMachineryRegistration>({
        listingTitle: '',
        make: '',
        model: '',
        condition: '',
        inventoryLocation: '',
        transmission: '',
        fuelType: '',
        axleConfig: '',
        hotLocation: '',
        steering: '',
        color: '',
        category: '',
        price: 0,
        operationalHours: 0,
        year: 0,
        dealerStock: false,
        userId: '',
        imageBase64: '',
        imageUrl: '',
        carOptions: [],
        description: '',
        adminNotes: ''
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
                imageBase64: base64String
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (formData: heavyMachineryRegistration) => {
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

            const response = await fetch("https://backend-portal-hinb.onrender.com/api/heavy", {
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
                toast.error(`❌ ${data.message || "Failed to create Heavy Machinery "}`);
                return;
            }

            toast.success("✅ Heavy Machinery listed successfully!");
            window.location.href = '/dashboard';

        } catch (error) {
            console.error("Submission error:", error);
            toast.error("❌ An error occurred during submission.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 rounded-2xl shadow-lg bg-white w-full min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Heavy Machinery Listing</h2>

            <Formik
                initialValues={{
                    listingTitle: '',
                    make: '',
                    model: '',
                    condition: '',
                    inventoryLocation: '',
                    transmission: '',
                    fuelType: '',
                    axleConfig: '',
                    hotLocation: '',
                    steering: '',
                    color: '',
                    category: '',
                    price: 0,
                    operationalHours: 0,
                    year: 0,
                    dealerStock: false,
                    userId: userId || '',
                    imageBase64: '',
                    imageUrl: '',
                    carOptions: [],
                    description: '',
                    adminNotes: ''
                }}
                validationSchema={heavyMachineryFormSchema}
                onSubmit={(values) => {
                    const finalData = {
                        ...values,
                        imageBase64: formData.imageBase64,
                        userId: userId || '',
                        price: Number(values.price),
                        operationalHours: Number(values.operationalHours),
                        year: Number(values.year),
                        carOptions: Array.isArray(values.carOptions) ? values.carOptions : [values.carOptions]
                    };
                    handleSubmit(finalData);
                }}
            >
                {() => (
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-lg">
                        {/* Common Form Fields */}
                        {[
                            { label: "Listing Title", name: "listingTitle", type: "text" },
                            { label: "Operational Hours", name: "operationalHours", type: "number" },
                            { label: "Year", name: "year", type: "number" },
                            { label: "Price", name: "price", type: "number" },
                            { label: "Admin Notes", name: "adminNotes", type: "text" }
                        ].map((field) => (
                            <div key={field.name} className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">{field.label}</label>
                                <Field
                                    type={field.type}
                                    name={field.name}
                                    className={`w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-400 focus:outline-none ${field.type === "checkbox" ? "w-fit ml-2" : ""}`}
                                />
                                <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
                            </div>
                        ))}

                        {/* Select Dropdowns */}
                        {[
                            { label: "Make", name: "make", options: makes },
                            { label: "Model", name: "model", options: model },
                            { label: "Condition", name: "condition", options: conditions },
                            { label: "Inventory Location", name: "inventoryLocation", options: inventoryLocations },
                            { label: "Transmission", name: "transmission", options: transmissions },
                            { label: "Fuel Type", name: "fuelType", options: fuelTypes },
                            { label: "Axle Config", name: "axleConfig", options: axleConfig },
                            { label: "Hot Location", name: "hotLocation", options: hotLocations },
                            { label: "Steering", name: "steering", options: steerings },
                            { label: "Color", name: "color", options: colors },
                            { label: "Category", name: "category", options: category }
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
                            <div className="flex flex-col gap-1">
                                                    <label className="text-sm font-medium text-gray-700">Dealer Stock</label>
                                                    <Field
                                                        type="checkbox"
                                                        name="dealerStock"
                                                        className="w-fit ml-2 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-400 focus:outline-none"
                                                    />
                                                    <ErrorMessage name="dealerStock" component="div" className="text-red-500 text-sm" />
                                                </div>

                        {/* Car Options */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Car Options</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {carOptions.map((option) => (
                                    <label key={option} className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl hover:bg-red-100 transition-all duration-200">
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
                            <label className="text-sm font-medium text-gray-700">Vehicle Image</label>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="w-full border border-gray-300 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-red-100 file:text-red-600 hover:file:bg-red-200"
                            />
                            <ErrorMessage name="imageBase64" component="div" className="text-red-500 text-sm" />
                        </div>
                        {/* Adminnotes */}

                        <div className="md:col-span-2 flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Admin Notes</label>
                            <Field
                                as="textarea"
                                name="adminNotes"
                                rows={5}
                                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-400"
                            />
                            <ErrorMessage name="Admin notes" component="div" className="text-red-500 text-sm" />
                        </div>
                        {/* Description */}
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
            <Footer/>
        </div>
       
    );
};

export default FormForHeavyMachinery;
