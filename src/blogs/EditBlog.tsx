import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Blog {
  blogId: number;
  authorEmail: string;
  authorName: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  shortDescription: string;
  content: string;
  categoryId: number;
  imageUrl?: string;
}

interface BlogCategory {
  blogCategoryId: number;
  blogCategoryName: string;
  blogCategoryDescription: string;
}

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [formData, setFormData] = useState<Partial<Blog>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchBlog(id);
    } else {
      fetchAllBlogs();
    }
  }, [id]);

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

  const fetchBlog = async (blogId: string) => {
    try {
      console.log('Fetching blog from:', `${BASE_URL}/api/blogs/get/${blogId}`);
      const response = await fetch(`${BASE_URL}/api/blogs/get/${blogId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      const data = await response.json();
      console.log('Blog response:', data);
      setBlog(data);
      setFormData(data);
      setShowEditForm(true);
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      console.log('Fetching blogs from:', `${BASE_URL}/api/blogs/all-blogs`);
      const response = await fetch(`${BASE_URL}/api/blogs/all-blogs`);
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      console.log('Blogs response:', data);
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectBlogForEdit = (selectedBlog: Blog) => {
    setBlog(selectedBlog);
    setFormData(selectedBlog);
    setShowEditForm(true);
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
    setSaving(true);
    setError(null);

    try {
      const blogId = id || blog?.blogId;
      console.log('Updating blog ID:', blogId);
      console.log('Update payload:', formData);

      const updateFormData = new FormData();
      updateFormData.append('authorEmail', formData.authorEmail || '');
      updateFormData.append('authorName', formData.authorName || '');
      updateFormData.append('metaTitle', formData.metaTitle || '');
      updateFormData.append('metaDescription', formData.metaDescription || '');
      updateFormData.append('title', formData.title || '');
      updateFormData.append('shortDescription', formData.shortDescription || '');
      updateFormData.append('content', formData.content || '');
      if (formData.categoryId) {
        updateFormData.append('categoryId', formData.categoryId.toString());
      }
      if (imageFile) {
        updateFormData.append('image', imageFile);
      }

      const response = await fetch(`${BASE_URL}/api/blogs/update/${blogId}`, {
        method: 'PUT',
        body: updateFormData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update blog: ${errorData}`);
      }

      const updatedData = await response.json();
      console.log('Update response:', updatedData);

      navigate('/admin/ViewBlogs');
    } catch (err) {
      console.error('Error updating blog:', err);
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

  if (error && !blog) {
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
            // Show blog list for selection
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Blog to Edit</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogs.map((blogItem) => (
                      <tr key={blogItem.blogId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{blogItem.title}</div>
                          <div className="text-sm text-gray-500">ID: {blogItem.blogId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{blogItem.authorName}</div>
                          <div className="text-sm text-gray-500">{blogItem.authorEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {blogItem.categoryId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {blogItem.shortDescription?.substring(0, 100)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => selectBlogForEdit(blogItem)}
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

              {blogs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No blogs found.
                </div>
              )}
            </>
          ) : (
            // Show edit form
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Edit Blog</h1>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Author Name</label>
                    <input
                      type="text"
                      name="authorName"
                      value={formData.authorName || ''}
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
                      value={formData.authorEmail || ''}
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
                    value={formData.categoryId || ''}
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
                    value={formData.title || ''}
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
                    value={formData.metaTitle || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Short Description</label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription || ''}
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
                    value={formData.metaDescription || ''}
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
                    value={formData.content || ''}
                    onChange={handleChange}
                    rows={8}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Featured Image (optional)</label>
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
                        alt="Current blog image"
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
                    {saving ? 'Updating...' : 'Update Blog'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/ViewBlogs')}
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

export default EditBlog;
