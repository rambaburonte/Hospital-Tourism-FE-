import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

const AddBlogCategory: React.FC = () => {
  const [formData, setFormData] = useState({
    blogCategoryName: '',
    blogCategoryDescription: '',
    blogCategoryCreatedBy: '',
    blogCategoryCreatedDate: new Date().toISOString().split('T')[0]
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (!imageFile) {
        throw new Error('Please select an image file');
      }

      const categoryFormData = new FormData();
      categoryFormData.append('blogCategoryName', formData.blogCategoryName);
      categoryFormData.append('blogCategoryDescription', formData.blogCategoryDescription);
      categoryFormData.append('blogCategoryCreatedBy', formData.blogCategoryCreatedBy);
      categoryFormData.append('blogCategoryCreatedDate', formData.blogCategoryCreatedDate);
      categoryFormData.append('image', imageFile);

      console.log('Creating blog category with data:', {
        blogCategoryName: formData.blogCategoryName,
        blogCategoryDescription: formData.blogCategoryDescription,
        blogCategoryCreatedBy: formData.blogCategoryCreatedBy,
        blogCategoryCreatedDate: formData.blogCategoryCreatedDate,
        imageFileName: imageFile.name
      });

      const response = await fetch(`${BASE_URL}/api/blog-categories`, {
        method: 'POST',
        body: categoryFormData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create blog category: ${errorText}`);
      }

      const result = await response.json();
      console.log('Blog category creation response:', result);

      setMessage('Blog category created successfully!');
      setFormData({
        blogCategoryName: '',
        blogCategoryDescription: '',
        blogCategoryCreatedBy: '',
        blogCategoryCreatedDate: new Date().toISOString().split('T')[0]
      });
      setImageFile(null);
    } catch (err) {
      console.error('Error creating blog category:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Blog Category</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                name="blogCategoryName"
                value={formData.blogCategoryName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="blogCategoryDescription"
                value={formData.blogCategoryDescription}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Created By</label>
              <input
                type="text"
                name="blogCategoryCreatedBy"
                value={formData.blogCategoryCreatedBy}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Created Date</label>
              <input
                type="date"
                name="blogCategoryCreatedDate"
                value={formData.blogCategoryCreatedDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogCategory;
