// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import PhoneInput from 'react-phone-input-2';
// import Select from 'react-select';
// import countryList from 'react-select-country-list';
// import 'react-phone-input-2/lib/style.css';
// import { BASE_URL } from '@/config/config';

// export default function RegisterPage() {
//   const navigate = useNavigate();
//   const countries = countryList().getData();

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     mobile: '',
//     country: null as any,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCountryChange = (value: any) => {
//     setFormData({ ...formData, country: value });
//   };

//   const handlePhoneChange = (value: string) => {
//     setFormData({ ...formData, mobile: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');
//     setIsSubmitting(true);

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setIsSubmitting(false);
//       return;
//     }

//     const payload = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       password: formData.password,
//       mobile: formData.mobile,
//       country: formData.country?.label || '',
//     };
      
//     try {
//       const response = await fetch(`${BASE_URL}/user/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         // ✅ Store in localStorage
//         localStorage.setItem(
//           'registeredUser',
//           JSON.stringify({
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             email: formData.email,
//             mobile: formData.mobile,
//             country: formData.country?.label || '',
//           })
//         );

//         setSuccessMessage(
//           'Registration successful! Please check your email to verify your account.'
//         );

//         // Redirect to login after 3 seconds
//         setTimeout(() => {
//           navigate('/login');
//         }, 3000);
//       } else {
//         const errorText = await response.text();
//         setError(errorText || 'Registration failed. Please try again.');
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again later.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-[40rem]">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Create your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Sign in
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}
//           {successMessage && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//               {successMessage}
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full border px-3 py-2 rounded-md border-gray-300"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full border px-3 py-2 rounded-md border-gray-300"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full border px-3 py-2 rounded-md border-gray-300"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Country</label>
//               <Select
//                 options={countries}
//                 value={formData.country}
//                 onChange={handleCountryChange}
//                 placeholder="Select your country"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
//               <PhoneInput
//                 country={'us'}
//                 value={formData.mobile}
//                 onChange={handlePhoneChange}
//                 enableSearch
//                 inputClass="!w-full !h-10 !pl-12 !border !border-gray-300 !rounded-md"
//                 buttonClass="!border-gray-300"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full border px-3 py-2 rounded-md border-gray-300"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full border px-3 py-2 rounded-md border-gray-300"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
//             >
//               {isSubmitting ? 'Creating Account...' : 'Create Account'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }













// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import PhoneInput from 'react-phone-input-2';
// import Select from 'react-select';
// import countryList from 'react-select-country-list';
// import 'react-phone-input-2/lib/style.css';
// import { BASE_URL } from '@/config/config';

// export default function RegisterPage() {
//   const navigate = useNavigate();
//   const countries = countryList().getData();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     mobilenum: '',
//     country: null,
//     role: 'PATIENT',
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCountryChange = (value: any) => {
//     setFormData({ ...formData, country: value });
//   };

//   const handlePhoneChange = (value: string) => {
//     setFormData({ ...formData, mobilenum: value });
//   };

//   const strongPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@\-_]).{8,}$/;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');
//     setIsSubmitting(true);

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setIsSubmitting(false);
//       return;
//     }

//     if (!strongPasswordRegex.test(formData.password)) {
//       setError(
//         'Password must be at least 8 characters long and contain letters, numbers, and at least one special character (@, -, _)'
//       );
//       setIsSubmitting(false);
//       return;
//     }

//     const payload = {
//       name: formData.name,
//       email: formData.email,
//       mobilenum: formData.mobilenum,
//       country: formData.country?.label || '',
//       password: formData.password,
//       role: formData.role,
//     };

//     try {
//       const response = await fetch(`${BASE_URL}/user/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         localStorage.setItem('registeredUser', JSON.stringify(payload));
//         setSuccessMessage(
//           'Registration successful! Please check your email to verify your account.'
//         );
//         setTimeout(() => {
//           navigate('/login');
//         }, 3000);
//       } else {
//         const errorText = await response.text();
//         setError(errorText || 'Registration failed. Please try again.');
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again later.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-8 w-full max-w-md transform transition-all hover:scale-[1.01] border border-white/20">
//         <div className="space-y-6">
//           <h2 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight">
//             Create your account
//           </h2>
//           <p className="text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="font-medium text-blue-600 hover:text-red-600 transition-colors">
//               Sign in
//             </Link>
//           </p>

//           {error && (
//             <div className="bg-red-50/10 backdrop-blur-md border border-red-200/20 text-red-800 px-4 py-3 rounded-lg text-sm flex items-center gap-3 animate-in fade-in">
//               <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {error}
//             </div>
//           )}
//           {successMessage && (
//             <div className="bg-blue-50/10 backdrop-blur-md border border-blue-200/20 text-blue-800 px-4 py-3 rounded-lg text-sm flex items-center gap-3 animate-in fade-in">
//               <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//               </svg>
//               {successMessage}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-bold text-black-700 mb-1.5">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="block w-full px-4 py-3 bg-white/10 border border-gray-700/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 backdrop-blur-md text-gray-900"
//                 placeholder="Your name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-black-700 mb-1.5">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="block w-full px-4 py-3 bg-white/10 border border-gray-700/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 backdrop-blur-md text-gray-900"
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-black-700 mb-1.5">Country</label>
//               <Select
//                 options={countries}
//                 value={formData.country}
//                 onChange={handleCountryChange}
//                 placeholder="Select your country"
//                 classNamePrefix="react-select"
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                     borderColor: 'rgba(55, 65, 81, 0.2)',
//                     borderRadius: '0.5rem',
//                     padding: '0.5rem',
//                     backdropFilter: 'blur(10px)',
//                     '&:hover': {
//                       borderColor: 'rgba(59, 130, 246, 0.5)',
//                     },
//                   }),
//                   menu: (base) => ({
//                     ...base,
//                     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                     backdropFilter: 'blur(10px)',
//                     border: '1px solid rgba(55, 65, 81, 0.2)',
//                     borderRadius: '0.5rem',
//                   }),
//                   option: (base, state) => ({
//                     ...base,
//                     backgroundColor: state.isSelected
//                       ? 'rgba(59, 130, 246, 0.2)'
//                       : state.isFocused
//                       ? 'rgba(59, 130, 246, 0.1)'
//                       : 'transparent',
//                     color: state.isSelected ? '#1f2937' : '#1f2937',
//                     '&:hover': {
//                       backgroundColor: 'rgba(59, 130, 246, 0.1)',
//                     },
//                   }),
//                   singleValue: (base) => ({
//                     ...base,
//                     color: '#1f2937',
//                   }),
//                   placeholder: (base) => ({
//                     ...base,
//                     color: '#9ca3af',
//                   }),
//                 }}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-black-700 mb-1.5">Mobile Number</label>
//               <PhoneInput
//                 country={'in'}
//                 value={formData.mobilenum}
//                 onChange={handlePhoneChange}
//                 enableSearch
//                 inputClass="!w-full !h-12 !pl-12 !bg-white/10 !border !border-gray-700/20 !rounded-lg !focus:ring-2 !focus:ring-blue-500 !focus:border-blue-500 !transition-all !duration-200 !placeholder-gray-400 !backdrop-blur-md !text-gray-900"
//                 buttonClass="!bg-white/10 !border-gray-700/20 !rounded-l-lg"
//                 dropdownClass="!bg-white/10 !backdrop-blur-md !border !border-gray-700/20 !rounded-lg"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-black-700 mb-1.5">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="block w-full px-4 py-3 bg-white/10 border border-gray-700/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 backdrop-blur-md text-gray-900"
//                   placeholder="••••••••"
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

//             <div>
//               <label className="block text-sm font-bold text-black-700 mb-1.5">Confirm Password</label>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                   className="block w-full px-4 py-3 bg-white/10 border border-gray-700/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 backdrop-blur-md text-gray-900"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {showConfirmPassword ? (
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
//               disabled={isSubmitting}
//               className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50"
//             >
//               {isSubmitting ? 'Creating Account...' : 'Create Account'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }










import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import 'react-phone-input-2/lib/style.css';
import { BASE_URL } from '@/config/config';

export default function RegisterPage() {
  const navigate = useNavigate();
  const countries = countryList().getData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobilenum: '',
    country: null,
    role: 'PATIENT',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (value: any) => {
    setFormData({ ...formData, country: value });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, mobilenum: value });
  };

  const strongPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@\-_]).{8,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    if (!strongPasswordRegex.test(formData.password)) {
      setError(
        'Password must be at least 8 characters long and contain letters, numbers, and at least one special character (@, -, _)'
      );
      setIsSubmitting(false);
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      mobilenum: formData.mobilenum,
      country: formData.country?.label || '',
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        localStorage.setItem('registeredUser', JSON.stringify(payload));
        setSuccessMessage(
          'Registration successful! Please check your email to verify your account.'
        );
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        const errorText = await response.text();
        setError(errorText || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center relative">
      <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-stretch bg-purple-700 rounded-2xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative m-0 p-0">
          <img src="/register.png" alt="Register" className="max-w-full h-auto object-cover w-full" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 text-white m-0">
          <h2 className="text-3xl font-bold text-center mb-4">Create Your Account</h2>
          <p className="text-center mb-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-200 hover:text-white">
              Sign in
            </Link>
          </p>

          {error && (
            <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-blue-100 text-blue-800 p-3 rounded mb-4 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <Select
                options={countries}
                value={formData.country}
                onChange={handleCountryChange}
                placeholder="Select your country"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    color: '#ffffff',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? 'rgba(255, 255, 255, 0.2)'
                      : state.isFocused
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'transparent',
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: '#ffffff',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: 'rgba(255, 255, 255, 0.5)',
                  }),
                  input: (base) => ({
                    ...base,
                    color: '#ffffff',
                  }),
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mobile Number</label>
              <PhoneInput
                country={'in'}
                value={formData.mobilenum}
                onChange={handlePhoneChange}
                enableSearch
                inputClass="!w-full !h-12 !pl-12 !bg-white !bg-opacity-20 !border !border-white !border-opacity-20 !rounded-lg !focus:ring-2 !focus:ring-white !focus:border-white !transition-all !duration-200 !placeholder-gray-200 !text-white"
                buttonClass="!bg-white !bg-opacity-20 !border-white !border-opacity-20 !rounded-l-lg"
                dropdownClass="!bg-white !bg-opacity-20 !border !border-white !border-opacity-20 !rounded-lg !text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
                  placeholder="••••••••"
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-600 rounded-full p-2 hover:bg-purple-500 transition duration-200"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {showConfirmPassword ? (
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
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-purple-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}