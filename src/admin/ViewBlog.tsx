// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
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

// const ViewBlog: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${BASE_URL}/api/blogs/get/{blogId}`)
//       .then(res => {
//         const data = res.data;
//         setBlog(data);
//       })
//       .catch(err => {
//         console.error('Error loading blog:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to fetch blog');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <div>Loading blog…</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;
//   if (!blog) return <div>Blog not found</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">{blog.title}</h1>
//         <p className="mb-4"><strong className="text-gray-700">Blog ID:</strong> {blog.blogId}</p>
//         <p className="mb-4"><strong className="text-gray-700">Author Email:</strong> {blog.authorEmail}</p>
//         <p className="mb-4"><strong className="text-gray-700">Author Name:</strong> {blog.authorName}</p>
//         <p className="mb-4"><strong className="text-gray-700">Created At:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
//         <p className="mb-4"><strong className="text-gray-700">Title:</strong> {blog.title}</p>
//         <p className="mb-4"><strong className="text-gray-700">Short Description:</strong> {blog.shortDescription}</p>
//         <p className="mb-4"><strong className="text-gray-700">Content:</strong> {blog.content}</p>
//         <p className="mb-4"><strong className="text-gray-700">Category ID:</strong> {blog.category.blogCategoryId}</p>
//         <p className="mb-4"><strong className="text-gray-700">Category Name:</strong> {blog.category.blogCategoryName}</p>
//         <p className="mb-4"><strong className="text-gray-700">Category Description:</strong> {blog.category.blogCategoryDescription}</p>
//         {blog.coverImage && (
//           <img src={blog.coverImage.trim()} alt={blog.title} className="w-1/4 h-auto object-cover rounded mb-4" />
//         )}
//         <Link to="/admin/ViewBlogs" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium">
//           Back
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ViewBlog;











// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
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

// const ViewBlog: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${BASE_URL}/api/blogs/get/${id}`)
//       .then(res => {
//         const data = res.data;
//         setBlog(data);
//       })
//       .catch(err => {
//         console.error('Error loading blog:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to fetch blog');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <div>Loading blog…</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;
//   if (!blog) return <div>Blog not found</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">{blog.title}</h1>
//         <p className="mb-4"><strong className="text-gray-700">Blog ID:</strong> {blog.blogId}</p>
//         <p className="mb-4"><strong className="text-gray-700">Author Email:</strong> {blog.authorEmail}</p>
//         <p className="mb-4"><strong className="text-gray-700">Author Name:</strong> {blog.authorName}</p>
//         <p className="mb-4"><strong className="text-gray-700">Created At:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
//         <p className="mb-4"><strong className="text-gray-700">Title:</strong> {blog.title}</p>
//         <p className="mb-4"><strong className="text-gray-700">Short Description:</strong> {blog.shortDescription}</p>
//         <p className="mb-4"><strong className="text-gray-700">Content:</strong> {blog.content}</p>
//         <p className="mb-4"><strong className="text-gray-700">Category ID:</strong> {blog.category.blogCategoryId}</p>
//         <p className="mb-4"><strong className="text-gray-700">Category Name:</strong> {blog.category.blogCategoryName}</p>
//         <p className="mb-4"><strong className="text-gray-700">Category Description:</strong> {blog.category.blogCategoryDescription}</p>
//         {blog.coverImage && (
//           <img src={blog.coverImage.trim()} alt={blog.title} className="w-1/4 h-auto object-cover rounded mb-4" />
//         )}
//         <Link to="/admin/ViewBlogs" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium">
//           Back
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ViewBlog;










// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
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

