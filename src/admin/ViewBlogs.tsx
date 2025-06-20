// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from "@/config/config";
// interface Blog {
//   _id: string;
//   title: string;
//   content: string;
//   // add any other fields returned by your API
// }

// const ViewBlogs: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get<Blog[]>(`${BASE_URL}/api/blogs/all`)
//       .then(res => {
//         setBlogs(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error loading blogs:', err);
//         setError(err.response?.data?.message || err.message);
//         setLoading(false);
//       });
//   }, []);

//   const goToAdd = () => navigate('/admin/AddBlog'); // if you have an add blog route

//   if (loading) return <div>Loading blogs…</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
//       <button
//         onClick={goToAdd}
//         className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
//       >
//         Add New Blog
//       </button>

//       {blogs.length === 0 ? (
//         <p>No blogs found.</p>
//       ) : (
//         <ul>
//           {blogs.map(blog => (
//             <li key={blog._id} className="border p-4 mb-2 rounded shadow">
//               <h2 className="text-xl font-semibold">{blog.title}</h2>
//               <p>{blog.content.substring(0, 200)}…</p>
//               <Link
//                 to={`/admin/ViewBlog/${blog._id}`}
//                 className="text-blue-600 hover:underline mt-2 block"
//               >
//                 Read more / Edit
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ViewBlogs;










// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { BASE_URL } from '@/config/config';

// interface Blog {
//   _id: string;
//   title: string;
//   content: string;
//   // add more fields if your API returns them
// }

// const ViewBlogs: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     axios.get(`${BASE_URL}/api/blogs/all`)
//       .then(res => {
//         console.log('API response:', res.data);
//         const arr = Array.isArray(res.data) ? res.data : res.data.data;
//         setBlogs(arr);
//       })
//       .catch(err => {
//         console.error('Error loading blogs:', err);
//         setError(err.response?.data?.message || err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const goToAdd = () => navigate('/admin/AddBlog');

//   console.log('Fetched blogs:', blogs);

//   if (loading) return <div>Loading blogs…</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">All Blogs</h1>

//       <button
//         onClick={goToAdd}
//         className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
//       >
//         Add New Blog
//       </button>

//       {blogs.length === 0 ? (
//         <p>No blogs found.</p>
//       ) : (
//         <ul>
//           {blogs.map(blog => (
//             <li key={blog._id} className="border p-4 mb-2 rounded shadow">
//               <h2 className="text-xl font-semibold">{blog.title}</h2>
//               <p>{blog.content.substring(0, 200)}…</p>
//               <Link
//                 to={`/admin/ViewBlog/${blog._id}`}
//                 className="text-blue-600 hover:underline mt-2 block"
//               >
//                 Read more / Edit
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ViewBlogs;







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

// const ViewBlogs: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     axios.get<Blog[]>(`${BASE_URL}/api/blogs/all-blogs`)
//       .then(res => {
//         console.log('API response:', res.data);
//         setBlogs(res.data);
//       })
//       .catch(err => {
//         console.error('Error loading blogs:', err);
//         setError(err.response?.data?.message || err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const goToAdd = () => navigate('/admin/AddBlog');

//   if (loading) return <div>Loading blogs…</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">All Blogs</h1>

//       <button
//         onClick={goToAdd}
//         className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
//       >
//         Add New Blog
//       </button>

//       {blogs.length === 0 ? (
//         <p>No blogs found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {blogs.map(blog => (
//             <li key={blog.blogId} className="border p-4 rounded shadow">
//               <div className="flex flex-col md:flex-row">
//                 {blog.coverImage && (
//                   <img
//                     src={blog.coverImage.trim()}
//                     alt={blog.title}
//                     className="w-full md:w-1/3 h-auto object-cover rounded mb-4 md:mb-0 md:mr-4"
//                   />
//                 )}
//                 <div className="flex-1">
//                   <h2 className="text-xl font-semibold">{blog.title.trim()}</h2>
//                   <p className="text-sm text-gray-600 mb-2">
//                     By {blog.authorName} on {new Date(blog.createdAt).toLocaleDateString()}
//                   </p>
//                   <p className="mb-2">{blog.shortDescription}</p>
//                   <p className="mb-2 text-gray-700">
//                     Category: {blog.category.blogCategoryName.trim()}
//                   </p>
//                   <Link
//                     to={`/admin/ViewBlog/${blog.blogId}`}
//                     className="text-blue-600 hover:underline mt-2 inline-block"
//                   >
//                     Read more / Edit
//                   </Link>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ViewBlogs;








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

