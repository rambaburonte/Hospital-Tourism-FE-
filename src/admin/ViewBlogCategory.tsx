

// import React, { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from '@/config/config';
// const AddBlogCategory: React.FC = () => {
//   const [blogCategoryName, setBlogCategoryName] = useState("");
//   const [blogCategoryDescription, setBlogCategoryDescription] = useState("");
//   const [blogCategoryCreatedBy, setBlogCategoryCreatedBy] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("blogCategoryName", blogCategoryName);
//     formData.append("blogCategoryDescription", blogCategoryDescription);
//     formData.append("blogCategoryCreatedBy", blogCategoryCreatedBy);
//     formData.append("blogCategoryCreatedDate", new Date().toISOString().split("T")[0]);
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/blog-categories`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log(response.data);
//       setMessage("✅ Blog category added successfully!");
//     } catch (error) {
//       console.error(error);
//       setMessage("❌ Failed to add blog category.");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Add Blog Category</h2>
//       {message && <p className="mb-4 text-blue-600">{message}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold">Category Name</label>
//           <input
//             type="text"
//             value={blogCategoryName}
//             onChange={(e) => setBlogCategoryName(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold">Description</label>
//           <textarea
//             value={blogCategoryDescription}
//             onChange={(e) => setBlogCategoryDescription(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold">Created By</label>
//           <input
//             type="text"
//             value={blogCategoryCreatedBy}
//             onChange={(e) => setBlogCategoryCreatedBy(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold">Upload Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files?.[0] || null)}
//             className="w-full"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBlogCategory;









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dialog } from "@headlessui/react";
// import { Button } from "@/components/ui/button";
// import { BASE_URL } from "@/config/config";

// interface BlogCategory {
//   blogCategoryId: number;
//   blogCategoryName: string;
//   blogCategoryDescription: string;
//   blogCategoryImageUrl: string;
//   blogCategoryCreatedBy: string;
//   blogCategoryCreatedDate: string;
// }

// const ViewBlogCategory: React.FC = () => {
//   const [categories, setCategories] = useState<BlogCategory[]>([]);
//   const [isOpen, setIsOpen] = useState(false);

//   const fetchCategories = () => {
//     axios
//       .get(`${BASE_URL}/api/blog-categories/getAll/categories`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Blog Categories</h1>
//         <Button onClick={() => setIsOpen(true)}>Add Blog Category</Button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {categories.map((category) => (
//           <div key={category.blogCategoryId} className="border p-4 rounded-lg shadow-sm">
//             <img
//               src={category.blogCategoryImageUrl}
//               alt={category.blogCategoryName}
//               className="h-40 w-full object-cover rounded"
//             />
//             <h2 className="text-lg font-semibold mt-2">{category.blogCategoryName}</h2>
//             <p className="text-sm">{category.blogCategoryDescription}</p>
//             <p className="text-xs text-gray-500 mt-1">Created by: {category.blogCategoryCreatedBy}</p>
//             <p className="text-xs text-gray-400">Date: {category.blogCategoryCreatedDate}</p>
//           </div>
//         ))}
//       </div>

//       <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
//         <div className="flex items-center justify-center min-h-screen px-4">
//           <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
//             <Dialog.Title className="text-xl font-bold mb-4">Add Blog Category</Dialog.Title>
//             <AddBlogCategory onSuccess={() => {
//               setIsOpen(false);
//               fetchCategories();
//             }} />
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default ViewBlogCategory;

// // Import your AddBlogCategory inline below
// interface AddProps {
//   onSuccess: () => void;
// }

// const AddBlogCategory: React.FC<AddProps> = ({ onSuccess }) => {
//   const [blogCategoryName, setBlogCategoryName] = useState("");
//   const [blogCategoryDescription, setBlogCategoryDescription] = useState("");
//   const [blogCategoryCreatedBy, setBlogCategoryCreatedBy] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("blogCategoryName", blogCategoryName);
//     formData.append("blogCategoryDescription", blogCategoryDescription);
//     formData.append("blogCategoryCreatedBy", blogCategoryCreatedBy);
//     formData.append("blogCategoryCreatedDate", new Date().toISOString().split("T")[0]);
//     if (image) formData.append("image", image);

//     try {
//       await axios.post(`${BASE_URL}/api/blog-categories`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMessage("✅ Blog category added successfully!");
//       onSuccess();
//     } catch (error) {
//       console.error(error);
//       setMessage("❌ Failed to add blog category.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {message && <p className="text-blue-600">{message}</p>}

//       <div>
//         <label className="block font-semibold">Category Name</label>
//         <input
//           type="text"
//           value={blogCategoryName}
//           onChange={(e) => setBlogCategoryName(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-semibold">Description</label>
//         <textarea
//           value={blogCategoryDescription}
//           onChange={(e) => setBlogCategoryDescription(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-semibold">Created By</label>
//         <input
//           type="text"
//           value={blogCategoryCreatedBy}
//           onChange={(e) => setBlogCategoryCreatedBy(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-semibold">Upload Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="w-full"
//         />
//       </div>

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };








// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dialog } from "@headlessui/react";
// import { Button } from "@/components/ui/button"; // Ensure this path is correct
// import { BASE_URL } from "@/config/config"; // Ensure this path is correct

// interface BlogCategory {
//   blogCategoryId: number;
//   blogCategoryName: string;
//   blogCategoryDescription: string;
//   blogCategoryImageUrl: string;
//   blogCategoryCreatedBy: string;
//   blogCategoryCreatedDate: string;
//   blogs: null | any; // Added to match response body
// }

// const ViewBlogCategory: React.FC = () => {
//   const [categories, setCategories] = useState<BlogCategory[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = () => {
//     setError(null);
//     axios
//       .get(`http://localhost:4545/api/blog-categories/getAll/categories`)
//       .then((res) => {
//         console.log("API Response:", res.data);
//         if (Array.isArray(res.data)) {
//           setCategories(res.data);
//         } else {
//           console.error("Unexpected data format:", res.data);
//           setError("Unexpected data format from server.");
//         }
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err.message, err.response?.data);
//         setError("Failed to fetch categories. Please check the server or network.");
//       });
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Blog Categories</h1>
//         <Button onClick={() => setIsOpen(true)}>Add Blog Category</Button>
//       </div>