// const ViewBlog: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${BASE_URL}/api/blogs/get/${id}`)
//       .then(res => {
//         console.log('Full API response for blog:', res);
//         const data = res.data;
//         const mappedBlog: Blog = {
//           blogId: data.blogId || 0,
//           authorEmail: data.authorEmail || '',
//           authorName: data.authorName || '',
//           title: data.title || data.metaTitle || '',
//           shortDescription: data.shortDescription || data.metaDescription || '',
//           content: data.content || '',
//           coverImage: data.coverImage || '',
//           createdAt: data.createdAt || new Date().toISOString(), // Fallback since response lacks createdAt
//           category: {
//             blogCategoryId: data.categoryId || 0,
//             blogCategoryName: data.categoryName || '',
//             blogCategoryDescription: '',
//             blogCategoryImageUrl: '',
//           },
//         };
//         console.log('Mapped blog:', mappedBlog);
//         setBlog(mappedBlog);
//       })
//       .catch(err => {
//         console.error('Error loading blog:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to fetch blog');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <div>Loading blog…</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;
//   if (!blog) return <div>Blog not found</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">{blog.title}</h1>
//         <p className="mb-4"><strong className="text-gray-700">Blog ID:</strong> {blog.blogId}</p>
//         <p className="mb-4"><strong className="text-gray-700">Author Email:</strong> {blog.authorEmail}</p>
//         <p className="mb-4"><strong className="text-gray-700">Author Name:</strong> {blog.authorName}</p>
//         <p className="mb-4"><strong className="text-gray-700">Created At:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
//         <p className="mb-4"><strong className="text-gray-700">Title:</strong> {blog.title}</p>
//         <p className="mb-4"><strong className="text-gray-700">Short Description:</strong> {blog.shortDescription}</p>
//         <p className="mb-4"><strong className="text-gray-700">Content:</strong> {blog.content}</p>
//         <p className="mb-4"><strong className="text-gray-700">Category ID:</strong> {blog.category.blogCategoryId}</p>
//         <p className="mb-4"><strong className="text-gray-700">Category Name:</strong> {blog.category.blogCategoryName}</p>
//         <p className="mb-4"><strong className="text-gray-700">Category Description:</strong> {blog.category.blogCategoryDescription}</p>
//         {blog.coverImage && (
//           <img src={blog.coverImage.trim()} alt={blog.title} className="w-1/4 h-auto object-cover rounded mb-4" />
//         )}
//         <Link to="/admin/ViewBlogs" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium">
//           Back
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ViewBlog;














// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import { BASE_URL } from '@/config/config';

// interface Category {
//   blogCategoryName: string;
//   blogCategoryDescription: string;
//   blogCategoryImageUrl: string;
// }

// interface Blog {
//   authorEmail: string;
//   authorName: string;
//   title: string;
//   shortDescription: string;
//   content: string;
//   coverImage: string;
//   createdAt: string;
//   category: Category;
//   readTime?: string; // Optional field for read time
// }

// const ViewBlog: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${BASE_URL}/api/blogs/get/${id}`)
//       .then(res => {
//         const data = res.data;
//         const mappedBlog: Blog = {
//           authorEmail: data.authorEmail || '',
//           authorName: data.authorName || '',
//           title: data.title || data.metaTitle || '',
//           shortDescription: data.shortDescription || data.metaDescription || '',
//           content: data.content || '',
//           coverImage: data.coverImage || '',
//           createdAt: data.createdAt || new Date().toISOString(),
//           category: {
//             blogCategoryName: data.categoryName || '',
//             blogCategoryDescription: '',
//             blogCategoryImageUrl: '',
//           },
//           readTime: '7 min read', // Mock read time, adjust as needed
//         };
//         setBlog(mappedBlog);
//       })
//       .catch(err => {
//         console.error('Error loading blog:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to fetch blog');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <div className="text-center text-gray-600 py-24">Loading blog…</div>;
//   if (error) return <div className="text-center text-red-500 py-24">Error: {error}</div>;
//   if (!blog) return <div className="text-center text-gray-600 py-24">Blog not found</div>;

//   const shareUrl = window.location.href;
//   const shareTitle = blog.title;

//   return (
//     <section className="py-24 bg-gray-50 min-h-screen font-inter">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
//         {/* Breadcrumb Navigation */}
//         <nav className="text-sm sm:text-base text-gray-600 mb-10 border-b border-gray-200 pb-4">
//           <ol className="flex flex-wrap gap-4 items-center">
//             <li>
//               <Link to="/" className="hover:text-[#499E14] transition-colors duration-300 font-medium">Home</Link>
//             </li>
//             <li className="text-gray-400" aria-hidden="true">/</li>
//             <li>
//               <Link to="/admin/ViewBlogs" className="hover:text-[#499E14] transition-colors duration-300 font-medium">Blogs</Link>
//             </li>
//             <li className="text-gray-400" aria-hidden="true">/</li>
//             <li>
//               <Link to="#" className="hover:text-[#499E14] transition-colors duration-300 font-medium">{blog.category.blogCategoryName}</Link>
//             </li>
//             <li className="text-gray-400" aria-hidden="true">/</li>
//             <li className="text-gray-700 font-semibold truncate max-w-md">{blog.title}</li>
//           </ol>
//         </nav>

