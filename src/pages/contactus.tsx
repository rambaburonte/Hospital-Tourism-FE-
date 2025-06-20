


// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import emailjs from '@emailjs/browser';

// const ContactUsPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [company, setCompany] = useState('');
//   const [service, setService] = useState('');
//   const [budget, setBudget] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formError, setFormError] = useState('');

//   useEffect(() => {
//     emailjs.init('88NBTKMwuUIobxI91');
//   }, []);

//   const isValidEmail = (email) => {
//     const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return re.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError('');

//     if (!name.trim()) {
//       setFormError('Please enter your name');
//       toast.error('Please enter your name');
//       return;
//     }
//     if (!isValidEmail(email)) {
//       setFormError('Please enter a valid email address');
//       toast.error('Please enter a valid email address!');
//       return;
//     }
//     if (!message.trim()) {
//       setFormError('Please enter a message');
//       toast.error('Please enter a message');
//       return;
//     }

//     setIsSubmitting(true);

//     const templateParams = {
//       to_name: name,
//       to_email: email,
//       from_name: 'Hospital Tourism Admin',
//       message: message,
//       user_email: email,
//       user_name: name,
//       company: company,
//       service: service,
//       budget: budget,
//       date: new Date().toLocaleDateString(),
//     };

//     try {
//       await emailjs.send('service_ggabkft', 'template_ohbqnlj', templateParams);
//       toast.success('Message sent successfully to Hospital Tourism Admin!');
//       setName('');
//       setEmail('');
//       setCompany('');
//       setService('');
//       setBudget('');
//       setMessage('');
//     } catch (error) {
//       console.error('Failed to send email:', error);
//       toast.error('Failed to send message, please try again!');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-start p-8 bg-gray-50 min-h-screen">
//       <div className="w-full max-w-4xl flex space-x-8">
//         {/* Left Section */}
//         <div className="w-1/2 text-gray-600">
//           <h1 className="text-4xl font-bold text-black mb-4">Get In Touch</h1>
//           <p className="text-lg mb-6">Ready to discuss your hospital tourism needs? Contact our admin team, and we’ll get back to you within 24 hours.</p>
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-lg font-medium text-green-700">Email Us</h3>
//               <a href="mailto:Info.meditailor@gmail.com" className="text-green-400 hover:underline">Info.meditailor@gmail.com</a>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-green-700">Call Us</h3>
//               <a href="tel:+918595114141" className="text-green-400 hover:underline">+91 8595114141</a>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-green-700">Visit Us</h3>
//               <p>kavuri hills<br />Trendz Aspire, Madhapur, Hitech city<br />Hyderabad, Telangana</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-green-700">Follow Us</h3>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-green-400 hover:underline">Twitter</a>
//                 <a href="#" className="text-green-400 hover:underline">LinkedIn</a>
//                 <a href="#" className="text-green-400 hover:underline">Instagram</a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Contact Form */}
//         <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold text-green-700 mb-6">Contact Form</h2>
//           {formError && (
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
//               <p className="text-red-700">{formError}</p>
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="flex space-x-4">
//               <div className="w-1/2">
//                 <label className="block text-gray-700 mb-2">Your Name</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//                   placeholder="John Doe"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="w-1/2">
//                 <label className="block text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//                   placeholder="john@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-2">Hospital</label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//                 placeholder="Your Hospital"
//                 value={company}
//                 onChange={(e) => setCompany(e.target.value)}
//               />
//             </div>
//             <div className="flex space-x-4">
//               <div className="w-1/2">
//                 <label className="block text-gray-700 mb-2">Service of Interest</label>
//                 <select
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//                   value={service}
//                   onChange={(e) => setService(e.target.value)}
//                 >
//                   <option value="">Select a service</option>
//                   <option value="tour">Hospital Tourism Packages</option>
//                   <option value="consult">Medical Consultation</option>
//                   <option value="travel">Travel Arrangements</option>
//                 </select>
//               </div>
//               <div className="w-1/2">
//                 <label className="block text-gray-700 mb-2">Budget Range</label>
//                 <select
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//                   value={budget}
//                   onChange={(e) => setBudget(e.target.value)}
//                 >
//                   <option value="">Select budget range</option>
//                   <option value="0-5000">$0 - $5000</option>
//                   <option value="5000-10000">$5000 - $10000</option>
//                   <option value="10000+">$10000+</option>
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-2">Treatment Details</label>
//               <textarea
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 h-24"
//                 placeholder="Tell us about your treatment needs..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 required
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500 transition-colors"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Sending...' : 'Send Message'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUsPage;











