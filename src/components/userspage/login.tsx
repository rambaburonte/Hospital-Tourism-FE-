// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "@/config/config";

// export default function Login() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [verificationSuccess, setVerificationSuccess] = useState(false);
//   const [error, setError] = useState("");

//   // Show email verified success
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     if (params.get("verified") === "true") {
//       setVerificationSuccess(true);
//     }
//   }, [location.search]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Invalid credentials");
//       }

//       const userData = await response.json();

//       // ✅ Store user data in localStorage
//       localStorage.setItem("user", JSON.stringify(userData));

//       // Dispatch a custom storage event to notify other components (like Header) in the same tab
//       const storageEvent = new StorageEvent('storage', {
//         key: 'user',
//         newValue: JSON.stringify(userData),
//         oldValue: null, // You might want to get the actual oldValue if needed
//         url: window.location.href,
//         storageArea: localStorage,
//       });
//       window.dispatchEvent(storageEvent);

//       // Redirect to dashboard
//       // navigate("/dashboard");
//       navigate("/", { state: { scrollToHero: true }, replace: true });
//     } catch (err: any) {
//       setError(err.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-semibold text-center mb-6 text-[#3a7e10]">
//           Patient Portal Login
//         </h2>

//         {verificationSuccess && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//             ✅ Your email has been verified. Please login.
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499E14]"
//               placeholder="you@example.com"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499E14]"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#499E14] text-white py-2 rounded-xl hover:bg-[#3a7e10] transition"
//           >
//             Login
//           </button>
//         </form>

//         <div className="text-center mt-4 space-y-2">
//           <a href="/forgot-password" className="text-sm text-[#499E14] hover:underline">
//             Forgot password?
//           </a>
//           <div className="mt-2">
//             <span className="text-sm text-gray-600">Don't have an account?</span>
//             <button
//               onClick={() => navigate("/register")}
//               className="ml-2 text-sm text-green-600 hover:underline"
//             >
//               Sign up
//             </button>
//           </div>
//           <button
//             onClick={() => navigate("/admin/login")}
//             className="ml-2 text-sm text-green-600 hover:underline"
//           >
//             Admin / Sub-Admin Login
//           </button>

//             <button
//             onClick={() => navigate("/saleslogin")}
//             className="ml-2 text-sm text-green-600 hover:underline"
//           >
//             Sales Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }








// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "@/config/config";

// export default function Login() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [verificationSuccess, setVerificationSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const role =
//     pathname.includes("admin") ? "admin" :
//     pathname.includes("sales") ? "sales" :
//     "user";

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     if (params.get("verified") === "true") {
//       setVerificationSuccess(true);
//     }
//   }, [location.search]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch(`${BASE_URL}/${role}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Invalid credentials");
//       }

//       const userData = await response.json();
//       localStorage.setItem("user", JSON.stringify(userData));

//       const storageEvent = new StorageEvent("storage", {
//         key: "user",
//         newValue: JSON.stringify(userData),
//         oldValue: null,
//         url: window.location.href,
//         storageArea: localStorage,
//       });
//       window.dispatchEvent(storageEvent);

//       navigate("/", { state: { scrollToHero: true }, replace: true });
//     } catch (err: any) {
//       setError(err.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-8 w-full max-w-md transform transition-all hover:scale-[1.01] border border-white/20">
//         <div className="space-y-6">
//           <h2 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight">
//             {pathname === "/admin/login" ? "Admin Portal" :
//              pathname === "/saleslogin" ? "Salesforce Portal" :
//              "Patient Portal"}
//           </h2>

//           {verificationSuccess && (
//             <div className="bg-blue-50/10 backdrop-blur-md border border-blue-200/20 text-blue-800 px-4 py-3 rounded-lg text-sm flex items-center gap-3 animate-in fade-in">
//               <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//               </svg>
//               Your email has been verified. Please login.
//             </div>
//           )}

//           {error && (
//             <div className="bg-red-50/10 backdrop-blur-md border border-red-200/20 text-red-800 px-4 py-3 rounded-lg text-sm flex items-center gap-3 animate-in fade-in">
//               <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-5">
//             <div>
//               <label className="block text-sm font-bold text-black-700 mb-1.5">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="block w-full px-4 py-3 bg-white/10 border border-gray-700/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 backdrop-blur-md text-gray-900"
//                 placeholder="you@example.com"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-bold text-black-700 mb-1.5">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full px-4 py-3 bg-white/10 border border-gray-700/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 backdrop-blur-md text-gray-900"
//                   placeholder="••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {showPassword ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     )}
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//             >
//               Login
//             </button>
//           </form>

//           <div className="text-center space-y-4">
//             <a
//               href="/forgot-password"
//               className="text-sm text-blue-600 hover:text-red-600 font-medium transition-colors"
//             >
//               Forgot password?
//             </a>

//             <div>
//               <span className="text-sm text-gray-600">Don't have an account?</span>
//               <button
//                 onClick={() => navigate("/register")}
//                 className="ml-2 text-sm text-blue-600 hover:text-red-600 font-medium transition-colors"
//               >
//                 Sign up
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "@/config/config";

// export default function Login() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathname = location.pathname;
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [verificationSuccess, setVerificationSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const role =
//     pathname.includes("admin") ? "admin" :
//     pathname.includes("sales") ? "sales" :
//     "user";

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     if (params.get("verified") === "true") {
//       setVerificationSuccess(true);
//     }
//   }, [location.search]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await fetch(`${BASE_URL}/${role}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Invalid credentials");
//       }

//       const userData = await response.json();
//       localStorage.setItem("user", JSON.stringify(userData));
//       const storageEvent = new StorageEvent("storage", {
//         key: "user",
//         newValue: JSON.stringify(userData),
//         oldValue: null,
//         url: window.location.href,
//         storageArea: localStorage,
//       });
//       window.dispatchEvent(storageEvent);
//       navigate("/", { state: { scrollToHero: true }, replace: true });
//     } catch (err) {
//       setError(err.message || "Login failed");
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
//           <h2 className="text-3xl font-bold text-center mb-4">Welcome Back!</h2>
//           <p className="text-center mb-6">Login Your Account</p>

//           {verificationSuccess && (
//             <div className="bg-blue-100 text-blue-800 p-3 rounded mb-4 text-sm flex items-center gap-2">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//               </svg>
//               Your email has been verified. Please login.
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

//             <div>
//               <label className="block text-sm font-medium mb-2">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
//                   placeholder="••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-600 rounded-full p-2 hover:bg-purple-500 transition duration-200"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   <svg
//                     className="w-4 h-4 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     {showPassword ? (
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                       />
//                     ) : (
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     )}
//                   </svg>
//                 </button>
//               </div>
//               <div className="flex justify-between mt-2 text-sm">
//                 <label className="flex items-center">
//                   <input type="checkbox" className="mr-2" /> Remember Me
//                 </label>
//                 <a href="/forgot-password" className="text-blue-200 hover:text-white">Forget Password?</a>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={handleLogin}
//               className="w-full bg-white text-purple-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
//             >
//               Login
//             </button>
//           </div>

//           <p className="text-center mt-4 text-sm">Don't have an account? <a href="/register" className="text-blue-200 hover:text-white">Register</a></p>
//         </div>
//       </div>
//     </div>
//   );
// }









import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config/config";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [error, setError] = useState("");

  const role =
    pathname.includes("admin") ? "admin" :
    pathname.includes("sales") ? "sales" :
    "user";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "true") {
      setVerificationSuccess(true);
    }
  }, [location.search]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/${role}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const userData = await response.json();
      localStorage.setItem("user", JSON.stringify(userData));
      const storageEvent = new StorageEvent("storage", {
        key: "user",
        newValue: JSON.stringify(userData),
        oldValue: null,
        url: window.location.href,
        storageArea: localStorage,
      });
      window.dispatchEvent(storageEvent);
      navigate("/", { state: { scrollToHero: true }, replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
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
          <h2 className="text-3xl font-bold text-center mb-4">Welcome Back!</h2>
          <p className="text-center mb-6">Login Your Account</p>

          {verificationSuccess && (
            <div className="bg-blue-100 text-blue-800 p-3 rounded mb-4 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Your email has been verified. Please login.
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
                placeholder="vk@gmail.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-600 rounded-full p-2 hover:bg-purple-500 transition duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    )}
                  </svg>
                </button>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Remember Me
                </label>
                <a href="/forgot-password" className="text-blue-200 hover:text-white">Forget Password?</a>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-white text-purple-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Login
            </button>
          </div>

          <p className="text-center mt-4 text-sm">Don't have an account? <a href="/register" className="text-blue-200 hover:text-white">Register</a></p>
        </div>
      </div>
    </div>
  );
}