//         {/* Blog Header */}
//         <div className="mb-12">
//           <h1 className="text-3xl sm:text-4xl font-semibold text-gray-700 mb-4 leading-tight tracking-tight">{blog.title}</h1>
//           <div className="flex flex-wrap gap-6 text-sm sm:text-base text-gray-600">
//             <p>By <strong className="text-gray-700">{blog.authorName}</strong> in {blog.category.blogCategoryName}</p>
//             <p>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {blog.readTime}</p>
//           </div>
//         </div>

//         {/* Call to Action Banner */}
//         <div className="bg-[#f0f8e8] p-6 sm:p-8 rounded-xl mb-12 flex flex-col md:flex-row justify-between items-center shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:brightness-105">
//           <div className="text-gray-700 mb-6 md:mb-0">
//             <h3 className="text-xl font-semibold mb-2 tracking-tight">Book an Appointment</h3>
//             <p className="text-gray-600 text-base">Contact our specialists today</p>
//             <p className="text-2xl font-semibold tracking-tight">+91 926 888 0303</p>
//           </div>
//           <a
//             href="tel:+919268880303"
//             className="bg-white text-[#499E14] px-8 py-3 rounded-full hover:bg-[#f0f8e8] hover:brightness-105 transition-colors duration-300 font-medium text-base flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//             aria-label="Call to book an appointment"
//           >
//             📞 Call Now
//           </a>
//         </div>

//         {/* Blog Image */}
//         {blog.coverImage && (
//           <div className="relative h-80 md:h-96 mb-12 rounded-xl overflow-hidden shadow-sm transition-transform duration-300 hover:scale-[1.01]">
//             <img
//               src={blog.coverImage.trim()}
//               alt={blog.title}
//               className="w-full h-full object-cover"
//               loading="lazy"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true"></div>
//             <span className="absolute top-4 left-4 bg-[#499E14] text-white px-4 py-2 text-sm font-medium rounded-full shadow-sm">
//               {blog.category.blogCategoryName}
//             </span>
//           </div>
//         )}

//         {/* Blog Content */}
//         <div
//           className="max-w-3xl mx-auto prose prose-base prose-gray"
//           dangerouslySetInnerHTML={{ __html: blog.content }}
//         />

//         {/* Share Section */}
//         <div className="max-w-3xl mx-auto mt-12 border-t border-gray-200 pt-8">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4 tracking-tight">Share This Article</h3>
//           <div className="flex gap-8">
//             <a
//               href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-[#499E14] transition-colors duration-300 text-3xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//               aria-label="Share on LinkedIn"
//             >
//               🔗
//             </a>
//             <a
//               href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-[#499E14] transition-colors duration-300 text-3xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//               aria-label="Share on Twitter"
//             >
//               🐦
//             </a>
//             <a
//               href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-[#499E14] transition-colors duration-300 text-3xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//               aria-label="Share on WhatsApp"
//             >
//               📲
//             </a>
//           </div>
//         </div>

//         {/* Author Section */}
//         <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm transition-transform duration-300 hover:scale-[1.02] border border-gray-100">
//           <h3 className="text-xl font-semibold text-gray-700 mb-3 tracking-tight">Written and Verified by</h3>
//           <p className="text-gray-600 text-base">
//             <strong className="text-gray-700">{blog.authorName}</strong> • {blog.category.blogCategoryName}
//           </p>
//           <Link
//             to="#"
//             className="mt-4 inline-block text-[#499E14] hover:text-[#3a7e10] font-medium text-base transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//             aria-label="Meet the doctor"
//           >
//             Meet the Doctor
//           </Link>
//         </div>

//         {/* Back to Blogs */}
//         <div className="max-w-3xl mx-auto mt-12">
//           <Link
//             to="/admin/ViewBlogs"
//             className="text-[#499E14] hover:text-[#3a7e10] font-medium text-base flex items-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//             aria-label="Back to Blogs"
//           >
//             ← Back to Blogs
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ViewBlog;












// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import { BASE_URL } from '@/config/config';

// interface Category {
//   blogCategoryName: string;
//   blogCategoryDescription: string;
//   blogCategoryImageUrl: string;
// }

// interface Blog {
//   authorEmail: string;
//   authorName: string;
//   title: string;
//   shortDescription: string;
//   content: string;
//   coverImage: string;
//   createdAt: string;
//   category: Category;
// }

// const ViewBlog: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${BASE_URL}/api/blogs/get/${id}`)
//       .then(res => {
//         console.log('Full API response for blog:', res);
//         const data = res.data;
//         const mappedBlog: Blog = {
//           authorEmail: data.authorEmail || '',
//           authorName: data.authorName || '',
//           title: data.title || data.metaTitle || '',
//           shortDescription: data.shortDescription || data.metaDescription || '',
//           content: data.content || '',
//           coverImage: data.coverImage || '',
//           createdAt: data.createdAt || new Date().toISOString(),
//           category: {
//             blogCategoryName: data.categoryName || '',
//             blogCategoryDescription: '',
//             blogCategoryImageUrl: '',
//           },
//         };
//         console.log('Mapped blog:', mappedBlog);
//         setBlog(mappedBlog);
//       })
//       .catch(err => {
//         console.error('Error loading blog:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to fetch blog');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <div className="text-center py-24 text-gray-600">Loading blog…</div>;
//   if (error) return <div className="text-center py-24 text-red-500">Error: {error}</div>;
//   if (!blog) return <div className="text-center py-24 text-gray-600">Blog not found</div>;

//   const shareUrl = window.location.href;
//   const shareTitle = blog.title;

//   return (
//     <section className="py-24 bg-gray-50 min-h-screen font-inter">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
//         {/* Breadcrumb Navigation */}
//         <nav className="text-sm sm:text-base text-gray-600 mb-10 border-b border-gray-200 pb-4">
//           <ol className="flex flex-wrap gap-4 items-center">
//             <li>
//               <Link to="/" className="hover:text-[#499E14] transition-colors duration-300 font-medium">Home</Link>
//             </li>
//             <li className="text-gray-400" aria-hidden="true">/</li>
//             <li>
//               <Link to="/admin/ViewBlogs" className="hover:text-[#499E14] transition-colors duration-300 font-medium">Blogs</Link>
//             </li>
//             <li className="text-gray-400" aria-hidden="true">/</li>
//             <li>
//               <Link to="#" className="hover:text-[#499E14] transition-colors duration-300 font-medium">{blog.category.blogCategoryName}</Link>
//             </li>
//             <li className="text-gray-400" aria-hidden="true">/</li>
//             <li className="text-gray-700 font-semibold truncate max-w-md">{blog.title}</li>
//           </ol>
//         </nav>

//         {/* Blog Header */}
//         <div className="mb-12">
//           <h1 className="text-3xl sm:text-4xl font-semibold text-gray-700 mb-4 leading-tight tracking-tight">{blog.title}</h1>
//           <div className="flex flex-wrap gap-6 text-sm sm:text-base text-gray-600">
//             <p>By <strong className="text-gray-700">{blog.authorName}</strong> in {blog.category.blogCategoryName}</p>
//             <p>{new Date(blog.createdAt).toLocaleDateString()} • 7 min read</p>
//           </div>
//         </div>

//         {/* Call to Action Banner */}
//         <div className="bg-[#f0f8e8] p-6 sm:p-8 rounded-xl mb-12 flex flex-col md:flex-row justify-between items-center shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:brightness-105">
//           <div className="text-gray-700 mb-6 md:mb-0">
//             <h3 className="text-xl font-semibold mb-2 tracking-tight">Book an Appointment</h3>
//             <p className="text-gray-600 text-base">Contact our specialists today</p>
//             <p className="text-2xl font-semibold tracking-tight">+91 926 888 0303</p>
//           </div>
//           <a
//             href="tel:+919268880303"
//             className="bg-white text-[#499E14] px-8 py-3 rounded-full hover:bg-[#f0f8e8] hover:brightness-105 transition-colors duration-300 font-medium text-base flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//             aria-label="Call to book an appointment"
//           >
//             📞 Call Now
//           </a>
//         </div>