import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

const ContactUsPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [service, setService] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    emailjs.init('88NBTKMwuUIobxI91');
  }, []);

  const isValidEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please enter your name');
      toast.error('Please enter your name');
      return;
    }
    if (!isValidEmail(email)) {
      setFormError('Please enter a valid email address');
      toast.error('Please enter a valid email address!');
      return;
    }
    if (!message.trim()) {
      setFormError('Please enter a message');
      toast.error('Please enter a message');
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      to_name: name,
      to_email: email,
      from_name: 'Hospital Tourism Admin',
      message: message,
      user_email: email,
      user_name: name,
      company: company,
      service: service,
      budget: budget,
      date: new Date().toLocaleDateString(),
    };

    try {
      await emailjs.send('service_ggabkft', 'template_ohbqnlj', templateParams);
      toast.success('Message sent successfully to Hospital Tourism Admin!');
      setName('');
      setEmail('');
      setCompany('');
      setService('');
      setBudget('');
      setMessage('');
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error('Failed to send message, please try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-start p-8 bg-[#92D393] min-h-screen">
      <div className="w-full max-w-5xl flex space-x-8">
        {/* Left Section */}
        <div className="w-1/2 text-white">
          <h1 className="text-5xl font-extrabold text-white opacity-90 mb-6 tracking-tight">Get In Touch</h1>
          <p className="text-xl mb-8 text-white opacity-80 leading-relaxed">Ready to explore hospital tourism solutions? Reach out to our team, and we’ll respond within 24 hours.</p>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white opacity-90">Email Us</h3>
              <a href="mailto:Info.meditailor@gmail.com" className="text-white opacity-80 hover:opacity-100 transition-opacity">Info.meditailor@gmail.com</a>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white opacity-90">Call Us</h3>
              <a href="tel:+918595114141" className="text-white opacity-80 hover:opacity-100 transition-opacity">+91 8595114141</a>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white opacity-90">Visit Us</h3>
              <p className="text-white opacity-80">kavuri hills<br />Trendz Aspire, Madhapur, Hitech city<br />Hyderabad, Telangana</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white opacity-90">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white opacity-80 hover:opacity-100 transition-opacity">Twitter</a>
                <a href="#" className="text-white opacity-80 hover:opacity-100 transition-opacity">LinkedIn</a>
                <a href="#" className="text-white opacity-80 hover:opacity-100 transition-opacity">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="w-1/2 bg-white p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-semibold text-[#A3E635] opacity-90 mb-6">Contact Form</h2>
          {formError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
              <p className="text-red-700 opacity-90">{formError}</p>
            </div>
          )}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 opacity-80 mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635] bg-white"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 opacity-80 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635] bg-white"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 opacity-80 mb-2 font-medium">Hospital</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635] bg-white"
                placeholder="Your Hospital"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 opacity-80 mb-2 font-medium">Service of Interest</label>
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635] bg-white"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="">Select a service</option>
                  <option value="tour">Hospital Tourism Packages</option>
                  <option value="consult">Medical Consultation</option>
                  <option value="travel">Travel Arrangements</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 opacity-80 mb-2 font-medium">Budget Range</label>
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635] bg-white"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="">Select budget range</option>
                  <option value="0-5000">$0 - $5000</option>
                  <option value="5000-10000">$5000 - $10000</option>
                  <option value="10000+">$10000+</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 opacity-80 mb-2 font-medium">Treatment Details</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A3E635] bg-white h-28"
                placeholder="Tell us about your treatment needs..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="button"
              className="w-full bg-[#A3E635] text-white opacity-90 py-3 rounded-md hover:bg-[#8FD32F] transition-colors font-semibold"
              onClick={() => document.getElementById('contact-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            <form id="contact-form" onSubmit={handleSubmit} className="hidden"></form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;