import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Car interface extending the Document interface from Mongoose
export interface ICar extends Document {
  stockId: string;
  modelName: string; // Changed from model to modelName to avoid conflict
  mileage: number;
  trim: string;
  additionalInfoEn: string;
  additionalInfoAr: string;
  saudiSwitch: boolean;
  price: number;
  description: string;
  make?: string;
  year?: string;
  exportOption?: string;
  registrationCity?: string;
  vinNumber?: string;
  numberOfDoors?: string;
  engineSize?: string;
  // imageUrl?: string;
  userId?: string;
  imageBase64?: string;
  transmission?: string;
  fuelType?: string;
  color?: string;
}

// Define the Car schema
export const carSchema: Schema<ICar> = new Schema(
  {
    stockId: { type: String, required: true },
    modelName: { type: String, required: true }, // Changed from model to modelName
    mileage: { type: Number, required: true },
    trim: { type: String, required: true },
    additionalInfoEn: { type: String, required: true },
    additionalInfoAr: { type: String, required: true },
    saudiSwitch: { type: Boolean, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    make: { type: String, required: false },
    year: { type: String, required: false },
    exportOption: { type: String, required: false },
    registrationCity: { type: String, required: false },
    vinNumber: { type: String, required: false },
    numberOfDoors: { type: String, required: false },
    engineSize: { type: String, required: false },
    // imageUrl: { type: String, required: false },
    imageBase64: { type: String, required: true },

    userId: { type: String, required: false },
    transmission: { type: String, required: false },
    fuelType: { type: String, required: false },
    color: { type: String, required: false },
  },
  { timestamps: true } // Add timestamps to the schema for createdAt and updatedAt
);

// Create a model based on the schema
const Car = mongoose.models.Car || mongoose.model<ICar>('Car', carSchema);

export default Car;