//         {/* Blog Image */}
//         {blog.coverImage && (
//           <div className="relative h-80 md:h-96 mb-12 rounded-xl overflow-hidden shadow-sm transition-transform duration-300 hover:scale-[1.01]">
//             <img
//               src={blog.coverImage.trim()}
//               alt={blog.title}
//               className="w-full h-full object-cover"
//               loading="lazy"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true"></div>
//             <span className="absolute top-4 left-4 bg-[#499E14] text-white px-4 py-2 text-sm font-medium rounded-full shadow-sm">
//               {blog.category.blogCategoryName}
//             </span>
//           </div>
//         )}

//         {/* Blog Content */}
//         <div className="max-w-3xl mx-auto prose prose-base prose-gray">
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Short Description</h2>
//           <p className="text-gray-600 leading-relaxed mb-6">{blog.shortDescription}</p>
          
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Content</h2>
//           <div dangerouslySetInnerHTML={{ __html: blog.content }} />

//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Author Email</h2>
//           <p className="text-gray-600 leading-relaxed mb-6">{blog.authorEmail}</p>

//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Author Name</h2>
//           <p className="text-gray-600 leading-relaxed mb-6">{blog.authorName}</p>

//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Category Name</h2>
//           <p className="text-gray-600 leading-relaxed mb-6">{blog.category.blogCategoryName}</p>

//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Category Description</h2>
//           <p className="text-gray-600 leading-relaxed mb-6">{blog.category.blogCategoryDescription || 'No description available'}</p>

//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Created At</h2>
//           <p className="text-gray-600 leading-relaxed mb-6">{new Date(blog.createdAt).toLocaleDateString()}</p>
//         </div>

//         {/* Share Section */}
//         <div className="max-w-3xl mx-auto mt-12 border-t border-gray-200 pt-8">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4 tracking-tight">Share This Article</h3>
//           <div className="flex gap-8">
//             <a
//               href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-[#499E14] transition-colors duration-300 text-3xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//               aria-label="Share on LinkedIn"
//             >
//               🔗
//             </a>
//             <a
//               href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-[#499E14] transition-colors duration-300 text-3xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//               aria-label="Share on Twitter"
//             >
//               🐦
//             </a>
//             <a
//               href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-[#499E14] transition-colors duration-300 text-3xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//               aria-label="Share on WhatsApp"
//             >
//               📲
//             </a>
//           </div>
//         </div>

//         {/* Author Section */}
//         <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm transition-transform duration-300 hover:scale-[1.02] border border-gray-100">
//           <h3 className="text-xl font-semibold text-gray-700 mb-3 tracking-tight">Written and Verified by</h3>
//           <p className="text-gray-600 text-base">
//             <strong className="text-gray-700">{blog.authorName}</strong> • {blog.category.blogCategoryName}
//           </p>
//           <Link
//             to="#"
//             className="mt-4 inline-block text-[#499E14] hover:text-[#3a7e10] font-medium text-base transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//             aria-label="Meet the author"
//           >
//             Meet the Author
//           </Link>
//         </div>

//         {/* Back to Blogs */}
//         <div className="max-w-3xl mx-auto mt-12">
//           <Link
//             to="/admin/ViewBlogs"
//             className="text-[#499E14] hover:text-[#3a7e10] font-medium text-base flex items-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//             aria-label="Back to Blogs"
//           >
//             ← Back to Blogs
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ViewBlog;










// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import { BASE_URL } from '@/config/config';

// interface Category {
//   blogCategoryName: string;
//   blogCategoryImageUrl: string;
// }

// interface Blog {
//   authorEmail: string;
//   authorName: string;
//   title: string;
//   shortDescription: string;
//   content: string;
//   coverImage: string;
//   createdAt: string;
//   category: Category;
// }

// const ViewBlog: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${BASE_URL}/api/blogs/get/${id}`)
//       .then(res => {
//         console.log('Full API response for blog:', res);
//         const data = res.data;
//         const mappedBlog: Blog = {
//           authorEmail: data.authorEmail || '',
//           authorName: data.authorName || '',
//           title: data.title || data.metaTitle || '',
//           shortDescription: data.shortDescription || data.metaDescription || '',
//           content: data.content || '',
//           coverImage: data.coverImage || '',
//           createdAt: data.createdAt || new Date().toISOString(),
//           category: {
//             blogCategoryName: data.categoryName || '',
//             blogCategoryImageUrl: '',
//           },
//         };
//         console.log('Mapped blog:', mappedBlog);
//         setBlog(mappedBlog);
//       })
//       .catch(err => {
//         console.error('Error loading blog:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to fetch blog');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <div className="text-center py-24 text-gray-600">Loading blog…</div>;
//   if (error) return <div className="text-center py-24 text-red-500">Error: {error}</div>;
//   if (!blog) return <div className="text-center py-24 text-gray-600">Blog not found</div>;

//   const shareUrl = window.location.href;
//   const shareTitle = blog.title;

//   return (
//     <section className="py-24 bg-gray-50 min-h-screen font-inter">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
//         {/* Breadcrumb Navigation */}
//         <nav className="text-sm sm:text-base text-gray-600 mb-10 border-b border-gray-200 pb-4">
//           <ol className="flex flex-wrap gap-4 items-center">
//             <li>
//               <Link to="/" className="hover:text-[#499E14] transition-colors duration-300 font-medium">Home</Link>
//             </li>
//             <li className="text-gray-400" aria-hidden="true">/</li>
//             <li>
//               <Link to="/admin/ViewBlogs" className="hover:text-[#499E14] transition-colors duration-300 font-medium">Blogs</Link>
//             </li>
//             <li className="text-gray-400" aria-hidden="true">/</li>
//             <li>
//               <Link to="#" className="hover:text-[#499E14] transition-colors duration-300 font-medium">{blog.category.blogCategoryName}</Link>
//             </li>
//             <li className="text-gray-400" aria-hidden="true">/</li>
//             <li className="text-gray-700 font-semibold truncate max-w-md">{blog.title}</li>
//           </ol>
//         </nav>

//         {/* Blog Header */}
//         <div className="mb-12">
//           <h1 className="text-3xl sm:text-4xl font-semibold text-gray-700 mb-4 leading-tight tracking-tight">{blog.title}</h1>
//           <div className="flex flex-wrap gap-6 text-sm sm:text-base text-gray-600">
//             <p>By <strong className="text-gray-700">{blog.authorName}</strong> in {blog.category.blogCategoryName}</p>
//             <p>{new Date(blog.createdAt).toLocaleDateString()} • 7 min read</p>
//           </div>
//         </div>

//         {/* Call to Action Banner */}
//         <div className="bg-[#f0f8e8] p-6 sm:p-8 rounded-xl mb-12 flex flex-col md:flex-row justify-between items-center shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:brightness-105">
//           <div className="text-gray-700 mb-6 md:mb-0">
//             <h3 className="text-xl font-semibold mb-2 tracking-tight">Book an Appointment</h3>
//             <p className="text-gray-600 text-base">Contact our specialists today</p>
//             <p className="text-2xl font-semibold tracking-tight">+91 926 888 0303</p>
//           </div>
//           <a
//             href="tel:+919268880303"
//             className="bg-white text-[#499E14] px-8 py-3 rounded-full hover:bg-[#f0f8e8] hover:brightness-105 transition-colors duration-300 font-medium text-base flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//             aria-label="Call to book an appointment"
//           >
//             📞 Call Now
//           </a>
//         </div>

//         {/* Blog Image */}
//         {blog.coverImage && (
//           <div className="relative h-80 md:h-96 mb-12 rounded-xl overflow-hidden shadow-sm transition-transform duration-300 hover:scale-[1.01]">
//             <img
//               src={blog.coverImage.trim()}
//               alt={blog.title}
//               className="w-full h-full object-cover"
//               loading="lazy"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true"></div>
//             <span className="absolute top-4 left-4 bg-[#499E14] text-white px-4 py-2 text-sm font-medium rounded-full shadow-sm">
//               {blog.category.blogCategoryName}
//             </span>
//           </div>
//         )}

