
// import React from 'react';
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// const ExpertHelpSection = () => {
//   return (
//     <section className="py-12 bg-secondary/10">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <div>
//             <div className="flex flex-col space-y-4">
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Looking for an Expert Opinion?</h2>
//               <p className="text-gray-600">
//                 Our team of expert consultants can help guide you through your treatment options.
//                 Get personalized advice from our specialists who are leaders in their field.
//               </p>
//               <div className="mt-6">
//                 <Link to="/doctors">
//   <Button className="bg-secondary hover:bg-secondary/90 text-white">
//     Find a Doctor <ArrowRight className="ml-2 h-4 w-4" />
//   </Button>
// </Link>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex justify-center md:justify-end">
//             <img 
//               src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
//               alt="Doctor consultation" 
//               className="rounded-lg shadow-lg max-w-full md:max-w-sm"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ExpertHelpSection;












// import React from 'react';
// import { ArrowRight } from 'lucide-react';

// const ExpertHelpSection = () => {
//   return (
//     <section className="relative py-10 bg-secondary/10 overflow-hidden">
//       {/* Subtle background gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-60 pointer-events-none"></div>

//       <div className="relative container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//         {/* Text + Trust Badge + Testimonial */}
//         <div className="space-y-4">
//           <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">
//             Looking for an Expert Opinion?
//           </h2>
//           <p className="text-gray-600 text-base leading-relaxed">
//             Our team of experienced specialists is dedicated to providing personalized guidance and support. Whether you're seeking clarity on a diagnosis or exploring treatment options, we’re here to help you make informed decisions with confidence.
//           </p>
         
//         </div>

//         {/* Image with hover effect */}
//         <div className="flex justify-center md:justify-end">
//           <div className="transform transition-transform duration-300 hover:scale-105">
//             <img
//               loading="lazy"
//               src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
//               alt="Doctor and patient in consultation smiling"
//               className="rounded-lg shadow-lg max-w-full md:max-w-md"
//             />
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














// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ExpertHelpSection = () => {
//   return (
//     <section className="relative py-10 bg-secondary/10 overflow-hidden">
//       {/* Subtle background gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-60 pointer-events-none"></div>

//       <div className="relative container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//         {/* Text + Trust Badge + Testimonial + CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="space-y-4"
//         >
//           <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">
//             Looking for an Expert Opinion?
//           </h2>
//           <p className="text-gray-600 text-base leading-relaxed">
//             Our team of experienced specialists is dedicated to providing personalized guidance and support. Whether you're seeking clarity on a diagnosis or exploring treatment options, we’re here to help you make informed decisions with confidence.
//           </p>
         
          
//           <a
//             href="/ContactUsPage" // Replace with your actual route
//             className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
//           >
//             Book a Consultation
//             <ArrowRight className="ml-2 w-5 h-5" />
//           </a>
//         </motion.div>

//         {/* Image with hover effect */}
//         <div className="flex justify-center md:justify-end">
//           <div className="transform transition-transform duration-300 hover:scale-105">
//             <img
//               loading="lazy"
//               src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
//               alt="Doctor and patient in consultation smiling"
//               className="rounded-lg shadow-lg max-w-full md:max-w-md"
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

const ExpertHelpSection = () => {
  return (
    <section className="relative py-10 bg-secondary/10 overflow-hidden">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-60 pointer-events-none"></div>

      <div className="relative container mx-auto px-2 sm:px-4 md:px-6 flex flex-col md:grid md:grid-cols-2 gap-6 items-center">
        {/* Text + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center md:text-left"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">
            Looking for an Expert Opinion?
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Our team of experienced specialists is dedicated to providing personalized guidance and support. Whether you're seeking clarity on a diagnosis or exploring treatment options, we’re here to help you make informed decisions with confidence.
          </p>
          <a
            href="/ContactUsPage"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
          >
            Book a Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
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