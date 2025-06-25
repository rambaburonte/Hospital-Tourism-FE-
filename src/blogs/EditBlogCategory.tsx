import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface BlogCategory {
  blogCategoryId: number;
  blogCategoryName: string;
  blogCategoryDescription: string;
  blogCategoryCreatedBy: string;
  blogCategoryCreatedDate: string;
  imageUrl?: string;
}

const EditBlogCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [formData, setFormData] = useState<Partial<BlogCategory>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCategory(id);
    } else {
      fetchAllCategories();
    }
  }, [id]);

  const fetchCategory = async (categoryId: string) => {
    try {
      console.log('Fetching blog category from:', `${BASE_URL}/api/blog-categories/${categoryId}`);
      const response = await fetch(`${BASE_URL}/api/blog-categories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog category');
      }
      const data = await response.json();
      console.log('Blog category response:', data);
      setCategory(data);
      setFormData(data);
      setShowEditForm(true);
    } catch (err) {
      console.error('Error fetching blog category:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    try {
      console.log('Fetching blog categories from:', `${BASE_URL}/api/blog-categories/getAll/categories`);
      const response = await fetch(`${BASE_URL}/api/blog-categories/getAll/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog categories');
      }
      const data = await response.json();
      console.log('Blog categories response:', data);
      setCategories(data);
    } catch (err) {
      console.error('Error fetching blog categories:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectCategoryForEdit = (selectedCategory: BlogCategory) => {
    setCategory(selectedCategory);
    setFormData(selectedCategory);
    setShowEditForm(true);
  };

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
    setSaving(true);
    setError(null);

    try {
      const categoryId = id || category?.blogCategoryId;
      console.log('Updating blog category ID:', categoryId);
      console.log('Update payload:', formData);

      const updateFormData = new FormData();
      updateFormData.append('blogCategoryName', formData.blogCategoryName || '');
      updateFormData.append('blogCategoryDescription', formData.blogCategoryDescription || '');
      updateFormData.append('blogCategoryCreatedBy', formData.blogCategoryCreatedBy || '');
      updateFormData.append('blogCategoryCreatedDate', formData.blogCategoryCreatedDate || '');
      if (imageFile) {
        updateFormData.append('image', imageFile);
      }

      const response = await fetch(`${BASE_URL}/api/blog-categories/${categoryId}`, {
        method: 'POST', // Note: The controller uses POST for update
        body: updateFormData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update blog category: ${errorData}`);
      }

      const updatedData = await response.json();
      console.log('Update response:', updatedData);

      navigate('/admin/ViewBlogCategory');
    } catch (err) {
      console.error('Error updating blog category:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error && !category) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          {!showEditForm ? (
            // Show category list for selection
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Blog Category to Edit</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((categoryItem) => (
                      <tr key={categoryItem.blogCategoryId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {categoryItem.imageUrl && (
                              <img
                                className="h-10 w-10 rounded-full mr-3"
                                src={categoryItem.imageUrl}
                                alt={categoryItem.blogCategoryName}
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{categoryItem.blogCategoryName}</div>
                              <div className="text-sm text-gray-500">ID: {categoryItem.blogCategoryId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="max-w-xs truncate">
                            {categoryItem.blogCategoryDescription}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {categoryItem.blogCategoryCreatedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {categoryItem.blogCategoryCreatedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => selectCategoryForEdit(categoryItem)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {categories.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No blog categories found.
                </div>
              )}
            </>
          ) : (
            // Show edit form
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Edit Blog Category</h1>
                {!id && (
                  <button
                    onClick={() => setShowEditForm(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Back to List
                  </button>
                )}
              </div>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category Name</label>
                  <input
                    type="text"
                    name="blogCategoryName"
                    value={formData.blogCategoryName || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="blogCategoryDescription"
                    value={formData.blogCategoryDescription || ''}
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
                    value={formData.blogCategoryCreatedBy || ''}
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
                    value={formData.blogCategoryCreatedDate || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category Image (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Current image:</p>
                      <img
                        src={formData.imageUrl}
                        alt="Current category image"
                        className="mt-1 h-20 w-20 object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? 'Updating...' : 'Update Category'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/ViewBlogCategory')}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBlogCategory;