//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       {categories.length === 0 && !error && (
//         <p className="text-gray-600">No categories found.</p>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {categories.map((category) => (
//           <div
//             key={category.blogCategoryId}
//             className="border p-4 rounded-lg shadow-sm"
//           >
//             <img
//               src={category.blogCategoryImageUrl}
//               alt={category.blogCategoryName}
//               className="h-40 w-full object-cover rounded"
//               onError={(e) => {
//                 console.error(`Failed to load image: ${category.blogCategoryImageUrl}`);
//                 e.currentTarget.src = "/fallback-image.png"; // Optional: Add a fallback image
//               }}
//             />
//             <h2 className="text-lg font-semibold mt-2">
//               {category.blogCategoryName.trim()} {/* Trim to remove unwanted newlines */}
//             </h2>
//             <p className="text-sm">{category.blogCategoryDescription}</p>
//             <p className="text-xs text-gray-500 mt-1">
//               Created by: {category.blogCategoryCreatedBy}
//             </p>
//             <p className="text-xs text-gray-400">
//               Date: {category.blogCategoryCreatedDate}
//             </p>
//           </div>
//         ))}
//       </div>

//       <Dialog
//         open={isOpen}
//         onClose={() => setIsOpen(false)}
//         className="fixed z-10 inset-0 overflow-y-auto"
//       >
//         <div className="flex items-center justify-center min-h-screen px-4">
//           <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
//             <Dialog.Title className="text-xl font-bold mb-4">
//               Add Blog Category
//             </Dialog.Title>
//             <AddBlogCategory
//               onSuccess={() => {
//                 setIsOpen(false);
//                 fetchCategories();
//               }}
//             />
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default ViewBlogCategory;

// // AddBlogCategory.tsx (or inline in ViewBlogCategory.tsx)
// interface AddProps {
//   onSuccess: () => void;
// }

// const AddBlogCategory: React.FC<AddProps> = ({ onSuccess }) => {
//   const [blogCategoryName, setBlogCategoryName] = useState("");
//   const [blogCategoryDescription, setBlogCategoryDescription] = useState("");
//   const [blogCategoryCreatedBy, setBlogCategoryCreatedBy] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("blogCategoryName", blogCategoryName);
//     formData.append("blogCategoryDescription", blogCategoryDescription);
//     formData.append("blogCategoryCreatedBy", blogCategoryCreatedBy);
//     formData.append(
//       "blogCategoryCreatedDate",
//       new Date().toISOString().split("T")[0]
//     );
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/blog-categories`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Add Category Response:", response.data);
//       setMessage("✅ Blog category added successfully!");
//       setBlogCategoryName("");
//       setBlogCategoryDescription("");
//       setBlogCategoryCreatedBy("");
//       setImage(null);
//       setTimeout(() => {
//         setMessage("");
//         onSuccess();
//       }, 2000);
//     } catch (error: any) {
//       console.error("Add category error:", error.message, error.response?.data);
//       setMessage("❌ Failed to add blog category.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {message && <p className="text-blue-600 font-semibold">{message}</p>}

//       <div>
//         <label className="block font-semibold">Category Name</label>
//         <input
//           type="text"
//           value={blogCategoryName}
//           onChange={(e) => setBlogCategoryName(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-semibold">Description</label>
//         <textarea
//           value={blogCategoryDescription}
//           onChange={(e) => setBlogCategoryDescription(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-semibold">Created By</label>
//         <input
//           type="text"
//           value={blogCategoryCreatedBy}
//           onChange={(e) => setBlogCategoryCreatedBy(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-semibold">Upload Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="w-full"
//         />
//       </div>

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dialog } from "@headlessui/react";
// import { Button } from "@/components/ui/button"; // Ensure this path is correct
// import { BASE_URL } from "@/config/config"; // Ensure this path is correct

// interface BlogCategory {
//   blogCategoryId: number;
//   blogCategoryName: string;
//   blogCategoryDescription: string;
//   blogCategoryImageUrl: string;
//   blogCategoryCreatedBy: string;
//   blogCategoryCreatedDate: string;
//   blogs: null | any;
// }

// const ViewBlogCategory: React.FC = () => {
//   const [categories, setCategories] = useState<BlogCategory[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = () => {
//     setError(null);
//     axios
//       .get(`${BASE_URL}/api/blog-categories/getAll/categories`)
//       .then((res) => {
//         console.log("API Response:", res.data);
//         if (Array.isArray(res.data)) {
//           setCategories(res.data);
//         } else {
//           console.error("Unexpected data format:", res.data);
//           setError("Unexpected data format from server.");
//         }
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err.message, err.response?.data);
//         setError("Failed to fetch categories. Please check the server or network.");
//       });
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-blue-900">Blog Categories</h1>
//           <Button
//             className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//             onClick={() => setIsOpen(true)}
//           >
//             Add Blog Category
//           </Button>
//         </div>

//         {error && (
//           <p className="text-red-500 bg-red-50 p-4 rounded-lg mb-6">{error}</p>
//         )}

//         {categories.length === 0 && !error && (
//           <p className="text-gray-500 text-center italic">No categories found.</p>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {categories.map((category) => (
//             <div
//               key={category.blogCategoryId}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
//             >
//               <img
//                 src={category.blogCategoryImageUrl}
//                 alt={category.blogCategoryName}
//                 className="h-36 w-full object-cover"
//                 onError={(e) => {
//                   console.error(`Failed to load image: ${category.blogCategoryImageUrl}`);
//                   e.currentTarget.src = "/fallback-image.png";
//                 }}
//               />
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-blue-900">
//                   {category.blogCategoryName.trim()}
//                 </h2>
//                 <p className="text-sm text-gray-600 mt-1 line-clamp-3">
//                   {category.blogCategoryDescription}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Created by: {category.blogCategoryCreatedBy}
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   Date: {new Date(category.blogCategoryCreatedDate).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <Dialog
//           open={isOpen}
//           onClose={() => setIsOpen(false)}
//           className="fixed z-50 inset-0 overflow-y-auto"
//         >
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
//               <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
//                 Add Blog Category
//               </Dialog.Title>
//               <AddBlogCategory
//                 onSuccess={() => {
//                   setIsOpen(false);
//                   fetchCategories();
//                 }}
//               />
//             </Dialog.Panel>
//           </div>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// interface AddProps {
//   onSuccess: () => void;
// }

// const AddBlogCategory: React.FC<AddProps> = ({ onSuccess }) => {
//   const [blogCategoryName, setBlogCategoryName] = useState("");
//   const [blogCategoryDescription, setBlogCategoryDescription] = useState("");
//   const [blogCategoryCreatedBy, setBlogCategoryCreatedBy] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormFormData();
//     formData.append("blogCategoryName", blogCategoryName);
//     formData.append("blogCategoryDescription", blogCategoryDescription);
//     formData.append("blogCategoryCreatedBy", blogCategoryCreatedBy);
//     formData.append(
//       "blogCategoryCreatedDate",
//       new Date().toISOString().split("T")[0]
//     );
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/blog-categories`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Add Category Response:", response.data);
//       setMessage("✅ Blog category added successfully!");
//       setBlogCategoryName("");
//       setBlogCategoryDescription("");
//       setBlogCategoryCreatedBy("");
//       setImage(null);
//       setTimeout(() => {
//         setMessage("");
//         onSuccess();
//       }, 2000);
//     } catch (error: any) {
//       console.error("Add category error:", error.message, error.response?.data);
//       setMessage("❌ Failed to add blog category.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {message && (
//         <p
//           className={`text-sm font-semibold ${
//             message.includes("successfully") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Category Name
//         </label>
//         <input
//           type="text"
//           value={blogCategoryName}
//           onChange={(e) => setBlogCategoryName(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           value={blogCategoryDescription}
//           onChange={(e) => setBlogCategoryDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={4}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Created By
//         </label>
//         <input
//           type="text"
//           value={blogCategoryCreatedBy}
//           onChange={(e) => setBlogCategoryCreatedBy(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Upload Image
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="mt-1 w-full text-gray-600"
//         />
//       </div>

