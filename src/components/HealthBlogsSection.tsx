

// import React, { useEffect, useState } from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { ArrowRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
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
//         const data = res.data;
//         if (Array.isArray(data)) {
//           const mappedBlogs: Blog[] = data
//             .map((item: any) => ({
//               blogId: item.blogId || item.id || 0,
//               authorEmail: item.authorEmail || '',
//               authorName: item.authorName || 'Unknown Author',
//               title: item.title || 'Untitled',
//               shortDescription: item.shortDescription || '',
//               content: item.content || '',
//               coverImage: item.coverImage || item.imageUrl || 'https://via.placeholder.com/1470x980?text=No+Image',
//               createdAt: item.createdAt || item.created_at || new Date().toISOString(),
//               category: {
//                 blogCategoryId: item.category?.blogCategoryId || item.category?.id || 0,
//                 blogCategoryName: item.category?.blogCategoryName || item.category?.name || 'General',
//                 blogCategoryDescription: item.category?.blogCategoryDescription || '',
//                 blogCategoryImageUrl: item.category?.blogCategoryImageUrl || '',
//               },
//             }))
//             .slice(0, 3); // Limit to 3 blogs for display, matching original
//           setBlogs(mappedBlogs);
//         } else {
//           setError('Unexpected data format from API');
//         }
//       })
//       .catch(err => {
//         setError(err.response?.data?.message || err.message || 'Failed to fetch blogs');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const handleViewAll = () => {
//     navigate('/health-blogs');
//   };

//   if (loading) return <div className="text-center py-12">Loading blogs…</div>;
//   if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;

//   return (
//     <section className="py-12">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="mb-8 flex justify-between items-center">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Health Blogs</h2>
//           <span
//             onClick={handleViewAll}
//             className="text-primary font-medium hover:underline flex items-center cursor-pointer"
//           >
//             View All <ArrowRight className="ml-1 h-4 w-4" />
//           </span>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {blogs.length === 0 ? (
//             <p className="text-gray-600 italic col-span-3 text-center">No blogs found.</p>
//           ) : (
//             blogs.map((blog) => (
//               <Card
//                 key={blog.blogId}
//                 className="overflow-hidden border-0 shadow-md blog-card bg-slate-50 shadow-sm"
//               >
//                 <div className="relative h-48">
//                   <img
//                     src={blog.coverImage.trim()}
//                     alt={blog.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <span className="absolute top-3 left-3 bg-primary text-white px-2 py-1 text-xs rounded">
//                     {blog.category.blogCategoryName.trim()}
//                   </span>
//                 </div>
//                 <CardContent className="p-4">
//                   <h3 className="font-semibold text-gray-800 mb-2">{blog.title.trim()}</h3>
//                   <p className="text-sm text-gray-600 mb-4">{blog.shortDescription}</p>
//                   <span
//                     onClick={() => navigate(`admin/ViewBlog/${blog.blogId}`)}
//                     className="text-[#499E14] text-sm font-medium hover:text-[#3a7e10] flex items-center cursor-pointer transition-colors duration-200"
//                   >
//                     Read More <ArrowRight className="ml-1 h-4 w-4" />
//                   </span>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>
//       </div>
//     </section>
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
            .slice(0, 4); // Limit to 4 blogs for display
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

        <div className="overflow-hidden">
          <div className="flex animate-scroll gap-4">
            {blogs.length === 0 ? (
              <p className="text-gray-600 italic text-center w-full">No blogs found.</p>
            ) : (
              [...blogs, ...blogs].map((blog, index) => ( // Duplicate blogs for seamless scrolling
                <Card
                  key={`${blog.blogId}-${index}`}
                  className="flex-none w-64 border-0 shadow-md blog-card bg-slate-50 shadow-sm"
                >
                  <div className="relative h-36">
                    <img
                      src={blog.coverImage.trim()}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-primary text-white px-1.5 py-0.5 text-xs rounded">
                      {blog.category.blogCategoryName.trim()}
                    </span>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{blog.title.trim()}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{blog.shortDescription}</p>
                    <span
                      onClick={() => navigate(`admin/ViewBlog/${blog.blogId}`)}
                      className="text-[#499E14] text-xs font-medium hover:text-[#3a7e10] flex items-center cursor-pointer transition-colors duration-200"
                    >
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default HealthBlogsSection;