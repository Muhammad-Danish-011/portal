import * as yup from 'yup';

export const heavyMachineryFormSchema = yup.object({
  listingTitle: yup.string().required('Listing Title is required'),
  make: yup.string().required('Make is required'),
  model: yup.string().required('Model is required'), 
  condition: yup.string().required('Condition is required'),
  inventoryLocation: yup.string().required('Inventory Location is required'),
  transmission: yup.string().required('Transmission is required'),
  fuelType: yup.string().required('Fuel Type is required'),
  axleConfig: yup.string().required('Axle Configuration is required'),
  hotLocation: yup.string().required('Hot Location is required'),
  steering: yup.string().required('Steering is required'),
  color: yup.string().required('Color is required'),
  category: yup.string().required('Category is required'),
  price: yup.number().nullable().transform((value) => (isNaN(value) ? 0 : value)).required('Price is required'),
  operationalHours: yup.number().nullable().transform((value) => (isNaN(value) ? 0 : value)).required('Operational Hours is required'),
  year: yup.number().nullable().transform((value) => (isNaN(value) ? 0 : value)).required('Year is required'),
  dealerStock: yup.boolean().default(false),
  imageBase64: yup.string().default(''),
  imageUrl: yup.string(),
  carOptions: yup.array().default([]).required('Car options are required'),
  description: yup.string().default(''),
  adminNotes: yup.string().default('')
});
