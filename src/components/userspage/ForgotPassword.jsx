// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "@/config/config";

// export default function ForgotPassword() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     try {
//       const response = await fetch(`${BASE_URL}/user/forgot-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send reset link. Please check your email.");
//       }

//       setSuccess("A password reset link has been sent to your email.");
//       setEmail("");
//     } catch (err) {
//       setError(err.message || "Failed to process request");
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-white flex items-center justify-center relative">
//       <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-stretch bg-purple-700 rounded-2xl shadow-lg overflow-hidden">
//         {/* Image Section */}
//         <div className="w-full md:w-1/2 flex items-center justify-center relative m-0 p-0">
//           <img src="/login.png" alt="Doctor" className="max-w-full h-auto object-cover w-full" />
//         </div>

//         {/* Form Section */}
//         <div className="w-full md:w-1/2 p-8 text-white m-0">
//           <h2 className="text-3xl font-bold text-center mb-4">Reset Your Password</h2>
//           <p className="text-center mb-6">Enter your email to receive a password reset link</p>

//           {success && (
//             <div className="bg-blue-100 text-blue-800 p-3 rounded mb-4 text-sm flex items-center gap-2">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//               </svg>
//               {success}
//             </div>
//           )}

//           {error && (
//             <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm flex items-center gap-2">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {error}
//             </div>
//           )}

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Email Address</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
//                 placeholder="vk@gmail.com"
//                 required
//               />
//             </div>

//             <button
//               type="button"
//               onClick={handleForgotPassword}
//               className="w-full bg-white text-purple-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
//             >
//               Send Reset Link
//             </button>
//           </div>

//           <p className="text-center mt-4 text-sm">
//             Remember your password?{" "}
//             <a href="/login" className="text-blue-200 hover:text-white">
//               Login
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config/config";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await fetch(`${BASE_URL}/user/forgotpassword`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send reset link. Please check your email.");
      }

      setSuccess("A password reset link has been sent to your email.");
      setEmail("");
    } catch (err) {
      setError(err.message || "Failed to process request");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center relative">
      <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-stretch bg-purple-700 rounded-2xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative m-0 p-0">
          <img src="/login.png" alt="Doctor" className="max-w-full h-auto object-cover w-full" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 text-white m-0">
          <h2 className="text-3xl font-bold text-center mb-4">Reset Your Password</h2>
          <p className="text-center mb-6">Enter your email to receive a password reset link</p>

          {success && (
            <div className="bg-blue-100 text-blue-800 p-3 rounded mb-4 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="srikar@zynlogic.com"
                required
              />
            </div>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="w-full bg-white text-purple-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Send Reset Link
            </button>
          </div>

          <p className="text-center mt-4 text-sm">
            Remember your password?{" "}
            <a href="/login" className="text-blue-200 hover:text-white">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}