//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={() => setIsOpen(false)}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//         >
//           Cancel
//         </button>
//         <Button
//           type="submit"
//           className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//         >
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ViewBlogCategory;








// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dialog } from "@headlessui/react";
// import { Button } from "@/components/ui/button";
// import { BASE_URL } from "@/config/config";

// interface BlogCategory {
//   blogCategoryId: number;
//   blogCategoryName: string;
//   blogCategoryDescription: string;
//   blogCategoryImageUrl: string;
//   blogCategoryCreatedBy: string;
//   blogCategoryCreatedDate: string;
//   blogs: null | any;
// }

// interface Blog {
//   blogTitle: string;
//   blogContent: string;
//   blogCreatedBy: string;
//   blogCategoryId: number;
// }

// const ViewBlogCategory: React.FC = () => {
//   const [categories, setCategories] = useState<BlogCategory[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isBlogOpen, setIsBlogOpen] = useState(false);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = () => {
//     setError(null);
//     axios
//       .get(`${BASE_URL}/api/blog-categories/getAll/categories`)
//       .then((res) => {
//         console.log("API Response:", res.data);
//         if (Array.isArray(res.data)) {
//           setCategories(res.data);
//         } else {
//           console.error("Unexpected data format:", res.data);
//           setError("Unexpected data format from server.");
//         }
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err.message, err.response?.data);
//         setError("Failed to fetch categories. Please check the server or network.");
//       });
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-blue-900">Blog Categories</h1>
//           <Button
//             className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//             onClick={() => setIsOpen(true)}
//           >
//             Add Blog Category
//           </Button>
//         </div>

//         {error && (
//           <p className="text-red-500 bg-red-50 p-4 rounded-lg mb-6">{error}</p>
//         )}

//         {categories.length === 0 && !error && (
//           <p className="text-gray-500 text-center italic">No categories found.</p>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {categories.map((category) => (
//             <div
//               key={category.blogCategoryId}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
//             >
//               <img
//                 src={category.blogCategoryImageUrl}
//                 alt={category.blogCategoryName}
//                 className="h-36 w-full object-cover"
//                 onError={(e) => {
//                   console.error(`Failed to load image: ${category.blogCategoryImageUrl}`);
//                   e.currentTarget.src = "/fallback-image.png";
//                 }}
//               />
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-blue-900">
//                   {category.blogCategoryName.trim()}
//                 </h2>
//                 <p className="text-sm text-gray-600 mt-1 line-clamp-3">
//                   {category.blogCategoryDescription}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Created by: {category.blogCategoryCreatedBy}
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   Date: {new Date(category.blogCategoryCreatedDate).toLocaleDateString()}
//                 </p>
//                 <Button
//                   className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
//                   onClick={() => {
//                     setSelectedCategoryId(category.blogCategoryId);
//                     setIsBlogOpen(true);
//                   }}
//                 >
//                   Add Blog
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <Dialog
//           open={isOpen}
//           onClose={() => setIsOpen(false)}
//           className="fixed z-50 inset-0 overflow-y-auto"
//         >
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
//               <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
//                 Add Blog Category
//               </Dialog.Title>
//               <AddBlogCategory
//                 onSuccess={() => {
//                   setIsOpen(false);
//                   fetchCategories();
//                 }}
//               />
//             </Dialog.Panel>
//           </div>
//         </Dialog>

//         <Dialog
//           open={isBlogOpen}
//           onClose={() => setIsBlogOpen(false)}
//           className="fixed z-50 inset-0 overflow-y-auto"
//         >
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
//               <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
//                 Add Blog
//               </Dialog.Title>
//               <AddBlog
//                 categoryId={selectedCategoryId!}
//                 onSuccess={() => {
//                   setIsBlogOpen(false);
//                   fetchCategories();
//                 }}
//               />
//             </Dialog.Panel>
//           </div>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// interface AddProps {
//   onSuccess: () => void;
// }

// const AddBlogCategory: React.FC<AddProps> = ({ onSuccess }) => {
//   const [blogCategoryName, setBlogCategoryName] = useState("");
//   const [blogCategoryDescription, setBlogCategoryDescription] = useState("");
//   const [blogCategoryCreatedBy, setBlogCategoryCreatedBy] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("blogCategoryName", blogCategoryName);
//     formData.append("blogCategoryDescription", blogCategoryDescription);
//     formData.append("blogCategoryCreatedBy", blogCategoryCreatedBy);
//     formData.append(
//       "blogCategoryCreatedDate",
//       new Date().toISOString().split("T")[0]
//     );
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/blog-categories`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Add Category Response:", response.data);
//       setMessage("✅ Blog category added successfully!");
//       setBlogCategoryName("");
//       setBlogCategoryDescription("");
//       setBlogCategoryCreatedBy("");
//       setImage(null);
//       setTimeout(() => {
//         setMessage("");
//         onSuccess();
//       }, 2000);
//     } catch (error: any) {
//       console.error("Add category error:", error.message, error.response?.data);
//       setMessage("❌ Failed to add blog category.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {message && (
//         <p
//           className={`text-sm font-semibold ${
//             message.includes("successfully") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Category Name
//         </label>
//         <input
//           type="text"
//           value={blogCategoryName}
//           onChange={(e) => setBlogCategoryName(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           value={blogCategoryDescription}
//           onChange={(e) => setBlogCategoryDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={4}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Created By
//         </label>
//         <input
//           type="text"
//           value={blogCategoryCreatedBy}
//           onChange={(e) => setBlogCategoryCreatedBy(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Upload Image
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="mt-1 w-full text-gray-600"
//         />
//       </div>

//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={() => setIsOpen(false)}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//         >
//           Cancel
//         </button>
//         <Button
//           type="submit"
//           className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//         >
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };

// interface AddBlogProps {
//   categoryId: number;
//   onSuccess: () => void;
// }

// const AddBlog: React.FC<AddBlogProps> = ({ categoryId, onSuccess }) => {
//   const [blogTitle, setBlogTitle] = useState("");
//   const [blogContent, setBlogContent] = useState("");
//   const [blogCreatedBy, setBlogCreatedBy] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const blogData = {
//       blogTitle,
//       blogContent,
//       blogCreatedBy,
//       blogCategoryId: categoryId,
//       blogCreatedDate: new Date().toISOString().split("T")[0],
//     };

//     try {
//       const response = await axios.post(`${BASE_URL}/api/blogs`, blogData, {
//         headers: { "Content-Type": "application/json" },
//       });
//       console.log("Add Blog Response:", response.data);
//       setMessage("✅ Blog added successfully!");
//       setBlogTitle("");
//       setBlogContent("");
//       setBlogCreatedBy("");
//       setTimeout(() => {
//         setMessage("");
//         onSuccess();
//       }, 2000);
//     } catch (error: any) {
//       console.error("Add blog error:", error.message, error.response?.data);
//       setMessage("❌ Failed to add blog.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {message && (
//         <p
//           className={`text-sm font-semibold ${
//             message.includes("successfully") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Category ID
//         </label>
//         <input
//           type="text"
//           value={categoryId}
//           disabled
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Blog Title
//         </label>
//         <input
//           type="text"
//           value={blogTitle}
//           onChange={(e) => setBlogTitle(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Blog Content
//         </label>
//         <textarea
//           value={blogContent}
//           onChange={(e) => setBlogContent(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={6}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Created By
//         </label>
//         <input
//           type="text"
//           value={blogCreatedBy}
//           onChange={(e) => setBlogCreatedBy(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={() => setIsBlogOpen(false)}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//         >
//           Cancel
//         </button>
//         <Button
//           type="submit"
//           className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//         >
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ViewBlogCategory;


















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dialog } from "@headlessui/react";
// import { Button } from "@/components/ui/button";
// import { BASE_URL } from "@/config/config";

// interface BlogCategory {
//   blogCategoryId: number;
//   blogCategoryName: string;
//   blogCategoryDescription: string;
//   blogCategoryImageUrl: string;
//   blogCategoryCreatedBy: string;
//   blogCategoryCreatedDate: string;
//   blogs: null | any;
// }

// interface Blog {
//   blogUrl: string;
//   metaTitle: string;
//   metaDescription: string;
//   title: string;
//   slug: string;
//   slugDescription: string;
//   shortDescription: string;
//   content: string;
//   blogCreatedBy: string;
//   blogCategoryId: number;
// }

// const ViewBlogCategory: React.FC = () => {
//   const [categories, setCategories] = useState<BlogCategory[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isBlogOpen, setIsBlogOpen] = useState(false);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = () => {
//     setError(null);
//     axios
//       .get(`${BASE_URL}/api/blog-categories/getAll/categories`)
//       .then((res) => {
//         console.log("API Response:", res.data);
//         if (Array.isArray(res.data)) {
//           setCategories(res.data);
//         } else {
//           console.error("Unexpected data format:", res.data);
//           setError("Unexpected data format from server.");
//         }
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err.message, err.response?.data);
//         setError("Failed to fetch categories. Please check the server or network.");
//       });
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-blue-900">Blog Categories</h1>
//           <Button
//             className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//             onClick={() => setIsOpen(true)}
//           >
//             Add Blog Category
//           </Button>
//         </div>

//         {error && (
//           <p className="text-red-500 bg-red-50 p-4 rounded-lg mb-6">{error}</p>
//         )}

//         {categories.length === 0 && !error && (
//           <p className="text-gray-500 text-center italic">No categories found.</p>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {categories.map((category) => (
//             <div
//               key={category.blogCategoryId}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
//             >
//               <img
//                 src={category.blogCategoryImageUrl}
//                 alt={category.blogCategoryName}
//                 className="h-36 w-full object-cover"
//                 onError={(e) => {
//                   console.error(`Failed to load image: ${category.blogCategoryImageUrl}`);
//                   e.currentTarget.src = "/fallback-image.png";
//                 }}
//               />
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-blue-900">
//                   {category.blogCategoryName.trim()}
//                 </h2>
//                 <p className="text-sm text-gray-600 mt-1 line-clamp-3">
//                   {category.blogCategoryDescription}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Created by: {category.blogCategoryCreatedBy}
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   Date: {new Date(category.blogCategoryCreatedDate).toLocaleDateString()}
//                 </p>
//                 <Button
//                   className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
//                   onClick={() => {
//                     setSelectedCategoryId(category.blogCategoryId);
//                     setIsBlogOpen(true);
//                   }}
//                 >
//                   Add Blog
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <Dialog
//           open={isOpen}
//           onClose={() => setIsOpen(false)}
//           className="fixed z-50 inset-0 overflow-y-auto"
//         >
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
//               <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
//                 Add Blog Category
//               </Dialog.Title>
//               <AddBlogCategory
//                 onSuccess={() => {
//                   setIsOpen(false);
//                   fetchCategories();
//                 }}
//               />
//             </Dialog.Panel>
//           </div>
//         </Dialog>

//         <Dialog
//           open={isBlogOpen}
//           onClose={() => setIsBlogOpen(false)}
//           className="fixed z-50 inset-0 overflow-y-auto"
//         >
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
//               <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
//                 Add Blog
//               </Dialog.Title>
//               <AddBlog
//                 categoryId={selectedCategoryId!}
//                 onSuccess={() => {
//                   setIsBlogOpen(false);
//                   fetchCategories();
//                 }}
//               />
//             </Dialog.Panel>
//           </div>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// interface AddProps {
//   onSuccess: () => void;
// }

// const AddBlogCategory: React.FC<AddProps> = ({ onSuccess }) => {
//   const [blogCategoryName, setBlogCategoryName] = useState("");
//   const [blogCategoryDescription, setBlogCategoryDescription] = useState("");
//   const [blogCategoryCreatedBy, setBlogCategoryCreatedBy] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("blogCategoryName", blogCategoryName);
//     formData.append("blogCategoryDescription", blogCategoryDescription);
//     formData.append("blogCategoryCreatedBy", blogCategoryCreatedBy);
//     formData.append(
//       "blogCategoryCreatedDate",
//       new Date().toISOString().split("T")[0]
//     );
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/blog-categories`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Add Category Response:", response.data);
//       setMessage("✅ Blog category added successfully!");
//       setBlogCategoryName("");
//       setBlogCategoryDescription("");
//       setBlogCategoryCreatedBy("");
//       setImage(null);
//       setTimeout(() => {
//         setMessage("");
//         onSuccess();
//       }, 2000);
//     } catch (error: any) {
//       console.error("Add category error:", error.message, error.response?.data);
//       setMessage("❌ Failed to add blog category.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {message && (
//         <p
//           className={`text-sm font-semibold ${
//             message.includes("successfully") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Category Name
//         </label>
//         <input
//           type="text"
//           value={blogCategoryName}
//           onChange={(e) => setBlogCategoryName(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           value={blogCategoryDescription}
//           onChange={(e) => setBlogCategoryDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={4}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Created By
//         </label>
//         <input
//           type="text"
//           value={blogCategoryCreatedBy}
//           onChange={(e) => setBlogCategoryCreatedBy(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Upload Image
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="mt-1 w-full text-gray-600"
//         />
//       </div>

//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={() => setIsOpen(false)}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//         >
//           Cancel
//         </button>
//         <Button
//           type="submit"
//           className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//         >
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };

// interface AddBlogProps {
//   categoryId: number;
//   onSuccess: () => void;
// }

// const AddBlog: React.FC<AddBlogProps> = ({ categoryId, onSuccess }) => {
//   const [blogUrl, setBlogUrl] = useState("");
//   const [metaTitle, setMetaTitle] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");
//   const [slugDescription, setSlugDescription] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [content, setContent] = useState("");
//   const [blogCreatedBy, setBlogCreatedBy] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("blogUrl", blogUrl);
//     formData.append("metaTitle", metaTitle);
//     formData.append("metaDescription", metaDescription);
//     formData.append("title", title);
//     formData.append("slug", slug);
//     formData.append("slugDescription", slugDescription);
//     formData.append("shortDescription", shortDescription);
//     formData.append("content", content);
//     formData.append("blogCreatedBy", blogCreatedBy);
//     formData.append("blogCategoryId", categoryId.toString());
//     formData.append("blogCreatedDate", new Date().toISOString().split("T")[0]);
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/blogs/create`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Add Blog Response:", response.data);
//       setMessage("✅ Blog added successfully!");
//       setBlogUrl("");
//       setMetaTitle("");
//       setMetaDescription("");
//       setTitle("");
//       setSlug("");
//       setSlugDescription("");
//       setShortDescription("");
//       setContent("");
//       setBlogCreatedBy("");
//       setImage(null);
//       setTimeout(() => {
//         setMessage("");
//         onSuccess();
//       }, 2000);
//     } catch (error: any) {
//       console.error("Add blog error:", error.message, error.response?.data);
//       setMessage("❌ Failed to add blog.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {message && (
//         <p
//           className={`text-sm font-semibold ${
//             message.includes("successfully") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Blog URL
//         </label>
//         <input
//           type="text"
//           value={blogUrl}
//           onChange={(e) => setBlogUrl(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Meta Title
//         </label>
//         <input
//           type="text"
//           value={metaTitle}
//           onChange={(e) => setMetaTitle(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Meta Description
//         </label>
//         <textarea
//           value={metaDescription}
//           onChange={(e) => setMetaDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={3}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Title
//         </label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Slug
//         </label>
//         <input
//           type="text"
//           value={slug}
//           onChange={(e) => setSlug(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Slug Description
//         </label>
//         <textarea
//           value={slugDescription}
//           onChange={(e) => setSlugDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={3}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Short Description
//         </label>
//         <textarea
//           value={shortDescription}
//           onChange={(e) => setShortDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={3}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Content
//         </label>
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={6}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Created By
//         </label>
//         <input
//           type="text"
//           value={blogCreatedBy}
//           onChange={(e) => setBlogCreatedBy(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Category ID
//         </label>
//         <input
//           type="text"
//           value={categoryId}
//           disabled
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Upload Image
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="mt-1 w-full text-gray-600"
//         />
//       </div>

//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={() => setIsBlogOpen(false)}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//         >
//           Cancel
//         </button>
//         <Button
//           type="submit"
//           className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//         >
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ViewBlogCategory;











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dialog } from "@headlessui/react";
// import { Button } from "@/components/ui/button";
// import { BASE_URL } from "@/config/config";

// interface BlogCategory {
//   blogCategoryId: number;
//   blogCategoryName: string;
//   blogCategoryDescription: string;
//   blogCategoryImageUrl: string;
//   blogCategoryCreatedBy: string;
//   blogCategoryCreatedDate: string;
//   blogs: null | any;
// }

// interface Blog {
//   blogUrl: string;
//   metaTitle: string;
//   metaDescription: string;
//   title: string;
//   slug: string;
//   slugDescription: string;
//   shortDescription: string;
//   content: string;
//   blogCreatedBy: string;
//   blogCategoryId: number;
// }

// const ViewBlogCategory: React.FC = () => {
//   const [categories, setCategories] = useState<BlogCategory[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isBlogOpen, setIsBlogOpen] = useState(false);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = () => {
//     setError(null);
//     axios
//       .get(`${BASE_URL}/api/blog-categories/getAll/categories`)
//       .then((res) => {
//         console.log("API Response:", res.data);
//         if (Array.isArray(res.data)) {
//           setCategories(res.data);
//         } else {
//           console.error("Unexpected data format:", res.data);
//           setError("Unexpected data format from server.");
//         }
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err.message, err.response?.data);
//         setError("Failed to fetch categories. Please check the server or network.");
//       });
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-blue-900">Blog Categories</h1>
//           <Button
//             className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//             onClick={() => setIsOpen(true)}
//           >
//             Add Blog Category
//           </Button>
//         </div>

//         {error && (
//           <p className="text-red-500 bg-red-50 p-4 rounded-lg mb-6">{error}</p>
//         )}

//         {categories.length === 0 && !error && (
//           <p className="text-gray-500 text-center italic">No categories found.</p>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {categories.map((category) => (
//             <div
//               key={category.blogCategoryId}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
//             >
//               <img
//                 src={category.blogCategoryImageUrl}
//                 alt={category.blogCategoryName}
//                 className="h-36 w-full object-cover"
//                 onError={(e) => {
//                   console.error(`Failed to load image: ${category.blogCategoryImageUrl}`);
//                   e.currentTarget.src = "/fallback-image.png";
//                 }}
//               />
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-blue-900">
//                   {category.blogCategoryName.trim()}
//                 </h2>
//                 <p className="text-sm text-gray-600 mt-1 line-clamp-3">
//                   {category.blogCategoryDescription}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Created by: {category.blogCategoryCreatedBy}
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   Date: {new Date(category.blogCategoryCreatedDate).toLocaleDateString()}
//                 </p>
//                 <Button
//                   className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
//                   onClick={() => {
//                     setSelectedCategoryId(category.blogCategoryId);
//                     setIsBlogOpen(true);
//                   }}
//                 >
//                   Add Blog
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <Dialog
//           open={isOpen}
//           onClose={() => setIsOpen(false)}
//           className="fixed z-50 inset-0 overflow-y-auto"
//         >
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
//               <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
//                 Add Blog Category
//               </Dialog.Title>
//               <AddBlogCategory
//                 onSuccess={() => {
//                   setIsOpen(false);
//                   fetchCategories();
//                 }}
//               />
//             </Dialog.Panel>
//           </div>
//         </Dialog>

//         <Dialog
//           open={isBlogOpen}
//           onClose={() => setIsBlogOpen(false)}
//           className="fixed z-50 inset-0 overflow-y-auto"
//         >
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
//               <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
//                 Add Blog
//               </Dialog.Title>
//               <AddBlog
//                 categoryId={selectedCategoryId!}
//                 onSuccess={() => {
//                   setIsBlogOpen(false);
//                   fetchCategories();
//                 }}
//               />
//             </Dialog.Panel>
//           </div>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// interface AddProps {
//   onSuccess: () => void;
// }

// const AddBlogCategory: React.FC<AddProps> = ({ onSuccess }) => {
//   const [blogCategoryName, setBlogCategoryName] = useState("");
//   const [blogCategoryDescription, setBlogCategoryDescription] = useState("");
//   const [blogCategoryCreatedBy, setBlogCategoryCreatedBy] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("blogCategoryName", blogCategoryName);
//     formData.append("blogCategoryDescription", blogCategoryDescription);
//     formData.append("blogCategoryCreatedBy", blogCategoryCreatedBy);
//     formData.append(
//       "blogCategoryCreatedDate",
//       new Date().toISOString().split("T")[0]
//     );
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/blog-categories`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Add Category Response:", response.data);
//       setMessage("✅ Blog category added successfully!");
//       setBlogCategoryName("");
//       setBlogCategoryDescription("");
//       setBlogCategoryCreatedBy("");
//       setImage(null);
//       setTimeout(() => {
//         setMessage("");
//         onSuccess();
//       }, 2000);
//     } catch (error: any) {
//       console.error("Add category error:", error.message, error.response?.data);
//       setMessage("❌ Failed to add blog category.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {message && (
//         <p
//           className={`text-sm font-semibold ${
//             message.includes("successfully") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Category Name
//         </label>
//         <input
//           type="text"
//           value={blogCategoryName}
//           onChange={(e) => setBlogCategoryName(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           value={blogCategoryDescription}
//           onChange={(e) => setBlogCategoryDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={4}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Created By
//         </label>
//         <input
//           type="text"
//           value={blogCategoryCreatedBy}
//           onChange={(e) => setBlogCategoryCreatedBy(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Upload Image
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="mt-1 w-full text-gray-600"
//         />
//       </div>

//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={() => setIsOpen(false)}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//         >
//           Cancel
//         </button>
//         <Button
//           type="submit"
//           className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//         >
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };

// interface AddBlogProps {
//   categoryId: number;
//   onSuccess: () => void;
// }

// const AddBlog: React.FC<AddBlogProps> = ({ categoryId, onSuccess }) => {
//   const [blogUrl, setBlogUrl] = useState("");
//   const [metaTitle, setMetaTitle] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");
//   const [slugDescription, setSlugDescription] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [content, setContent] = useState("");
//   const [blogCreatedBy, setBlogCreatedBy] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("blogUrl", blogUrl);
//     formData.append("metaTitle", metaTitle);
//     formData.append("metaDescription", metaDescription);
//     formData.append("title", title);
//     formData.append("slug", slug);
//     formData.append("slugDescription", slugDescription);
//     formData.append("shortDescription", shortDescription);
//     formData.append("content", content);
//     formData.append("blogCreatedBy", blogCreatedBy);
//     formData.append("blogCategoryId", categoryId.toString());
//     formData.append("blogCreatedDate", new Date().toISOString().split("T")[0]);
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/blogs/create`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Add Blog Response:", response.data);
//       setMessage("✅ Blog added successfully!");
//       setBlogUrl("");
//       setMetaTitle("");
//       setMetaDescription("");
//       setTitle("");
//       setSlug("");
//       setSlugDescription("");
//       setShortDescription("");
//       setContent("");
//       setBlogCreatedBy("");
//       setImage(null);
//       setTimeout(() => {
//         setMessage("");
//         onSuccess();
//       }, 2000);
//     } catch (error: any) {
//       console.error("Add blog error:", error.message, error.response?.data);
//       setMessage("❌ Failed to add blog.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {message && (
//         <p
//           className={`text-sm font-semibold ${
//             message.includes("successfully") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Blog URL
//         </label>
//         <input
//           type="text"
//           value={blogUrl}
//           onChange={(e) => setBlogUrl(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Meta Title
//         </label>
//         <input
//           type="text"
//           value={metaTitle}
//           onChange={(e) => setMetaTitle(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Meta Description
//         </label>
//         <textarea
//           value={metaDescription}
//           onChange={(e) => setMetaDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={3}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Title
//         </label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Slug
//         </label>
//         <input
//           type="text"
//           value={slug}
//           onChange={(e) => setSlug(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Slug Description
//         </label>
//         <textarea
//           value={slugDescription}
//           onChange={(e) => setSlugDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={3}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Short Description
//         </label>
//         <textarea
//           value={shortDescription}
//           onChange={(e) => setShortDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={3}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Content
//         </label>
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={6}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Created By
//         </label>
//         <input
//           type="text"
//           value={blogCreatedBy}
//           onChange={(e) => setBlogCreatedBy(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Upload Image
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="mt-1 w-full text-gray-600"
//         />
//       </div>

//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={() => setIsBlogOpen(false)}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//         >
//           Cancel
//         </button>
//         <Button
//           type="submit"
//           className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//         >
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ViewBlogCategory;













// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dialog } from "@headlessui/react";
// import { Button } from "@/components/ui/button";
// import { BASE_URL } from "@/config/config";

// interface BlogCategory {
//   blogCategoryId: number;
//   blogCategoryName: string;
//   blogCategoryDescription: string;
//   blogCategoryImageUrl: string;
//   blogCategoryCreatedBy: string;
//   blogCategoryCreatedDate: string;
//   blogs: null | any;
// }

// interface Blog {
//   blogUrl: string;
//   metaTitle: string;
//   metaDescription: string;
//   title: string;
//   slug: string;
//   slugDescription: string;
//   shortDescription: string;
//   content: string;
//   blogCreatedBy: string;
//   blogCategoryId: number;
// }

// const ViewBlogCategory: React.FC = () => {
//   const [categories, setCategories] = useState<BlogCategory[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isBlogOpen, setIsBlogOpen] = useState(false);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = () => {
//     setError(null);
//     axios
//       .get(`${BASE_URL}/api/blog-categories/getAll/categories`)
//       .then((res) => {
//         console.log("API Response:", res.data);
//         if (Array.isArray(res.data)) {
//           setCategories(res.data);
//         } else {
//           console.error("Unexpected data format:", res.data);
//           setError("Unexpected data format from server.");
//         }
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err.message, err.response?.data);
//         setError("Failed to fetch categories. Please check the server or network.");
//       });
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-blue-900">Blog Categories</h1>
//           <Button
//             className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//             onClick={() => setIsOpen(true)}
//           >
//             Add Blog Category
//           </Button>
//         </div>

//         {error && (
//           <p className="text-red-500 bg-red-50 p-4 rounded-lg mb-6">{error}</p>
//         )}

//         {categories.length === 0 && !error && (
//           <p className="text-gray-500 text-center italic">No categories found.</p>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {categories.map((category) => (
//             <div
//               key={category.blogCategoryId}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
//             >
//               <img
//                 src={category.blogCategoryImageUrl}
//                 alt={category.blogCategoryName}
//                 className="h-36 w-full object-cover"
//                 onError={(e) => {
//                   console.error(`Failed to load image: ${category.blogCategoryImageUrl}`);
//                   e.currentTarget.src = "/fallback-image.png";
//                 }}
//               />
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-blue-900">
//                   {category.blogCategoryName.trim()}
//                 </h2>
//                 <p className="text-sm text-gray-600 mt-1 line-clamp-3">
//                   {category.blogCategoryDescription}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Created by: {category.blogCategoryCreatedBy}
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   Date: {new Date(category.blogCategoryCreatedDate).toLocaleDateString()}
//                 </p>
//                 <Button
//                   className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
//                   onClick={() => {
//                     setSelectedCategoryId(category.blogCategoryId);
//                     setIsBlogOpen(true);
//                   }}
//                 >
//                   Add Blog
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <Dialog
//           open={isOpen}
//           onClose={() => setIsOpen(false)}
//           className="fixed z-50 inset-0 overflow-y-auto"
//         >
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
//               <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
//                 Add Blog Category
//               </Dialog.Title>
//               <AddBlogCategory
//                 onSuccess={() => {
//                   setIsOpen(false);
//                   fetchCategories();
//                 }}
//               />
//             </Dialog.Panel>
//           </div>
//         </Dialog>

//         <Dialog
//           open={isBlogOpen}
//           onClose={() => setIsBlogOpen(false)}
//           className="fixed z-50 inset-0 overflow-y-auto"
//         >
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//             <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
//               <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
//                 Add Blog
//               </Dialog.Title>
//               <AddBlog
//                 categoryId={selectedCategoryId!}
//                 onSuccess={() => {
//                   setIsBlogOpen(false);
//                   fetchCategories();
//                 }}
//               />
//             </Dialog.Panel>
//           </div>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// interface AddProps {
//   onSuccess: () => void;
// }

// const AddBlogCategory: React.FC<AddProps> = ({ onSuccess }) => {
//   const [blogCategoryName, setBlogCategoryName] = useState("");
//   const [blogCategoryDescription, setBlogCategoryDescription] = useState("");
//   const [blogCategoryCreatedBy, setBlogCategoryCreatedBy] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("blogCategoryName", blogCategoryName);
//     formData.append("blogCategoryDescription", blogCategoryDescription);
//     formData.append("blogCategoryCreatedBy", blogCategoryCreatedBy);
//     formData.append(
//       "blogCategoryCreatedDate",
//       new Date().toISOString().split("T")[0]
//     );
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/blog-categories`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Add Category Response:", response.data);
//       setMessage("✅ Blog category added successfully!");
//       setBlogCategoryName("");
//       setBlogCategoryDescription("");
//       setBlogCategoryCreatedBy("");
//       setImage(null);
//       setTimeout(() => {
//         setMessage("");
//         onSuccess();
//       }, 2000);
//     } catch (error: any) {
//       console.error("Add category error:", error.message, error.response?.data);
//       setMessage("❌ Failed to add blog category.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {message && (
//         <p
//           className={`text-sm font-semibold ${
//             message.includes("successfully") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Category Name
//         </label>
//         <input
//           type="text"
//           value={blogCategoryName}
//           onChange={(e) => setBlogCategoryName(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           value={blogCategoryDescription}
//           onChange={(e) => setBlogCategoryDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={4}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Created By
//         </label>
//         <input
//           type="text"
//           value={blogCategoryCreatedBy}
//           onChange={(e) => setBlogCategoryCreatedBy(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Upload Image
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="mt-1 w-full text-gray-600"
//         />
//       </div>

//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={() => setIsOpen(false)}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//         >
//           Cancel
//         </button>
//         <Button
//           type="submit"
//           className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//         >
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };

// interface AddBlogProps {
//   categoryId: number;
//   onSuccess: () => void;
// }

// const AddBlog: React.FC<AddBlogProps> = ({ categoryId, onSuccess }) => {
//   const [blogUrl, setBlogUrl] = useState("");
//   const [metaTitle, setMetaTitle] = useState("");
//   const [metaDescription, setMetaDescription] = useState("");
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");
//   const [slugDescription, setSlugDescription] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [content, setContent] = useState("");
//   const [blogCreatedBy, setBlogCreatedBy] = useState("");
//   const [authorEmail, setAuthorEmail] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("blogUrl", blogUrl);
//     formData.append("metaTitle", metaTitle);
//     formData.append("metaDescription", metaDescription);
//     formData.append("title", title);
//     formData.append("slug", slug);
//     formData.append("slugDescription", slugDescription);
//     formData.append("shortDescription", shortDescription);
//     formData.append("content", content);
//     formData.append("blogCreatedBy", blogCreatedBy);
//     formData.append("authorEmail", authorEmail);
//     formData.append("blogCategoryId", categoryId.toString());
//     formData.append("blogCreatedDate", new Date().toISOString().split("T")[0]);
//     if (image) formData.append("image", image);

//     try {
//       const response = await axios.post(`${BASE_URL}/api/blogs/create`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Add Blog Response:", response.data);
//       setMessage("✅ Blog added successfully!");
//       setBlogUrl("");
//       setMetaTitle("");
//       setMetaDescription("");
//       setTitle("");
//       setSlug("");
//       setSlugDescription("");
//       setShortDescription("");
//       setContent("");
//       setBlogCreatedBy("");
//       setAuthorEmail("");
//       setImage(null);
//       setTimeout(() => {
//         setMessage("");
//         onSuccess();
//       }, 2000);
//     } catch (error: any) {
//       console.error("Add blog error:", error.message, error.response?.data);
//       setMessage("❌ Failed to add blog.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {message && (
//         <p
//           className={`text-sm font-semibold ${
//             message.includes("successfully") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Blog URL
//         </label>
//         <input
//           type="text"
//           value={blogUrl}
//           onChange={(e) => setBlogUrl(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Meta Title
//         </label>
//         <input
//           type="text"
//           value={metaTitle}
//           onChange={(e) => setMetaTitle(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Meta Description
//         </label>
//         <textarea
//           value={metaDescription}
//           onChange={(e) => setMetaDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={3}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Title
//         </label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Slug
//         </label>
//         <input
//           type="text"
//           value={slug}
//           onChange={(e) => setSlug(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Slug Description
//         </label>
//         <textarea
//           value={slugDescription}
//           onChange={(e) => setSlugDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={3}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Short Description
//         </label>
//         <textarea
//           value={shortDescription}
//           onChange={(e) => setShortDescription(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={3}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Content
//         </label>
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           rows={6}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Created By
//         </label>
//         <input
//           type="text"
//           value={blogCreatedBy}
//           onChange={(e) => setBlogCreatedBy(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Author Email
//         </label>
//         <input
//           type="email"
//           value={authorEmail}
//           onChange={(e) => setAuthorEmail(e.target.value)}
//           className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Upload Image
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="mt-1 w-full text-gray-600"
//         />
//       </div>