// const ViewBlogs: React.FC = () => {
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
//         console.log('Full API response:', res); // Log the entire response
//         const data = res.data;
//         if (Array.isArray(data)) {
//           console.log('Raw data from API:', data);
//           // Map the response to match the Blog interface
//           const mappedBlogs: Blog[] = data.map((item: any) => ({
//             blogId: item.blogId || item.id || 0, // Fallback if field name differs
//             authorEmail: item.authorEmail || '',
//             authorName: item.authorName || '',
//             title: item.title || '',
//             shortDescription: item.shortDescription || '',
//             content: item.content || '',
//             coverImage: item.coverImage || item.imageUrl || '',
//             createdAt: item.createdAt || item.created_at || new Date().toISOString(), // Handle different date field names
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
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">All Blogs</h1>

//       <button
//         onClick={goToAdd}
//         className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
//       >
//         Add New Blog
//       </button>

//       {blogs.length === 0 ? (
//         <p>No blogs found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {blogs.map(blog => (
//             <li key={blog.blogId} className="border p-4 rounded shadow">
//               <div className="flex flex-col md:flex-row">
//                 {blog.coverImage && (
//                   <img
//                     src={blog.coverImage.trim()}
//                     alt={blog.title}
//                     className="w-full md:w-1/3 h-auto object-cover rounded mb-4 md:mb-0 md:mr-4"
//                   />
//                 )}
//                 <div className="flex-1">
//                   <h2 className="text-xl font-semibold">{blog.title.trim()}</h2>
//                   <p className="text-sm text-gray-600 mb-2">
//                     By {blog.authorName} on {new Date(blog.createdAt).toLocaleDateString()}
//                   </p>
//                   <p className="mb-2">{blog.shortDescription}</p>
//                   <p className="mb-2 text-gray-700">
//                     Category: {blog.category.blogCategoryName.trim()}
//                   </p>
//                   <Link
//                     to={`/admin/ViewBlog/${blog.blogId}`}
//                     className="text-blue-600 hover:underline mt-2 inline-block"
//                   >
//                     Read more / Edit
//                   </Link>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ViewBlogs;











// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Dialog } from '@headlessui/react';
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

// const ViewBlogs: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
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

//   const openBlogPopup = (blog: Blog) => {
//     setSelectedBlog(blog);
//   };

//   const closeBlogPopup = () => {
//     setSelectedBlog(null);
//   };

//   if (loading) return <div>Loading blogs…</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">All Blogs</h1>

//       <button
//         onClick={goToAdd}
//         className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
//       >
//         Add New Blog
//       </button>

//       {blogs.length === 0 ? (
//         <p>No blogs found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {blogs.map(blog => (
//             <li key={blog.blogId} className="border p-4 rounded shadow">
//               <div className="flex flex-col md:flex-row">
//                 {blog.coverImage && (
//                   <img
//                     src={blog.coverImage.trim()}
//                     alt={blog.title}
//                     className="w-full md:w-1/3 h-auto object-cover rounded mb-4 md:mb-0 md:mr-4"
//                   />
//                 )}
//                 <div className="flex-1">
//                   <h2 className="text-xl font-semibold">{blog.title.trim()}</h2>
//                   <p className="text-sm text-gray-600 mb-2">
//                     By {blog.authorName} on {new Date(blog.createdAt).toLocaleDateString()}
//                   </p>
//                   <p className="mb-2">{blog.shortDescription}</p>
//                   <p className="mb-2 text-gray-700">
//                     Category: {blog.category.blogCategoryName.trim()}
//                   </p>
//                   <button
//                     onClick={() => openBlogPopup(blog)}
//                     className="text-blue-600 hover:underline mt-2 inline-block"
//                   >
//                     Read more / Edit
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       <Dialog
//         open={!!selectedBlog}
//         onClose={closeBlogPopup}
//         className="fixed z-50 inset-0 overflow-y-auto"
//       >
//         <div className="flex items-center justify-center min-h-screen px-4">
//           <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//           <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
//             <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
//               {selectedBlog?.title}
//             </Dialog.Title>
//             {selectedBlog && (
//               <div>
//                 <p className="mb-4">
//                   <strong>Author Email:</strong> {selectedBlog.authorEmail}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Author Name:</strong> {selectedBlog.authorName}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Created At:</strong> {new Date(selectedBlog.createdAt).toLocaleDateString()}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Short Description:</strong> {selectedBlog.shortDescription}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Content:</strong> {selectedBlog.content}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Category:</strong> {selectedBlog.category.blogCategoryName}
//                 </p>
//                 {selectedBlog.coverImage && (
//                   <img
//                     src={selectedBlog.coverImage.trim()}
//                     alt={selectedBlog.title}
//                     className="w-full h-auto object-cover rounded mb-4"
//                   />
//                 )}
//                 <button
//                   onClick={closeBlogPopup}
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//                 >
//                   Close
//                 </button>
//                 <Link
//                   to={`/admin/ViewBlog/${selectedBlog.blogId}`}
//                   className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   Edit
//                 </Link>
//               </div>
//             )}
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default ViewBlogs;












// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Dialog } from '@headlessui/react';
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

// const ViewBlogs: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
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

//   const openBlogPopup = (blog: Blog) => {
//     setSelectedBlog(blog);
//   };

//   const closeBlogPopup = () => {
//     setSelectedBlog(null);
//   };

//   if (loading) return <div>Loading blogs…</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">All Blogs</h1>

//       <button
//         onClick={goToAdd}
//         className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
//       >
//         Add New Blog
//       </button>

//       {blogs.length === 0 ? (
//         <p>No blogs found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {blogs.map(blog => (
//             <li key={blog.blogId} className="border p-4 rounded shadow">
//               <div className="flex flex-col md:flex-row">
//                 {blog.coverImage && (
//                   <img
//                     src={blog.coverImage.trim()}
//                     alt={blog.title}
//                     className="w-full md:w-1/3 h-auto object-cover rounded mb-4 md:mb-0 md:mr-4"
//                   />
//                 )}
//                 <div className="flex-1">
//                   <h2 className="text-xl font-semibold">{blog.title.trim()}</h2>
//                   <p className="text-sm text-gray-600 mb-2">
//                     By {blog.authorName} on {new Date(blog.createdAt).toLocaleDateString()}
//                   </p>
//                   <p className="mb-2">{blog.shortDescription}</p>
//                   <p className="mb-2 text-gray-700">
//                     Category: {blog.category.blogCategoryName.trim()}
//                   </p>
//                   <button
//                     onClick={() => openBlogPopup(blog)}
//                     className="text-blue-600 hover:underline mt-2 inline-block"
//                   >
//                     Read more
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       <Dialog
//         open={!!selectedBlog}
//         onClose={closeBlogPopup}
//         className="fixed z-50 inset-0 overflow-y-auto"
//       >
//         <div className="flex items-center justify-center min-h-screen px-4">
//           <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//           <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
//             <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
//               {selectedBlog?.title}
//             </Dialog.Title>
//             {selectedBlog && (
//               <div>
//                 <p className="mb-4">
//                   <strong>Blog ID:</strong> {selectedBlog.blogId}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Author Email:</strong> {selectedBlog.authorEmail}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Author Name:</strong> {selectedBlog.authorName}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Created At:</strong> {new Date(selectedBlog.createdAt).toLocaleDateString()}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Title:</strong> {selectedBlog.title}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Short Description:</strong> {selectedBlog.shortDescription}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Content:</strong> {selectedBlog.content}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Category ID:</strong> {selectedBlog.category.blogCategoryId}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Category Name:</strong> {selectedBlog.category.blogCategoryName}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Category Description:</strong> {selectedBlog.category.blogCategoryDescription}
//                 </p>
//                 {selectedBlog.coverImage && (
//                   <img
//                     src={selectedBlog.coverImage.trim()}
//                     alt={selectedBlog.title}
//                     className="w-1/4 h-auto object-cover rounded mb-4"
//                   />
//                 )}
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={closeBlogPopup}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//                   >
//                     Close
//                   </button>
//                   <Link
//                     to={`/admin/ViewBlog/${selectedBlog.blogId}`}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//                   >
//                     Edit
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default ViewBlogs;












// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Dialog } from '@headlessui/react';
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

// const ViewBlogs: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
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

//   const openBlogPopup = (blog: Blog) => {
//     setSelectedBlog(blog);
//   };

//   const closeBlogPopup = () => {
//     setSelectedBlog(null);
//   };

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
//                     <button
//                       onClick={() => openBlogPopup(blog)}
//                       className="text-blue-600 hover:underline text-sm font-medium"
//                     >
//                       Read more
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}

//         <Dialog
//           open={!!selectedBlog}
//           onClose={closeBlogPopup}
//           className="fixed z-50 inset-0 overflow-y-auto"
//         >
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl">
//               <Dialog.Title className="text-2xl font-bold text-gray-900 mb-4">
//                 {selectedBlog?.title}
//               </Dialog.Title>
//               {selectedBlog && (
//                 <div>
//                   <p className="mb-3">
//                     <strong className="text-gray-700">Blog ID:</strong> {selectedBlog.blogId}
//                   </p>
//                   <p className="mb-3">
//                     <strong className="text-gray-700">Author Email:</strong> {selectedBlog.authorEmail}
//                   </p>
//                   <p className="mb-3">
//                     <strong className="text-gray-700">Author Name:</strong> {selectedBlog.authorName}
//                   </p>
//                   <p className="mb-3">
//                     <strong className="text-gray-700">Created At:</strong> {new Date(selectedBlog.createdAt).toLocaleDateString()}
//                   </p>
//                   <p className="mb-3">
//                     <strong className="text-gray-700">Title:</strong> {selectedBlog.title}
//                   </p>
//                   <p className="mb-3">
//                     <strong className="text-gray-700">Short Description:</strong> {selectedBlog.shortDescription}
//                   </p>
//                   <p className="mb-3">
//                     <strong className="text-gray-700">Content:</strong> {selectedBlog.content}
//                   </p>
//                   <p className="mb-3">
//                     <strong className="text-gray-700">Category ID:</strong> {selectedBlog.category.blogCategoryId}
//                   </p>
//                   <p className="mb-3">
//                     <strong className="text-gray-700">Category Name:</strong> {selectedBlog.category.blogCategoryName}
//                   </p>
//                   <p className="mb-3">
//                     <strong className="text-gray-700">Category Description:</strong> {selectedBlog.category.blogCategoryDescription}
//                   </p>
//                   {selectedBlog.coverImage && (
//                     <img
//                       src={selectedBlog.coverImage.trim()}
//                       alt={selectedBlog.title}
//                       className="w-1/6 h-auto object-cover rounded mb-4"
//                     />
//                   )}
//                   <div className="flex justify-end space-x-4">
//                     <button
//                       onClick={closeBlogPopup}
//                       className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
//                     >
//                       Close
//                     </button>
//                     <Link
//                       to={`/admin/ViewBlog/${selectedBlog.blogId}`}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
//                     >
//                       Edit
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </Dialog.Panel>
//           </div>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default ViewBlogs;












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

// const ViewBlogs: React.FC = () => {
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

//         <button
//           onClick={goToAdd}
//           className="mb-6 px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 shadow-md"
//         >
//           Add New Blog
//         </button>

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

// export default ViewBlogs;













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

const ViewBlogs: React.FC = () => {
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

export default ViewBlogs;