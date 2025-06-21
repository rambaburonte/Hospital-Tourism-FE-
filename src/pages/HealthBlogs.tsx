
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { BASE_URL } from '@/config/config';

// interface Category {
//   blogCategoryId: number;
//   blogCategoryName: string;
//   blogCategoryDescription: string;
//   blogCategoryImageUrl: string;
// }

// interface Blog {
//   blogId: number;
//   authorEmail: string;
//   authorName: string;
//   title: string;
//   shortDescription: string;
//   content: string;
//   coverImage: string;
//   createdAt: string;
//   category: Category;
// }

// const HealthBlogsSection: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${BASE_URL}/api/blogs/all-blogs`, {
//         headers: { 'Content-Type': 'application/json' },
//       })
//       .then(res => {
//         console.log('Full API response:', res);
//         const data = res.data;
//         if (Array.isArray(data)) {
//           console.log('Raw data from API:', data);
//           const mappedBlogs: Blog[] = data.map((item: any) => ({
//             blogId: item.blogId || item.id || 0,
//             authorEmail: item.authorEmail || '',
//             authorName: item.authorName || '',
//             title: item.title || '',
//             shortDescription: item.shortDescription || '',
//             content: item.content || '',
//             coverImage: item.coverImage || item.imageUrl || '',
//             createdAt: item.createdAt || item.created_at || new Date().toISOString(),
//             category: {
//               blogCategoryId: item.category?.blogCategoryId || item.category?.id || 0,
//               blogCategoryName: item.category?.blogCategoryName || item.category?.name || '',
//               blogCategoryDescription: item.category?.blogCategoryDescription || '',
//               blogCategoryImageUrl: item.category?.blogCategoryImageUrl || '',
//             },
//           }));
//           console.log('Mapped blogs:', mappedBlogs);
//           setBlogs(mappedBlogs);
//         } else {
//           console.error('API response is not an array:', data);
//           setError('Unexpected data format from API');
//         }
//       })
//       .catch(err => {
//         console.error('Error loading blogs:', err.response ? err.response.data : err.message);
//         setError(err.response?.data?.message || err.message || 'Failed to fetch blogs');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const goToAdd = () => navigate('/admin/AddBlog');

//   if (loading) return <div>Loading blogs…</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">All Blogs</h1>

       

//         {blogs.length === 0 ? (
//           <p className="text-gray-600 italic">No blogs found.</p>
//         ) : (
//           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {blogs.map(blog => (
//               <li key={blog.blogId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
//                 <div className="flex flex-col h-full">
//                   {blog.coverImage && (
//                     <img
//                       src={blog.coverImage.trim()}
//                       alt={blog.title}
//                       className="w-full h-32 object-cover"
//                     />
//                   )}
//                   <div className="p-4 flex-1">
//                     <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
//                       {blog.title.trim()}
//                     </h2>
//                     <p className="text-sm text-gray-600 mb-2 line-clamp-3">
//                       {blog.shortDescription}
//                     </p>
//                     <p className="text-xs text-gray-500 mb-2">
//                       By {blog.authorName} on {new Date(blog.createdAt).toLocaleDateString()}
//                     </p>
//                     <p className="text-sm text-gray-700 mb-4">
//                       Category: {blog.category.blogCategoryName.trim()}
//                     </p>
//                     <Link
//                       to={`/admin/ViewBlog/${blog.blogId}`}
//                       className="text-blue-600 hover:underline text-sm font-medium"
//                     >
//                       Read more
//                     </Link>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HealthBlogsSection;









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
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12; // 4 cards per row * 3 rows
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/blogs/all-blogs`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
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
          setBlogs(mappedBlogs);
        } else {
          setError('Unexpected data format from API');
        }
      })
      .catch(err => {
        setError(err.response?.data?.message || err.message || 'Failed to fetch blogs');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToAdd = () => navigate('/admin/AddBlog');

  if (loading) return <div className="text-center py-10">Loading blogs…</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">All Blogs</h1>
          
        </div>

        {currentBlogs.length === 0 ? (
          <p className="text-gray-600 italic text-center py-10">No blogs found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentBlogs.map(blog => (
              <li
                key={blog.blogId}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  {blog.coverImage && (
                    <div className="relative">
                      <img
                        src={blog.coverImage.trim()}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                      <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {blog.category.blogCategoryName.trim()}
                      </span>
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {blog.title.trim()}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                      {blog.shortDescription}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>By {blog.authorName}</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Link
                      to={`/admin/ViewBlog/${blog.blogId}`}
                      className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors duration-200`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors duration-200`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthBlogsSection;