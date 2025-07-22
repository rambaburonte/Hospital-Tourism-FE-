
// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// const ExpertHelpSection = () => {
//   return (
//     <section className="relative py-10 bg-secondary/10 overflow-hidden">
//       {/* Subtle background gradient overlay */}
//       <div className="absolute inset-0  opacity-60 pointer-events-none"></div>

//       <div className="relative container mx-auto px-2 sm:px-4 md:px-6 flex flex-col md:grid md:grid-cols-2 gap-6 items-center">
//         {/* Text + CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="space-y-4 text-center md:text-left"
//         >
//           <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">
//             Looking for an Expert Opinion?
//           </h2>
//           <p className="text-gray-600 text-base leading-relaxed">
//             Our team of experienced specialists is dedicated to providing personalized guidance and support. Whether you're seeking clarity on a diagnosis or exploring treatment options, we’re here to help you make informed decisions with confidence.
//           </p>
//           <Link
//             to="/ContactUsPage"
//             className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
//           >
//             Book a Consultation
//             <ArrowRight className="ml-2 w-5 h-5" />
//           </Link>
//         </motion.div>

//         {/* Image with hover effect */}
//         <div className="flex justify-center w-full">
//           <div className="transform transition-transform duration-300 hover:scale-105 w-full max-w-[90%] sm:max-w-md md:max-w-lg">
//             <img
//               loading="lazy"
//               src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
//               alt="Doctor and patient in consultation smiling"
//               className="rounded-lg shadow-lg w-full h-auto"
//               aria-describedby="image-description"
//             />
//             <p id="image-description" className="sr-only">
//               A doctor and patient smiling during a consultation in a professional setting.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Decorative geometric shapes */}
//       <svg
//         className="absolute top-0 right-0 w-48 h-48 opacity-20"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 200 200"
//       >
//         <circle cx="100" cy="100" r="80" fill="#a7f3d0" />
//       </svg>
//       <svg
//         className="absolute bottom-0 left-0 w-36 h-36 opacity-15"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 200 200"
//       >
//         <path d="M50 150 L150 150 L100 50 Z" fill="#a7f3d0" />
//       </svg>
//     </section>
//   );
// };

// export default ExpertHelpSection;










import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ExpertHelpSection = () => {
  return (
    <section className="relative py-10 bg-secondary/10 overflow-hidden">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0  opacity-60 pointer-events-none"></div>

      <div className="relative container mx-auto px-2 sm:px-4 md:px-6 flex flex-col md:grid md:grid-cols-2 gap-6 items-center">
        {/* Text + CTA with glassmorphism effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center md:text-left bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">
            Looking for an Expert Opinion?
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Our team of experienced specialists is dedicated to providing personalized guidance and support. Whether you're seeking clarity on a diagnosis or exploring treatment options, we’re here to help you make informed decisions with confidence.
          </p>
          <Link
            to="/ContactUsPage"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
          >
            Book a Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>

        {/* Image with hover effect */}
        <div className="flex justify-center w-full">
          <div className="transform transition-transform duration-300 hover:scale-105 w-full max-w-[90%] sm:max-w-md md:max-w-lg">
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Doctor and patient in consultation smiling"
              className="rounded-lg shadow-lg w-full h-auto"
              aria-describedby="image-description"
            />
            <p id="image-description" className="sr-only">
              A doctor and patient smiling during a consultation in a professional setting.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative geometric shapes */}
      <svg
        className="absolute top-0 right-0 w-48 h-48 opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="80" fill="#a7f3d0" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-36 h-36 opacity-15"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
      >
        <path d="M50 150 L150 150 L100 50 Z" fill="#a7f3d0" />
      </svg>
    </section>
  );
};

export default ExpertHelpSection;