//         {/* Blog Content */}
//         <div className="max-w-3xl mx-auto prose prose-base prose-gray">
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Category Name</h2>
//           <p className="text-gray-600 leading-relaxed mb-6">{blog.category.blogCategoryName}</p>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Author Name</h2>
//               <p className="text-gray-600 leading-relaxed">{blog.authorName}</p>
//             </div>
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Author Email</h2>
//               <p className="text-gray-600 leading-relaxed">{blog.authorEmail}</p>
//             </div>
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Created At</h2>
//               <p className="text-gray-600 leading-relaxed">{new Date(blog.createdAt).toLocaleDateString()}</p>
//             </div>
//           </div>

//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Short Description</h2>
//           <p className="text-gray-600 leading-relaxed mb-6">{blog.shortDescription}</p>

//           <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Content</h2>
//           <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//         </div>

//         {/* Share Section */}
//         <div className="max-w-3xl mx-auto mt-12 border-t border-gray-200 pt-8">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4 tracking-tight">Share This Article</h3>
//           <div className="flex gap-8">
//             <a
//               href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-[#499E14] transition-colors duration-300 text-3xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//               aria-label="Share on LinkedIn"
//             >
//               🔗
//             </a>
//             <a
//               href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-[#499E14] transition-colors duration-300 text-3xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//               aria-label="Share on Twitter"
//             >
//               🐦
//             </a>
//             <a
//               href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-[#499E14] transition-colors duration-300 text-3xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//               aria-label="Share on WhatsApp"
//             >
//               📲
//             </a>
//           </div>
//         </div>

//         {/* Author Section */}
//         <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm transition-transform duration-300 hover:scale-[1.02] border border-gray-100">
//           <h3 className="text-xl font-semibold text-gray-700 mb-3 tracking-tight">Written and Verified by</h3>
//           <p className="text-gray-600 text-base">
//             <strong className="text-gray-700">{blog.authorName}</strong> • {blog.category.blogCategoryName}
//           </p>
//           <Link
//             to="#"
//             className="mt-4 inline-block text-[#499E14] hover:text-[#3a7e10] font-medium text-base transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//             aria-label="Meet the author"
//           >
//             Meet the Author
//           </Link>
//         </div>

//         {/* Back to Blogs */}
//         <div className="max-w-3xl mx-auto mt-12">
//           <Link
//             to="/admin/ViewBlogs"
//             className="text-[#499E14] hover:text-[#3a7e10] font-medium text-base flex items-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
//             aria-label="Back to Blogs"
//           >
//             ← Back to Blogs
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ViewBlog;










import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

interface Category {
  blogCategoryName: string;
  blogCategoryImageUrl: string;
}

interface Blog {
  authorEmail: string;
  authorName: string;
  title: string;
  shortDescription: string;
  content: string;
  coverImage: string;
  createdAt: string;
  category: Category;
}

const ViewBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/blogs/get/${id}`)
      .then(res => {
        console.log('Full API response for blog:', res);
        const data = res.data;
        const mappedBlog: Blog = {
          authorEmail: data.authorEmail || '',
          authorName: data.authorName || '',
          title: data.title || data.metaTitle || '',
          shortDescription: data.shortDescription || data.metaDescription || '',
          content: data.content || '',
          coverImage: data.coverImage || '',
          createdAt: data.createdAt || new Date().toISOString(),
          category: {
            blogCategoryName: data.categoryName || '',
            blogCategoryImageUrl: '',
          },
        };
        console.log('Mapped blog:', mappedBlog);
        setBlog(mappedBlog);
      })
      .catch(err => {
        console.error('Error loading blog:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch blog');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-32 text-gray-500 text-lg font-medium animate-pulse">Loading blog...</div>;
  if (error) return <div className="text-center py-32 text-red-600 text-lg font-medium">Error: {error}</div>;
  if (!blog) return <div className="text-center py-32 text-gray-500 text-lg font-medium">Blog not found</div>;

  const shareUrl = window.location.href;
  const shareTitle = blog.title;

  return (
    <section className="py-16 bg-white min-h-screen font-sans antialiased">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-gray-500 mb-8">
          <ol className="flex flex-wrap gap-2 items-center">
            <li>
              <Link to="/" className="hover:text-[#2b6cb0] transition-colors duration-200 font-medium">Home</Link>
            </li>
            <li className="text-gray-400 mx-1">/</li>
            <li>
              <Link to="/admin/ViewBlogs" className="hover:text-[#2b6cb0] transition-colors duration-200 font-medium">Blogs</Link>
            </li>
            <li className="text-gray-400 mx-1">/</li>
            <li>
              <Link to="#" className="hover:text-[#2b6cb0] transition-colors duration-200 font-medium">{blog.category.blogCategoryName}</Link>
            </li>
            <li className="text-gray-400 mx-1">/</li>
            <li className="text-gray-700 font-medium truncate max-w-xs">{blog.title}</li>
          </ol>
        </nav>

        {/* Blog Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">{blog.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <p>By <span className="text-gray-800 font-medium">{blog.authorName}</span> in {blog.category.blogCategoryName}</p>
            <p>{new Date(blog.createdAt).toLocaleDateString()} • 7 min read</p>
          </div>
        </header>

        {/* Call to Action Banner */}
        <div className="bg-[#edf7fa] p-6 rounded-lg mb-10 flex flex-col md:flex-row justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-gray-800 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-1">Book an Appointment</h3>
            <p className="text-gray-600 text-sm">Contact our specialists today</p>
            <p className="text-xl font-bold tracking-tight">+91 926 888 0303</p>
          </div>
          <a
            href="tel:+919268880303"
            className="bg-[#2b6cb0] text-white px-6 py-2 rounded-full hover:bg-[#2a5e9e] transition-colors duration-200 font-medium text-sm flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#63b3ed]"
            aria-label="Call to book an appointment"
          >
            📞 Call Now
          </a>
        </div>

        {/* Blog Image */}
        {blog.coverImage && (
          <div className="relative h-64 md:h-80 mb-10 rounded-lg overflow-hidden shadow-md">
            <img
              src={blog.coverImage.trim()}
              alt={blog.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true"></div>
            <span className="absolute top-4 left-4 bg-[#2b6cb0] text-white px-3 py-1 text-xs font-semibold rounded-full">
              {blog.category.blogCategoryName}
            </span>
          </div>
        )}

        {/* Blog Content */}
        <article className="max-w-3xl mx-auto prose prose-lg prose-gray">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Category Name</h2>
          <p className="text-gray-700 leading-relaxed mb-8">{blog.category.blogCategoryName}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Author Name</h2>
              <p className="text-gray-700 leading-relaxed">{blog.authorName}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Author Email</h2>
              <p className="text-gray-700 leading-relaxed">{blog.authorEmail}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Created At</h2>
              <p className="text-gray-700 leading-relaxed">{new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Short Description</h2>
          <p className="text-gray-700 leading-relaxed mb-8">{blog.shortDescription}</p>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Content</h2>
          <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>

        {/* Share Section */}
        <div className="max-w-3xl mx-auto mt-12 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Article</h3>
          <div className="flex gap-6">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#2b6cb0] transition-colors duration-200 text-2xl focus:outline-none focus:ring-2 focus:ring-[#63b3ed]"
              aria-label="Share on LinkedIn"
            >
              🔗
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#2b6cb0] transition-colors duration-200 text-2xl focus:outline-none focus:ring-2 focus:ring-[#63b3ed]"
              aria-label="Share on Twitter"
            >
              🐦
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#2b6cb0] transition-colors duration-200 text-2xl focus:outline-none focus:ring-2 focus:ring-[#63b3ed]"
              aria-label="Share on WhatsApp"
            >
              📲
            </a>
          </div>
        </div>

        {/* Author Section */}
        <div className="max-w-3xl mx-auto mt-12 bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Written and Verified by</h3>
          <p className="text-gray-700 text-sm">
            <span className="text-gray-800 font-medium">{blog.authorName}</span> • {blog.category.blogCategoryName}
          </p>
          <Link
            to="#"
            className="mt-3 inline-block text-[#2b6cb0] hover:text-[#2a5e9e] font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#63b3ed]"
            aria-label="Meet the author"
          >
            Meet the Author
          </Link>
        </div>

        {/* Back to Blogs */}
          <div className="max-w-3xl mx-auto mt-10">
      <Link
        to="/admin/ViewBlogs"
        className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-[#4b9cd3] border border-[#4b9cd3] rounded-md hover:bg-[#2b6cb0] hover:text-white hover:scale-105 transition-all duration-200 ease-in-out"
        aria-label="Back to Blogs"
      >
        ← Back to Blogs
      </Link>
    </div>
      </div>
    </section>
  );
};

export default ViewBlog;