import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';
import AdminSidebar from '@/components/admin/AdminSidebar';

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
  const [formData, setFormData] = useState({
    chefName: '',
    chefDescription: '',
    chefRating: '',
    experience: '',
    styles: '',
    price: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
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
        setFormData({
          chefName: data.chefName || '',
          chefDescription: data.chefDescription || '',
          chefRating: data.chefRating || '',
          experience: data.experience || '',
          styles: data.styles || '',
          price: data.price?.toString() || '',
        });
        setImagePreview(data.chefImage || '');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chef data');
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
    
    if (!formData.chefName.trim()) {
      errors.chefName = 'Chef name is required';
    }
    
    if (!formData.chefDescription.trim()) {
      errors.chefDescription = 'Description is required';
    }
    
    if (!formData.chefRating.trim()) {
      errors.chefRating = 'Rating is required';
    } else {
      const rating = parseFloat(formData.chefRating);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        errors.chefRating = 'Rating must be a number between 0 and 5';
      }
    }
    
    if (!formData.experience.trim()) {
      errors.experience = 'Experience is required';
    }
    
    if (!formData.styles.trim()) {
      errors.styles = 'Cooking styles are required';
    }
    
    if (!formData.price.trim()) {
      errors.price = 'Price is required';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        errors.price = 'Price must be a positive number';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // Clear image error
      if (formErrors.chefImage) {
        setFormErrors(prev => ({ ...prev, chefImage: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const form = new FormData();
      form.append('chefName', formData.chefName);
      form.append('chefDescription', formData.chefDescription);
      form.append('chefRating', formData.chefRating);
      form.append('experience', formData.experience);
      form.append('styles', formData.styles);
      form.append('price', formData.price);
      
      if (imageFile) {
        form.append('chefImage', imageFile);
      }

      const response = await fetch(`${BASE_URL}/api/chefs/update-chef/${chefID}`, {
        method: 'PUT',
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to update chef');
      }

      alert('Chef updated successfully!');
      navigate(-1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update chef');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading chef data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900">Update Chef</h1>
              <p className="text-sm text-gray-600 mt-1">Edit chef information and details</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="chefName" className="block text-sm font-medium text-gray-700 mb-2">
                    Chef Name *
                  </label>
                  <input
                    type="text"
                    id="chefName"
                    name="chefName"
                    value={formData.chefName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter chef name"
                  />
                  {formErrors.chefName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.chefName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="chefRating" className="block text-sm font-medium text-gray-700 mb-2">
                    Rating (0-5) *
                  </label>
                  <input
                    type="number"
                    id="chefRating"
                    name="chefRating"
                    value={formData.chefRating}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    max="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="4.5"
                  />
                  {formErrors.chefRating && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.chefRating}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="chefDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="chefDescription"
                  name="chefDescription"
                  value={formData.chefDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the chef's background and specialties..."
                />
                {formErrors.chefDescription && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.chefDescription}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Experience *
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 10+ years"
                  />
                  {formErrors.experience && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.experience}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="150.00"
                  />
                  {formErrors.price && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="styles" className="block text-sm font-medium text-gray-700 mb-2">
                  Cooking Styles *
                </label>
                <input
                  type="text"
                  id="styles"
                  name="styles"
                  value={formData.styles}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Italian, French, Mediterranean"
                />
                {formErrors.styles && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.styles}</p>
                )}
              </div>

              <div>
                <label htmlFor="chefImage" className="block text-sm font-medium text-gray-700 mb-2">
                  Chef Image
                </label>
                <input
                  type="file"
                  id="chefImage"
                  name="chefImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formErrors.chefImage && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.chefImage}</p>
                )}
                
                {imagePreview && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Current/Preview Image:</p>
                    <img
                      src={imagePreview}
                      alt="Chef preview"
                      className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Updating...' : 'Update Chef'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateChef;