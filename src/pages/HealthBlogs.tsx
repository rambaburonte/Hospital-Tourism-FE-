
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

interface Category {
  blogCategoryId: number;
  blogCategoryName: string;
  blogCategoryDescription: string;
  blogCategoryImageUrl: string;
}

interface Blog {
  blogId: number;
  authorEmail: string;
  authorName: string;
  title: string;
  shortDescription: string;
  content: string;
  coverImage: string;
  createdAt: string;
  category: Category;
}

const HealthBlogsSection: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/blogs/all-blogs`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log('Full API response:', res);
        const data = res.data;
        if (Array.isArray(data)) {
          console.log('Raw data from API:', data);
          const mappedBlogs: Blog[] = data.map((item: any) => ({
            blogId: item.blogId || item.id || 0,
            authorEmail: item.authorEmail || '',
            authorName: item.authorName || '',
            title: item.title || '',
            shortDescription: item.shortDescription || '',
            content: item.content || '',
            coverImage: item.coverImage || item.imageUrl || '',
            createdAt: item.createdAt || item.created_at || new Date().toISOString(),
            category: {
              blogCategoryId: item.category?.blogCategoryId || item.category?.id || 0,
              blogCategoryName: item.category?.blogCategoryName || item.category?.name || '',
              blogCategoryDescription: item.category?.blogCategoryDescription || '',
              blogCategoryImageUrl: item.category?.blogCategoryImageUrl || '',
            },
          }));
          console.log('Mapped blogs:', mappedBlogs);
          setBlogs(mappedBlogs);
        } else {
          console.error('API response is not an array:', data);
          setError('Unexpected data format from API');
        }
      })
      .catch(err => {
        console.error('Error loading blogs:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || err.message || 'Failed to fetch blogs');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const goToAdd = () => navigate('/admin/AddBlog');

  if (loading) return <div>Loading blogs…</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Blogs</h1>

       

        {blogs.length === 0 ? (
          <p className="text-gray-600 italic">No blogs found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <li key={blog.blogId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col h-full">
                  {blog.coverImage && (
                    <img
                      src={blog.coverImage.trim()}
                      alt={blog.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-4 flex-1">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {blog.title.trim()}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                      {blog.shortDescription}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      By {blog.authorName} on {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                      Category: {blog.category.blogCategoryName.trim()}
                    </p>
                    <Link
                      to={`/admin/ViewBlog/${blog.blogId}`}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HealthBlogsSection;