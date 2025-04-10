import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radioGroup";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface FormData {
  stockId: string;
  make: string;
  modelName: string;
  year: string;
  mileage: number;
  trim: string;
  additionalInfoEn: string;
  additionalInfoAr: string;
  saudiSwitch: boolean;
  price: number;
  registrationCity: string;
  description: string;
  engineSize?: string;
  exportOption?: string;
  imageUrl: string;
  vinNumber?: string;
  numberOfDoors?: number;
  color: string;
  fuelType: string;
  transmission: string;
  userId: string;
}

interface FormInputGridProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBooleanChange: (name: string, value: boolean) => void;
  handleValueChange: (name: string, value: string) => void;
}

const FormInputGrid: React.FC<FormInputGridProps> = ({
  formData,
  handleChange,
  handleBooleanChange,
  handleValueChange,
}) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white shadow-lg rounded-lg space-y-8 p-6">
      {/* GENERAL CAR DETAILS */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">
          General Car Details
        </h2>

        <div className="mb-6">
          <Label htmlFor="stockId" className="text-gray-700">Stock ID (Optional)</Label>
          <Input
            id="stockId"
            name="stockId"
            value={formData.stockId}
            onChange={handleChange}
            placeholder="Add your own ID"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="make" className="text-gray-700">Make</Label>
            <Select onValueChange={(value: string) => handleValueChange("make", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Toyota">Toyota</SelectItem>
                <SelectItem value="Honda">Honda</SelectItem>
                <SelectItem value="Nissan">Nissan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model" className="text-gray-700">Model</Label>
            <Input
              id="model"
              name="modelName"
              value={formData.modelName}
              onChange={handleChange}
              placeholder="Enter Model"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year" className="text-gray-700">Year</Label>
            <Select onValueChange={(value: string) => handleValueChange("year", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(30)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="mileage" className="text-gray-700">Mileage</Label>
            <Input
              id="mileage"
              name="mileage"
              type="number"
              value={formData.mileage}
              onChange={handleChange}
              placeholder="Enter Kilometers"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trim" className="text-gray-700">Trim</Label>
            <Input
              id="trim"
              name="trim"
              value={formData.trim}
              onChange={handleChange}
              placeholder="Enter Trim"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className="text-gray-700">Color</Label>
            <Input
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Enter Color"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="transmission" className="text-gray-700">Transmission</Label>
            <Select onValueChange={(value: string) => handleValueChange("transmission", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelType" className="text-gray-700">Fuel Type</Label>
            <Select onValueChange={(value: string) => handleValueChange("fuelType", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Fuel Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gasoline">Gasoline</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="additionalInfoEn" className="text-gray-700">Additional Info (English)</Label>
            <Textarea
              id="additionalInfoEn"
              name="additionalInfoEn"
              value={formData.additionalInfoEn}
              onChange={handleChange}
              placeholder="Enter Additional Info in English"
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfoAr" className="text-gray-700">Additional Info (Arabic)</Label>
            <Textarea
              id="additionalInfoAr"
              name="additionalInfoAr"
              value={formData.additionalInfoAr}
              onChange={handleChange}
              placeholder="Enter Additional Info in Arabic"
              className="min-h-[120px]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <Label htmlFor="saudiSwitch" className="text-gray-700">Sell on Saudi Search</Label>
          <Switch
            id="saudiSwitch"
            checked={formData.saudiSwitch}
            onCheckedChange={(checked: boolean) => handleBooleanChange("saudiSwitch", checked)}
          />
        </div>
      </div>

      {/* EXPORT OPTIONS */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">
          Export Options
        </h2>
        <RadioGroup
          defaultValue="canExport"
          className="space-y-4"
          onValueChange={(value: string) => handleValueChange("exportOption", value)}
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="canExport" id="canExport" />
            <Label htmlFor="canExport" className="text-gray-700">Can be exported or local</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="exportOnly" id="exportOnly" />
            <Label htmlFor="exportOnly" className="text-gray-700">Export only (not available UAE)</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="uaeOnly" id="uaeOnly" />
            <Label htmlFor="uaeOnly" className="text-gray-700">Available UAE only</Label>
          </div>
        </RadioGroup>
      </div>

      {/* PRICE & TRADE-IN */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">
          Price & Trade-in
        </h2>
        <div className="space-y-2">
          <Label htmlFor="price" className="text-gray-700">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price (AED)"
            className="w-full"
          />
        </div>
      </div>

      {/* ADDITIONAL FEATURES */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">
          Additional Features
        </h2>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-700">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Additional Features / Description"
            className="min-h-[120px]"
          />
        </div>
      </div>

      {/* VEHICLE DETAILS */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">
          Vehicle Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="engineSize" className="text-gray-700">Engine Size</Label>
            <Input
              id="engineSize"
              name="engineSize"
              value={formData.engineSize}
              onChange={handleChange}
              placeholder="Enter Engine Size"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vinNumber" className="text-gray-700">VIN Number</Label>
            <Input
              id="vinNumber"
              name="vinNumber"
              value={formData.vinNumber}
              onChange={handleChange}
              placeholder="Enter VIN Number"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfDoors" className="text-gray-700">Number of Doors</Label>
            <Input
              id="numberOfDoors"
              name="numberOfDoors"
              type="number"
              value={formData.numberOfDoors}
              onChange={handleChange}
              placeholder="Enter Number of Doors"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-gray-700">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter Image URL"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationCity" className="text-gray-700">Registration City</Label>
            <Input
              id="registrationCity"
              name="registrationCity"
              value={formData.registrationCity}
              onChange={handleChange}
              placeholder="Enter Registration City"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userId" className="text-gray-700">User ID</Label>
            <Input
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Enter User ID"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FormInputGrid;
