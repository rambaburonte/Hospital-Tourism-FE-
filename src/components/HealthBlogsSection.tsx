
// import React from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { ArrowRight } from 'lucide-react';

// const blogs = [
//   {
//     title: "Understanding Migraines: Causes and Management",
//     image: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     excerpt: "Learn about the common causes of migraines and effective management strategies.",
//     category: "Neurology"
//   },
//   {
//     title: "Common Signs of Nutrient Deficiencies",
//     image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     excerpt: "Understanding the subtle symptoms your body uses to signal nutrient deficiencies.",
//     category: "Nutrition"
//   },
//   {
//     title: "Pregnancy Care: Essential Tips for Every Trimester",
//     image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     excerpt: "Expert advice for maintaining health throughout each phase of pregnancy.",
//     category: "Obstetrics"
//   }
// ];

// const HealthBlogsSection = () => {
//   return (
//     <section className="py-12">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="mb-8 flex justify-between items-center">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Health Blogs</h2>
//           <a href="#" className="text-primary font-medium hover:underline flex items-center">
//             View All <ArrowRight className="ml-1 h-4 w-4" />
//           </a>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {blogs.map((blog, index) => (
//             <Card key={index} className="overflow-hidden border-0 shadow-md blog-card">
//               <div className="relative h-48">
//                 <img 
//                   src={blog.image} 
//                   alt={blog.title} 
//                   className="w-full h-full object-cover"
//                 />
//                 <span className="absolute top-3 left-3 bg-primary text-white px-2 py-1 text-xs rounded">
//                   {blog.category}
//                 </span>
//               </div>
//               <CardContent className="p-4">
//                 <h3 className="font-semibold text-gray-800 mb-2">{blog.title}</h3>
//                 <p className="text-sm text-gray-600 mb-4">{blog.excerpt}</p>
//                 <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center">
//                   Read More <ArrowRight className="ml-1 h-4 w-4" />
//                 </a>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HealthBlogsSection;









// import React from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { ArrowRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const blogs = [
//   {
//     title: "Understanding Migraines: Causes and Management",
//     image: "https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     excerpt: "Learn about the common causes of migraines and effective management strategies.",
//     category: "Neurology"
//   },
//   {
//     title: "Common Signs of Nutrient Deficiencies",
//     image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     excerpt: "Understanding the subtle symptoms your body uses to signal nutrient deficiencies.",
//     category: "Nutrition"
//   },
//   {
//     title: "Pregnancy Care: Essential Tips for Every Trimester",
//     image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     excerpt: "Expert advice for maintaining health throughout each phase of pregnancy.",
//     category: "Obstetrics"
//   }
// ];

// const HealthBlogsSection = () => {
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleViewAll = () => {
//     navigate('/health-blogs'); // Navigate to /health-blogs
//   };

//   return (
//     <section className="py-12">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="mb-8 flex justify-between items-center">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Health Blogs</h2>
//           <span
//             onClick={handleViewAll} // Trigger navigation on click
//             className="text-primary font-medium hover:underline flex items-center cursor-pointer"
//           >
//             View All <ArrowRight className="ml-1 h-4 w-4" />
//           </span>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
//           {blogs.map((blog, index) => (
//             <Card key={index} className="overflow-hidden border-0 shadow-md blog-card bg-slate-50 shadow-sm">
//               <div className="relative h-48">
//                 <img
//                   src={blog.image}
//                   alt={blog.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <span className="absolute top-3 left-3 bg-primary text-white px-2 py-1 text-xs rounded">
//                   {blog.category}
//                 </span>
//               </div>
//               <CardContent className="p-4">
//                 <h3 className="font-semibold text-gray-800 mb-2">{blog.title}</h3>
//                 <p className="text-sm text-gray-600 mb-4">{blog.excerpt}</p>
//                <span
//                                    onClick={() => navigate('/blogs')}
//                                    className="text-[#499E14] text-sm font-medium hover:text-[#3a7e10] flex items-center cursor-pointer transition-colors duration-200"
//                                  >
//                                    Read More <ArrowRight className="ml-1 h-4 w-4" />
//                                  </span>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HealthBlogsSection;









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
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
        const data = res.data;
        if (Array.isArray(data)) {
          const mappedBlogs: Blog[] = data
            .map((item: any) => ({
              blogId: item.blogId || item.id || 0,
              authorEmail: item.authorEmail || '',
              authorName: item.authorName || 'Unknown Author',
              title: item.title || 'Untitled',
              shortDescription: item.shortDescription || '',
              content: item.content || '',
              coverImage: item.coverImage || item.imageUrl || 'https://via.placeholder.com/1470x980?text=No+Image',
              createdAt: item.createdAt || item.created_at || new Date().toISOString(),
              category: {
                blogCategoryId: item.category?.blogCategoryId || item.category?.id || 0,
                blogCategoryName: item.category?.blogCategoryName || item.category?.name || 'General',
                blogCategoryDescription: item.category?.blogCategoryDescription || '',
                blogCategoryImageUrl: item.category?.blogCategoryImageUrl || '',
              },
            }))
            .slice(0, 3); // Limit to 3 blogs for display, matching original
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

  const handleViewAll = () => {
    navigate('/health-blogs');
  };

  if (loading) return <div className="text-center py-12">Loading blogs…</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Health Blogs</h2>
          <span
            onClick={handleViewAll}
            className="text-primary font-medium hover:underline flex items-center cursor-pointer"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.length === 0 ? (
            <p className="text-gray-600 italic col-span-3 text-center">No blogs found.</p>
          ) : (
            blogs.map((blog) => (
              <Card
                key={blog.blogId}
                className="overflow-hidden border-0 shadow-md blog-card bg-slate-50 shadow-sm"
              >
                <div className="relative h-48">
                  <img
                    src={blog.coverImage.trim()}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-white px-2 py-1 text-xs rounded">
                    {blog.category.blogCategoryName.trim()}
                  </span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{blog.title.trim()}</h3>
                  <p className="text-sm text-gray-600 mb-4">{blog.shortDescription}</p>
                  <span
                    onClick={() => navigate(`admin/ViewBlog/${blog.blogId}`)}
                    className="text-[#499E14] text-sm font-medium hover:text-[#3a7e10] flex items-center cursor-pointer transition-colors duration-200"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HealthBlogsSection;