//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={() => setIsBlogOpen(false)}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//         >
//           Cancel
//         </button>
//         <Button
//           type="submit"
//           className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
//         >
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ViewBlogCategory;













import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/config/config";

interface BlogCategory {
  blogCategoryId: number;
  blogCategoryName: string;
  blogCategoryDescription: string;
  blogCategoryImageUrl: string;
  blogCategoryCreatedBy: string;
  blogCategoryCreatedDate: string;
  blogs: null | any;
}

interface Blog {
  blogUrl: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  slug: string;
  slugDescription: string;
  shortDescription: string;
  content: string;
  blogCreatedBy: string;
  blogCategoryId: number;
}

const ViewBlogCategory: React.FC = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = () => {
    setError(null);
    axios
      .get(`${BASE_URL}/api/blog-categories/getAll/categories`)
      .then((res) => {
        console.log("API Response:", res.data);
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.error("Unexpected data format:", res.data);
          setError("Unexpected data format from server.");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err.message, err.response?.data);
        setError("Failed to fetch categories. Please check the server or network.");
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Blog Categories</h1>
          <Button
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
            onClick={() => setIsOpen(true)}
          >
            Add Blog Category
          </Button>
        </div>

        {error && (
          <p className="text-red-500 bg-red-50 p-4 rounded-lg mb-6">{error}</p>
        )}

        {categories.length === 0 && !error && (
          <p className="text-gray-500 text-center italic">No categories found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.blogCategoryId}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
            >
              <img
                src={category.blogCategoryImageUrl}
                alt={category.blogCategoryName}
                className="h-36 w-full object-cover"
                onError={(e) => {
                  console.error(`Failed to load image: ${category.blogCategoryImageUrl}`);
                  e.currentTarget.src = "/fallback-image.png";
                }}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-blue-900">
                  {category.blogCategoryName.trim()}
                </h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {category.blogCategoryDescription}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Created by: {category.blogCategoryCreatedBy}
                </p>
                <p className="text-xs text-gray-400">
                  Date: {new Date(category.blogCategoryCreatedDate).toLocaleDateString()}
                </p>
                <Button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                  onClick={() => {
                    setSelectedCategoryId(category.blogCategoryId);
                    setIsBlogOpen(true);
                  }}
                >
                  Add Blog
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed z-50 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
              <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
                Add Blog Category
              </Dialog.Title>
              <AddBlogCategory
                onSuccess={() => {
                  setIsOpen(false);
                  fetchCategories();
                }}
              />
            </Dialog.Panel>
          </div>
        </Dialog>

        <Dialog
          open={isBlogOpen}
          onClose={() => setIsBlogOpen(false)}
          className="fixed z-50 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <Dialog.Panel className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
              <Dialog.Title className="text-2xl font-bold text-blue-900 mb-6">
                Add Blog
              </Dialog.Title>
              <AddBlog
                categoryId={selectedCategoryId!}
                onSuccess={() => {
                  setIsBlogOpen(false);
                  fetchCategories();
                }}
              />
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

interface AddProps {
  onSuccess: () => void;
}

const AddBlogCategory: React.FC<AddProps> = ({ onSuccess }) => {
  const [blogCategoryName, setBlogCategoryName] = useState("");
  const [blogCategoryDescription, setBlogCategoryDescription] = useState("");
  const [blogCategoryCreatedBy, setBlogCategoryCreatedBy] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("blogCategoryName", blogCategoryName);
    formData.append("blogCategoryDescription", blogCategoryDescription);
    formData.append("blogCategoryCreatedBy", blogCategoryCreatedBy);
    formData.append(
      "blogCategoryCreatedDate",
      new Date().toISOString().split("T")[0]
    );
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(`${BASE_URL}/api/blog-categories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Add Category Response:", response.data);
      setMessage("✅ Blog category added successfully!");
      setBlogCategoryName("");
      setBlogCategoryDescription("");
      setBlogCategoryCreatedBy("");
      setImage(null);
      setTimeout(() => {
        setMessage("");
        onSuccess();
      }, 2000);
    } catch (error: any) {
      console.error("Add category error:", error.message, error.response?.data);
      setMessage("❌ Failed to add blog category.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <p
          className={`text-sm font-semibold ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category Name
        </label>
        <input
          type="text"
          value={blogCategoryName}
          onChange={(e) => setBlogCategoryName(e.target.value)}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={blogCategoryDescription}
          onChange={(e) => setBlogCategoryDescription(e.target.value)}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Created By
        </label>
        <input
          type="text"
          value={blogCategoryCreatedBy}
          onChange={(e) => setBlogCategoryCreatedBy(e.target.value)}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mt-1 w-full text-gray-600"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Cancel
        </button>
        <Button
          type="submit"
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

interface AddBlogProps {
  categoryId: number;
  onSuccess: () => void;
}

const AddBlog: React.FC<AddBlogProps> = ({ categoryId, onSuccess }) => {
  const [authorEmail, setAuthorEmail] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryIdState, setCategoryIdState] = useState(categoryId.toString());
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("authorEmail", authorEmail);
    formData.append("authorName", authorName);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("title", title);
    formData.append("shortDescription", shortDescription);
    formData.append("content", content);
    formData.append("categoryId", categoryIdState);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(`${BASE_URL}/api/blogs/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Add Blog Response:", response.data);
      setMessage("✅ Blog added successfully!");
      setAuthorEmail("");
      setAuthorName("");
      setMetaTitle("");
      setMetaDescription("");
      setTitle("");
      setShortDescription("");
      setContent("");
      setImage(null);
      setTimeout(() => {
        setMessage("");
        onSuccess();
      }, 2000);
    } catch (error: any) {
      console.error("Add blog error:", error.message, error.response?.data);
      setMessage("❌ Failed to add blog.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <p
          className={`text-sm font-semibold ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Author Email</label>
        <input
          type="email"
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Author Name</label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Meta Title</label>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Meta Description</label>
        <textarea
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Short Description</label>
        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          rows={6}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mt-1 w-full text-gray-600"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setIsBlogOpen(false)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Cancel
        </button>
        <Button
          type="submit"
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ViewBlogCategory;