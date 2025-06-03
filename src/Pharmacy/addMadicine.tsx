// src/components/AddMedicineForm.tsx
import React,
{
  useState,
  ChangeEvent,
  FormEvent
} from 'react';
import Sidebar from '@/admin/sidebar';
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
  'Antacids',
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
  medicineCategory: '', // Default to empty for the "Select" option
};

const AddMedicineForm: React.FC = () => {
  const [medicine, setMedicine] = useState<MedicineData>(initialMedicineState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const API_URL = 'http://localhost:8080/pharmacy/addMadicine';

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMedicine((prevMedicine) => ({
      ...prevMedicine,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Frontend Validations
    if (!medicine.medicineCategory) {
        setError('Please select a medicine category.');
        setIsLoading(false);
        return;
    }
    if (parseFloat(medicine.medicinePrice) <= 0) {
      setError('Medicine price must be a positive value.');
      setIsLoading(false);
      return;
    }
    if (parseInt(medicine.medicineQuantity, 10) <= 0) {
      setError('Medicine quantity must be a positive integer.');
      setIsLoading(false);
      return;
    }
    if (new Date(medicine.medicineExpiryDate) < new Date(new Date().toISOString().split('T')[0])) {
        setError('Expiry date cannot be in the past.');
        setIsLoading(false);
        return;
    }
    if (medicine.medicineImage && !/^https?:\/\/.+\..+/.test(medicine.medicineImage)) {
        setError('Please enter a valid image URL (e.g., http://example.com/image.jpg).');
        setIsLoading(false);
        return;
    }


    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicine),
      });

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: `;
        try {
          const errorData = await response.json();
          errorMessage += errorData.message || 'Failed to add medicine. Please try again.';
        } catch (jsonError) {
          errorMessage += 'Failed to add medicine. Please try again.';
          console.warn('Could not parse error response as JSON:', jsonError);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setSuccessMessage(result.message || 'Medicine added successfully!');
      setMedicine(initialMedicineState); // Reset form
      window.scrollTo(0, 0); // Scroll to top to see message
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while adding the medicine.');
      }
      console.error('Failed to add medicine:', err);
      window.scrollTo(0, 0); // Scroll to top to see message
    } finally {
      setIsLoading(false);
    }
  };

  // Common input field styling (Tailwind @apply could be used in a CSS file for cleaner components)
  const inputBaseClasses = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
  const inputClasses = `${inputBaseClasses} py-2 px-3`; // For text, number, date, url
  const selectClasses = `${inputBaseClasses} py-2 px-3 pr-10`; // For select, pr-10 for arrow
  const textareaClasses = `${inputBaseClasses} py-2 px-3`; // For textarea

  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const requiredSpan = <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
        <Sidebar />
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
            <div
              className="mb-6 p-4 rounded-md bg-red-50 border border-red-300 text-red-700 text-sm transition-opacity duration-300 ease-in-out"
              role="alert"
            >
              <strong className="font-semibold">Error:</strong> {error}
            </div>
          )}
          {successMessage && (
            <div
              className="mb-6 p-4 rounded-md bg-green-50 border border-green-300 text-green-700 text-sm transition-opacity duration-300 ease-in-out"
              role="alert"
            >
              <strong className="font-semibold">Success:</strong> {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                    id="medicineName"
                    value={medicine.medicineName}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="e.g., Paracetamol 500mg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="medicineType" className={labelClasses}>
                            Medicine Type {requiredSpan}
                        </label>
                        <select
                            name="medicineType"
                            id="medicineType"
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
                            id="medicineCategory"
                            value={medicine.medicineCategory}
                            onChange={handleChange}
                            required
                            className={selectClasses}
                        >
                            <option value="" disabled>Select a category</option>
                            {medicineCategories.map((category) => (
                                <option key={category} value={category}>{category}</option>
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
                    id="medicineDescription"
                    value={medicine.medicineDescription}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={textareaClasses}
                    placeholder="Detailed description, uses, and active ingredients"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-gray-300 p-4 rounded-md">
              <legend className="text-lg font-medium text-gray-900 px-2">Pricing & Stock</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                <div>
                  <label htmlFor="medicinePrice" className={labelClasses}>
                    Price (₹) {requiredSpan}
                  </label>
                  <input
                    type="number"
                    name="medicinePrice"
                    id="medicinePrice"
                    value={medicine.medicinePrice}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0.01"
                    className={inputClasses}
                    placeholder="e.g., 50.75"
                  />
                </div>
                <div>
                  <label htmlFor="medicineQuantity" className={labelClasses}>
                    Quantity {requiredSpan}
                  </label>
                  <input
                    type="number"
                    name="medicineQuantity"
                    id="medicineQuantity"
                    value={medicine.medicineQuantity}
                    onChange={handleChange}
                    required
                    min="1"
                    step="1"
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
                    id="medicineExpiryDate"
                    value={medicine.medicineExpiryDate}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </fieldset>

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
                    id="medicineManufacturer"
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
                    id="medicineImage"
                    value={medicine.medicineImage}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="https://example.com/images/paracetamol.jpg"
                  />
                   <p className="mt-1 text-xs text-gray-500">Enter a direct link to the medicine image.</p>
                </div>
              </div>
            </fieldset>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Save Medicine'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMedicineForm;