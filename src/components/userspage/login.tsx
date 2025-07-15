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



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config/config";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#3a7e10] tracking-tight">
            {pathname === "/admin/login" ? "Admin Portal Login" :
             pathname === "/saleslogin" ? "Salesforce Portal Login" :
             "Patient Portal Login"}
          </h2>

          {verificationSuccess && (
            <div className="bg-green-50 border-l-4 border-green-400 text-green-700 px-5 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
              <span className="text-green-500">✅</span>
              Your email has been verified. Please login.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-5 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition duration-200"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition duration-200"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#499E14] to-[#3a7e10] text-white py-3 rounded-xl hover:from-[#3a7e10] hover:to-[#2f6410] transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-6 space-y-3">
            <a
              href="/forgot-password"
              className="text-sm text-[#499E14] hover:text-[#3a7e10] underline underline-offset-4 transition-colors"
            >
              Forgot password?
            </a>

            <div className="mt-2">
              <span className="text-sm text-gray-600">Don't have an account?</span>
              <button
                onClick={() => navigate("/register")}
                className="ml-2 text-sm text-green-600 hover:text-green-700 underline underline-offset-4 transition-colors"
              >
                Sign up
              </button>
            </div>

            {/* Icon buttons */}
            {pathname === "/login" && (
              <div className="flex justify-center gap-6 mt-4">
                <button
                  onClick={() => navigate("/admin/login")}
                  className="text-green-600 hover:text-green-700"
                  title="Admin Login"
                >
                  <i className="fas fa-user-shield text-xl"></i>
                </button>
                <button
                  onClick={() => navigate("/saleslogin")}
                  className="text-green-600 hover:text-green-700"
                  title="Salesforce Login"
                >
                  <i className="fas fa-briefcase text-xl"></i>
                </button>
              </div>
            )}

            {/* Text links always shown */}
            <div className="mt-4 space-y-1">
              <button
                onClick={() => navigate("/admin/login")}
                className="block text-sm text-green-600 hover:text-green-700 underline underline-offset-4 transition-colors"
              >
                Admin / Sub-Admin Login
              </button>
              <button
                onClick={() => navigate("/saleslogin")}
                className="block text-sm text-green-600 hover:text-green-700 underline underline-offset-4 transition-colors"
              >
                Salesforce Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

