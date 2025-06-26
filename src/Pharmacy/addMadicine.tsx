import React, { useState, ChangeEvent, FormEvent } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface MedicineData {
  medicineName: string;
  medicineType: string;
  medicineDescription: string;
  medicinePrice: string;
  medicineQuantity: string;
  medicineExpiryDate: string;
  medicineManufacturer: string;
  medicineImage: string;
  medicineCategory: string;
}

const medicineCategories: string[] = [
  'Pain Relief',
  'Antibiotics',
  'Antiseptics',
  'Antacid',
  'Allergy & Cold',
  'Vitamins & Supplements',
  'Diabetes Care',
  'Cardiac Care',
  'Skin Care',
  'Eye & Ear Care',
  'First Aid',
  'Herbal & Ayurvedic',
  'Other',
];

const initialMedicineState: MedicineData = {
  medicineName: '',
  medicineType: 'Tablet',
  medicineDescription: '',
  medicinePrice: '',
  medicineQuantity: '',
  medicineExpiryDate: '',
  medicineManufacturer: '',
  medicineImage: '',
  medicineCategory: '',
};

const AddMedicineForm: React.FC = () => {
  const [medicine, setMedicine] = useState<MedicineData>(initialMedicineState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const API_URL = `${BASE_URL}/pharmacy/addMadicine`;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Validation
    if (!medicine.medicineCategory) {
      setError('Please select a medicine category.');
      setIsLoading(false);
      return;
    }
    const price = parseFloat(medicine.medicinePrice);
    if (isNaN(price) || price <= 0) {
      setError('Medicine price must be a positive value.');
      setIsLoading(false);
      return;
    }
    const quantity = parseInt(medicine.medicineQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      setError('Medicine quantity must be a positive integer.');
      setIsLoading(false);
      return;
    }
    if (new Date(medicine.medicineExpiryDate) < new Date()) {
      setError('Expiry date cannot be in the past.');
      setIsLoading(false);
      return;
    }
    if (medicine.medicineImage && !/^https?:\/\/.+\..+/.test(medicine.medicineImage)) {
      setError('Please enter a valid image URL.');
      setIsLoading(false);
      return;
    }

    // Prepare data for API, converting types to match expected request body
    const requestBody = {
      ...medicine,
      medicinePrice: price,
      medicineQuantity: quantity,
      medicineExpiryDate: medicine.medicineExpiryDate
        ? `${medicine.medicineExpiryDate}T00:00:00`
        : '',
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add medicine.');
      }

      const result = await response.json();
      setSuccessMessage(result.message || 'Medicine added successfully!');
      setMedicine(initialMedicineState);
      window.scrollTo(0, 0);
    } catch (err) {
      setError((err as Error).message || 'Unknown error occurred.');
      console.error('Failed:', err);
      window.scrollTo(0, 0);
    } finally {
      setIsLoading(false);
    }
  };

  const inputBaseClasses =
    'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm';
  const inputClasses = `${inputBaseClasses} py-2 px-3`;
  const selectClasses = `${inputBaseClasses} py-2 px-3 pr-10`;
  const textareaClasses = `${inputBaseClasses} py-2 px-3`;
  const labelClasses = 'block text-sm font-medium text-gray-700 mb-1';
  const requiredSpan = <span className="text-red-500 ml-1">*</span>;
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <AdminSidebar />
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 lg:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Add New Medicine
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the details below to add a new medicine to the inventory.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
          )}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Medicine Details */}
            <fieldset className="border border-gray-300 p-4 rounded-md">
              <legend className="text-lg font-medium text-gray-900 px-2">Medicine Details</legend>
              <div className="space-y-4 mt-2">
                <div>
                  <label htmlFor="medicineName" className={labelClasses}>
                    Medicine Name {requiredSpan}
                  </label>
                  <input
                    type="text"
                    name="medicineName"
                    value={medicine.medicineName}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="e.g., Paracetamol"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="medicineType" className={labelClasses}>
                      Medicine Type {requiredSpan}
                    </label>
                    <select
                      name="medicineType"
                      value={medicine.medicineType}
                      onChange={handleChange}
                      required
                      className={selectClasses}
                    >
                      <option value="Tablet">Tablet</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Syrup">Syrup</option>
                      <option value="Suspension">Suspension</option>
                      <option value="Injection">Injection</option>
                      <option value="Ointment">Ointment</option>
                      <option value="Cream">Cream</option>
                      <option value="Gel">Gel</option>
                      <option value="Drops">Drops</option>
                      <option value="Powder">Powder</option>
                      <option value="Inhaler">Inhaler</option>
                      <option value="Suppository">Suppository</option>
                      <option value="Lozenge">Lozenge</option>
                      <option value="Patch">Patch</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="medicineCategory" className={labelClasses}>
                      Category {requiredSpan}
                    </label>
                    <select
                      name="medicineCategory"
                      value={medicine.medicineCategory}
                      onChange={handleChange}
                      required
                      className={selectClasses}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {medicineCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="medicineDescription" className={labelClasses}>
                    Description {requiredSpan}
                  </label>
                  <textarea
                    name="medicineDescription"
                    value={medicine.medicineDescription}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={textareaClasses}
                    placeholder="Detailed description..."
                  />
                </div>
              </div>
            </fieldset>

            {/* Pricing & Stock */}
            <fieldset className="border border-gray-300 p-4 rounded-md">
              <legend className="text-lg font-medium text-gray-900 px-2">Pricing & Stock</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                <div>
                  <label htmlFor="medicinePrice" className={labelClasses}>
                    Price ₹ {requiredSpan}
                  </label>
                  <input
                    type="number"
                    name="medicinePrice"
                    value={medicine.medicinePrice}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0.01"
                    className={inputClasses}
                    placeholder="e.g., 25.00"
                  />
                </div>
                <div>
                  <label htmlFor="medicineQuantity" className={labelClasses}>
                    Quantity {requiredSpan}
                  </label>
                  <input
                    type="number"
                    name="medicineQuantity"
                    value={medicine.medicineQuantity}
                    onChange={handleChange}
                    required
                    min="1"
                    className={inputClasses}
                    placeholder="e.g., 100"
                  />
                </div>
                <div>
                  <label htmlFor="medicineExpiryDate" className={labelClasses}>
                    Expiry Date {requiredSpan}
                  </label>
                  <input
                    type="date"
                    name="medicineExpiryDate"
                    value={medicine.medicineExpiryDate}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </fieldset>

            {/* Additional Info */}
            <fieldset className="border border-gray-300 p-4 rounded-md">
              <legend className="text-lg font-medium text-gray-900 px-2">Additional Information</legend>
              <div className="space-y-4 mt-2">
                <div>
                  <label htmlFor="medicineManufacturer" className={labelClasses}>
                    Manufacturer {requiredSpan}
                  </label>
                  <input
                    type="text"
                    name="medicineManufacturer"
                    value={medicine.medicineManufacturer}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="e.g., Cipla Ltd."
                  />
                </div>

                <div>
                  <label htmlFor="medicineImage" className={labelClasses}>
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="medicineImage"
                    value={medicine.medicineImage}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500">Link to the medicine image.</p>
                </div>
              </div>
            </fieldset>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Save Medicine'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMedicineForm;