import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

interface Chef {
  chefID: number;
  chefName: string;
  chefDescription: string;
  chefImage: string;
  chefRating: string;
  experience: string;
  styles: string;
  price: number;
  locationId: string | null;
  status: string | null;
}

const UpdateChef: React.FC = () => {
  const { chefID } = useParams<{ chefID: string }>();
  const navigate = useNavigate();
  const [chef, setChef] = useState<Chef | null>(null);
  const [formData, setFormData] = useState<Partial<Chef>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/chefs/chef-By/Id/${chefID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chef data');
        }
        const data: Chef = await response.json();
        setChef(data);
        setFormData({
          chefName: data.chefName,
          chefDescription: data.chefDescription,
          chefImage: data.chefImage,
          chefRating: data.chefRating,
          experience: data.experience,
          styles: data.styles,
          price: data.price,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (chefID) {
      fetchChef();
    }
  }, [chefID]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.chefName?.trim()) errors.chefName = 'Name is required';
    if (!formData.chefDescription?.trim()) errors.chefDescription = 'Description is required';
    if (!formData.chefImage?.trim()) errors.chefImage = 'Image URL is required';
    if (!formData.chefRating || isNaN(Number(formData.chefRating)) || Number(formData.chefRating) < 0 || Number(formData.chefRating) > 5) {
      errors.chefRating = 'Rating must be a number between 0 and 5';
    }
    if (!formData.experience?.trim()) errors.experience = 'Experience is required';
    if (!formData.styles?.trim()) errors.styles = 'Styles are required';
    if (!formData.price || formData.price <= 0) errors.price = 'Price must be a positive number';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log('Updating chef ID:', chefID);
      console.log('Update payload:', formData);
      
      const response = await fetch(`${BASE_URL}/api/chefs/update-chef/${chefID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update chef: ${errorData}`);
      }
      
      const updatedData = await response.json();
      console.log('Update response:', updatedData);
      
      alert('Chef updated successfully');
      navigate(-1); // Redirect to previous page
    } catch (err) {
      console.error('Error updating chef:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-600 text-base font-semibold">{error}</p>
        <button
          className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!chef) {
    return <div className="text-center p-6 text-gray-500 text-base">Chef not found</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
        Chef Profile: {chef.chefName}
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="relative mb-4">
              <img
                src={formData.chefImage || 'https://via.placeholder.com/300x300?text=Chef+Image'}
                alt={formData.chefName}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
                Rating: {formData.chefRating} ★
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium text-gray-800">Experience:</span> {formData.experience}</p>
              <p><span className="font-medium text-gray-800">Styles:</span> {formData.styles}</p>
              <p><span className="font-medium text-gray-800">Price:</span> ${
                typeof formData.price === 'number'
                  ? formData.price.toFixed(2)
                  : Number(formData.price)
                    ? Number(formData.price).toFixed(2)
                    : formData.price || 'N/A'
              }</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Chef Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Chef Name</label>
                <input
                  type="text"
                  name="chefName"
                  value={formData.chefName || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.chefName && <p className="text-red-600 text-xs mt-1">{formErrors.chefName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="chefDescription"
                  value={formData.chefDescription || ''}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.chefDescription && <p className="text-red-600 text-xs mt-1">{formErrors.chefDescription}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="chefImage"
                  value={formData.chefImage || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.chefImage && <p className="text-red-600 text-xs mt-1">{formErrors.chefImage}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                <input
                  type="text"
                  name="chefRating"
                  value={formData.chefRating || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.chefRating && <p className="text-red-600 text-xs mt-1">{formErrors.chefRating}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.experience && <p className="text-red-600 text-xs mt-1">{formErrors.experience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Styles</label>
                <input
                  type="text"
                  name="styles"
                  value={formData.styles || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.styles && <p className="text-red-600 text-xs mt-1">{formErrors.styles}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.price && <p className="text-red-600 text-xs mt-1">{formErrors.price}</p>}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateChef;