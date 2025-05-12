import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import 'react-phone-input-2/lib/style.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import emailjs from '@emailjs/browser';

export default function RegisterPage() {
  const navigate = useNavigate();
  const countries = countryList().getData();
  const form = useRef<HTMLFormElement>(null);
  
  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init('88NBTKMwuUIobxI91');
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    country: null as any,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (value: any) => {
    setFormData({ ...formData, country: value });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, mobile: value });
  };

  const sendThankYouEmail = async () => {
    try {
      // Your EmailJS configuration
      const serviceId = 'service_ggabkft';
      const templateId = 'template_vievbdf';
      
      // Create template parameters - make sure these match your template variables
      const templateParams = {
        to_name: formData.firstName,
        to_email: formData.email,
        from_name: 'Medical Website Team',
        message: 'Thank you for registering with our Medical Website. We are excited to have you join our community!',
        // Add any additional parameters your template might need
        user_email: formData.email,
        user_name: `${formData.firstName} ${formData.lastName}`
      };
      
      console.log('Sending email with params:', templateParams);
      
      // Send the email - note we don't need to pass the publicKey here since we initialized it
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );
      
      console.log('Email sent successfully:', response);
      return true;
    } catch (error) {
      // Log detailed error information
      console.error('Email sending failed:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically make an API call to register the user
      // For this example, we'll just simulate a successful registration
      
      // Send the thank you email
      const emailSent = await sendThankYouEmail();
      
      if (emailSent) {
        setSuccessMessage('Registration successful! A confirmation email has been sent to your inbox.');
        // Redirect after a short delay to allow user to see the success message
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        // Registration was successful but email failed
        setSuccessMessage('Registration successful! However, we could not send a confirmation email at this time.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <>

    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        
         <div className="sm:mx-auto sm:w-full sm:max-w-[40rem]">

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form ref={form} className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="text-green-700">{successMessage}</p>
                </div>
              )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <Select
                options={countries}
                value={formData.country}
                onChange={handleCountryChange}
                placeholder="Select your country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <PhoneInput
                country={'us'}
                value={formData.mobile}
                onChange={handlePhoneChange}
                enableSearch
                inputClass="!w-full !h-10 !pl-12 !border !border-gray-300 !rounded-md"
                buttonClass="!border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
      <br></br>
      <br></br>
     
    </div>
  
    </>
  );
}