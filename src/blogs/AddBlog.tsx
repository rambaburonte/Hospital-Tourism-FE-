import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface BlogCategory {
  blogCategoryId: number;
  blogCategoryName: string;
  blogCategoryDescription: string;
}

const AddBlog: React.FC = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [formData, setFormData] = useState({
    authorEmail: '',
    authorName: '',
    metaTitle: '',
    metaDescription: '',
    title: '',
    shortDescription: '',
    content: '',
    categoryId: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
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
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

      const blogFormData = new FormData();
      blogFormData.append('authorEmail', formData.authorEmail);
      blogFormData.append('authorName', formData.authorName);
      blogFormData.append('metaTitle', formData.metaTitle);
      blogFormData.append('metaDescription', formData.metaDescription);
      blogFormData.append('title', formData.title);
      blogFormData.append('shortDescription', formData.shortDescription);
      blogFormData.append('content', formData.content);
      blogFormData.append('categoryId', formData.categoryId);
      blogFormData.append('image', imageFile);

      console.log('Creating blog with data:', {
        authorEmail: formData.authorEmail,
        authorName: formData.authorName,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        title: formData.title,
        shortDescription: formData.shortDescription,
        content: formData.content,
        categoryId: formData.categoryId,
        imageFileName: imageFile.name
      });

      const response = await fetch(`${BASE_URL}/api/blogs/create`, {
        method: 'POST',
        body: blogFormData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create blog: ${errorText}`);
      }

      const result = await response.json();
      console.log('Blog creation response:', result);

      setMessage('Blog created successfully!');
      setFormData({
        authorEmail: '',
        authorName: '',
        metaTitle: '',
        metaDescription: '',
        title: '',
        shortDescription: '',
        content: '',
        categoryId: ''
      });
      setImageFile(null);
    } catch (err) {
      console.error('Error creating blog:', err);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Blog</h1>

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Author Name</label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Author Email</label>
                <input
                  type="email"
                  name="authorEmail"
                  value={formData.authorEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.blogCategoryId} value={category.blogCategoryId}>
                    {category.blogCategoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Short Description</label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Description</label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={8}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Featured Image</label>
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
                {loading ? 'Creating...' : 'Create Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
