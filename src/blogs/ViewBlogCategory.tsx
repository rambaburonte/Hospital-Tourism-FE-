import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from "@/config/config";

interface BlogCategory {
  blogCategoryId: number;
  blogCategoryName: string;
  blogCategoryDescription: string;
  blogCategoryCreatedBy: string;
  blogCategoryCreatedDate: string;
  imageUrl?: string;
}

const ViewBlogCategory: React.FC = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      console.error('Error loading blog categories:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const goToAdd = () => navigate('/admin/AddBlogCategory');
  const goToEdit = (id: number) => navigate(`/admin/EditBlogCategory/${id}`);

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center">Loading blog categories...</div>
        </div>
      </div>
    );
  }

  if (error) {
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Blog Categories</h1>
            <button
              onClick={goToAdd}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add New Category
            </button>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No blog categories found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.blogCategoryId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {category.imageUrl && (
                            <img
                              className="h-10 w-10 rounded-full mr-3"
                              src={category.imageUrl}
                              alt={category.blogCategoryName}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{category.blogCategoryName}</div>
                            <div className="text-sm text-gray-500">ID: {category.blogCategoryId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="max-w-xs truncate">
                          {category.blogCategoryDescription}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {category.blogCategoryCreatedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {category.blogCategoryCreatedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => goToEdit(category.blogCategoryId)}
                            className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBlogCategory;
