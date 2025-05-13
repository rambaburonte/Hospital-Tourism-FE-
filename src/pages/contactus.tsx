import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_ggabkft'; // Use the same service ID as registration page
const EMAILJS_PUBLIC_KEY = '88NBTKMwuUIobxI91'; // Use the same public key as registration page
const EMAILJS_TEMPLATE_ID = 'template_ohbqnlj'; // Using the same template ID that works in registration

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Email Validation
  const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validate inputs
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

    // Template parameters for the email
    const templateParams = {
      to_name: name,
      to_email: email,
      from_name: 'Medical Website Team',
      message: message,
      user_email: email,
      user_name: name,
      date: new Date().toLocaleDateString()
    };

    try {
      // Send email using the working template
      console.log('Sending email with params:', templateParams);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      // Both emails sent successfully
      toast.success('Message sent successfully!');
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      
    } catch (error) {
      console.error('Failed to send email:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
      toast.error('Failed to send message, please try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {formError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">{formError}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#499E14]"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#499E14]"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#499E14] h-32"
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#499E14] text-white py-2 rounded-md hover:bg-[#3a7e10] transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
