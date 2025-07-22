// import React from "react";
// import { Link } from "react-router-dom";

// const VerifySuccess: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white px-4 relative overflow-hidden">
//       {/* Confetti Emoji Animation */}
//       <div className="absolute text-4xl animate-bounce top-10 left-10">🎊</div>
//       <div className="absolute text-4xl animate-bounce top-20 right-10 delay-200">🎉</div>
//       <div className="absolute text-4xl animate-bounce bottom-20 left-16 delay-300">🥳</div>
//       <div className="absolute text-4xl animate-bounce bottom-10 right-16 delay-500">🎈</div>

//       {/* Success Card */}
//       <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full animate-fade-in-down">
//         <h2 className="text-3xl font-bold text-green-600 mb-4">
//           ✅ Email Verified Successfully!
//         </h2>
//         <p className="text-gray-700 mb-6">
//           You can now log in to your account and start using our services.
//         </p>
//         <Link to="/login">
//           <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
//             Go to Login
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default VerifySuccess;
// src/pages/VerifySuccess.tsx

import React from "react";
import { Link } from "react-router-dom";

const VerifySuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 px-4 relative overflow-hidden font-sans">

      {/* 🎉 Animated Emojis */}
      <div className="absolute text-4xl animate-bounce top-8 left-8">🎊</div>
      <div className="absolute text-4xl animate-bounce top-24 right-10 delay-100">🎉</div>
      <div className="absolute text-4xl animate-bounce bottom-20 left-20 delay-200">🥳</div>
      <div className="absolute text-4xl animate-bounce bottom-10 right-16 delay-300">🎈</div>

      {/* ✨ Success Card */}
      <div className="relative z-10 max-w-md w-full p-10 bg-white rounded-3xl shadow-xl text-center 
                      animate-slide-in-up hover:scale-105 transition-all duration-500 ease-in-out 
                      hover:shadow-2xl group">
        
        {/* Shine Animation */}
        <div className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-[-100%] w-full h-full bg-white/10 rotate-45 animate-shine"></div>
        </div>

        <h2 className="text-4xl font-extrabold text-green-600 mb-4">
          ✅ Email Verified!
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Your email has been successfully verified. <br />
          You can now log in to enjoy all our features.
        </p>
        <Link to="/login">
          <button className="bg-green-600 hover:bg-green-700 transition duration-300 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-xl">
            Go to Login
          </button>
        </Link>
      </div>

      {/* Subtle particles or sparkles */}
      <div className="absolute inset-0 pointer-events-none animate-fade-in-slow">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="10" cy="10" r="1" fill="green" />
          <circle cx="90" cy="20" r="1" fill="lime" />
          <circle cx="50" cy="80" r="1" fill="yellowgreen" />
        </svg>
      </div>
    </div>
  );
};

export default VerifySuccess;
