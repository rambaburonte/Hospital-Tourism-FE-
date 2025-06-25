import React, { useState, useEffect } from 'react';
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

const DownloadBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
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

  const downloadCSV = () => {
    setDownloading(true);
    
    const headers = [
      'ID',
      'Title',
      'Author Name',
      'Author Email',
      'Meta Title',
      'Meta Description',
      'Short Description',
      'Content',
      'Category ID',
      'Image URL'
    ];

    const csvContent = [
      headers.join(','),
      ...blogs.map(blog => [
        blog.blogId,
        `"${(blog.title || '').replace(/"/g, '""')}"`,
        `"${(blog.authorName || '').replace(/"/g, '""')}"`,
        `"${(blog.authorEmail || '').replace(/"/g, '""')}"`,
        `"${(blog.metaTitle || '').replace(/"/g, '""')}"`,
        `"${(blog.metaDescription || '').replace(/"/g, '""')}"`,
        `"${(blog.shortDescription || '').replace(/"/g, '""')}"`,
        `"${(blog.content || '').replace(/"/g, '""')}"`,
        blog.categoryId || '',
        `"${(blog.imageUrl || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `blogs_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setDownloading(false);
  };

  const downloadJSON = () => {
    setDownloading(true);
    
    const jsonContent = JSON.stringify(blogs, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `blogs_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setDownloading(false);
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

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Download Blogs</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Download Options</h2>
              <p className="text-blue-700 mb-4">
                Total blogs available: <strong>{blogs.length}</strong>
              </p>
              <div className="flex gap-4">
                <button
                  onClick={downloadCSV}
                  disabled={downloading || blogs.length === 0}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {downloading ? 'Downloading...' : 'Download as CSV'}
                </button>
                <button
                  onClick={downloadJSON}
                  disabled={downloading || blogs.length === 0}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {downloading ? 'Downloading...' : 'Download as JSON'}
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.blogId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {blog.imageUrl && (
                          <img
                            className="h-10 w-10 rounded-full mr-3"
                            src={blog.imageUrl}
                            alt={blog.title}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500">ID: {blog.blogId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{blog.authorName}</div>
                      <div className="text-sm text-gray-500">{blog.authorEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {blog.categoryId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="max-w-xs truncate">
                        {blog.metaTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="max-w-xs truncate">
                        {blog.shortDescription}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {blogs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No blogs found to download.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadBlogs;
