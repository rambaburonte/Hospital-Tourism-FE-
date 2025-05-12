import React, { useState } from 'react';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email Validation
  const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address!');
      return;
    }

    setIsSubmitting(true);

    // Template parameters for sending to admin
    const templateParamsAdmin = {
      name: name,
      email: email,
      message: message,
    };

    // Template parameters for auto-reply to the user
    const templateParamsUser = {
      name: name,
      email: email,
      message: message,
    };

    // Send email to admin
    emailjs
      .send(
        'service_z6168dd', // replace with your EmailJS service ID
        'template_85xu5sd', // replace with your admin email template ID
        templateParamsAdmin,
        '6LcRFfl5dGNtZEXYw' // replace with your EmailJS public key
      )
      .then(
        (response) => {
          // Send auto-reply to user
          emailjs
            .send(
              'service_z6168dd', // same service ID
              'template_sqflvg7', // replace with your auto-reply template ID
              templateParamsUser,
              '6LcRFfl5dGNtZEXYw' // same public key
            )
            .then(
              (response) => {
                setIsSubmitting(false);
                toast.success('Message sent successfully!');
              },
              (error) => {
                setIsSubmitting(false);
                toast.error('Failed to send auto-reply, please try again!');
              }
            );
        },
        (error) => {
          setIsSubmitting(false);
          toast.error('Failed to send message, please try again!');
        }
      );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
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

export default ContactPage;
