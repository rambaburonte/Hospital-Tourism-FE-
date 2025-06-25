import React, { useEffect, useState } from 'react';
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

const ViewBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    } else {
      setError('No blog ID provided');
      setLoading(false);
    }
  }, [id]);

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
    } catch (err) {
      console.error('Error loading blog:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center">Loading blog...</div>
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
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/admin/ViewBlogs')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center text-gray-600">Blog not found</div>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/admin/ViewBlogs')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Back to Blogs
            </button>
          </div>
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
            <h1 className="text-2xl font-bold text-gray-800">View Blog</h1>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/admin/EditBlog/${blog.blogId}`)}
                className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
              >
                Edit Blog
              </button>
              <button
                onClick={() => navigate('/admin/ViewBlogs')}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Back to Blogs
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Blog Header */}
            <div className="border-b pb-4">
              <div className="flex items-start gap-4">
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{blog.title}</h2>
                  <p className="text-lg text-gray-600 mb-4">{blog.shortDescription}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Blog ID:</span>
                      <p className="text-gray-600">{blog.blogId}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Author:</span>
                      <p className="text-gray-600">{blog.authorName}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Email:</span>
                      <p className="text-gray-600">{blog.authorEmail}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Category ID:</span>
                      <p className="text-gray-600">{blog.categoryId}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Meta Title</h3>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{blog.metaTitle}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Meta Description</h3>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{blog.metaDescription}</p>
              </div>
            </div>

            {/* Blog Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Content</h3>
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-6 rounded-md"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;