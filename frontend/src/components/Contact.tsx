import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - this would connect to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
      phone: '',
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-12">
          Contact Us
        </h2>
        
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Our Location</h4>
                    <p className="text-gray-600 mt-1">
                      123 Eco Street, Green Valley<br />
                      California, 90210
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Email Us</h4>
                    <p className="text-gray-600 mt-1">
                      <a href="mailto:info@rygneco.com" className="text-green-600 hover:underline">
                        info@rygneco.com
                      </a>
                    </p>
                    <p className="text-gray-600 mt-1">
                      <a href="mailto:support@rygneco.com" className="text-green-600 hover:underline">
                        support@rygneco.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Call Us</h4>
                    <p className="text-gray-600 mt-1">
                      <a href="tel:+18001234567" className="text-green-600 hover:underline">
                        +1 (800) 123-4567
                      </a>
                    </p>
                    <p className="text-gray-600 mt-1">
                      Monday-Friday: 9am-5pm PST
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="https://facebook.com/rygneco" aria-label="Facebook" className="bg-green-100 p-3 rounded-full text-green-600 hover:bg-green-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
                    </svg>
                  </a>
                  <a href="https://twitter.com/rygneco" aria-label="Twitter" className="bg-green-100 p-3 rounded-full text-green-600 hover:bg-green-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="https://instagram.com/rygneco" aria-label="Instagram" className="bg-green-100 p-3 rounded-full text-green-600 hover:bg-green-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12.315 2c1.532 0 1.938.006 2.652.038 1.695.077 2.737.356 3.723.753a7.544 7.544 0 012.729 1.78 7.52 7.52 0 011.779 2.73c.398.986.677 2.027.753 3.723.033.715.039 1.121.039 2.652s-.006 1.939-.039 2.654c-.076 1.695-.355 2.736-.753 3.723a7.544 7.544 0 01-1.78 2.728 7.544 7.544 0 01-2.728 1.78c-.988.398-2.028.677-3.723.753-.715.033-1.121.039-2.654.039-1.533 0-1.939-.006-2.654-.039-1.696-.076-2.736-.355-3.724-.753a7.544 7.544 0 01-2.728-1.78 7.52 7.52 0 01-1.78-2.727c-.397-.988-.677-2.028-.753-3.724C3.006 14.253 3 13.848 3 12.316s.006-1.939.039-2.654c.076-1.696.355-2.736.753-3.724a7.52 7.52 0 011.78-2.728 7.52 7.52 0 012.728-1.78c.988-.397 2.028-.677 3.723-.753C10.377 2.006 10.782 2 12.315 2zm0 2.314c-1.35 0-1.764.006-2.452.036-1.252.057-1.95.254-2.448.464-.664.26-1.08.533-1.565 1.018-.485.485-.758.901-1.018 1.565-.21.498-.407 1.196-.464 2.448-.03.688-.035 1.102-.035 2.451 0 1.35.005 1.765.035 2.453.057 1.252.254 1.95.464 2.448.26.664.533 1.08 1.018 1.565.485.485.901.758 1.565 1.018.498.21 1.196.407 2.448.464.688.03 1.102.035 2.452.035 1.35 0 1.764-.006 2.452-.035 1.252-.057 1.95-.254 2.448-.464.664-.26 1.08-.533 1.565-1.018.485-.485.758-.901 1.018-1.565.21-.498.407-1.196.464-2.448.03-.688.035-1.103.035-2.452s-.005-1.764-.035-2.452c-.057-1.252-.254-1.95-.464-2.448-.26-.664-.533-1.08-1.018-1.565-.485-.485-.901-.758-1.565-1.018-.498-.21-1.196-.407-2.448-.464-.688-.03-1.102-.036-2.452-.036zm0 3.936a4.066 4.066 0 110 8.131 4.066 4.066 0 010-8.131zm0 6.703a2.637 2.637 0 100-5.274 2.637 2.637 0 000 5.274zm4.227-7.839a.95.95 0 100 1.9.95.95 0 000-1.9z" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com/company/rygneco" aria-label="LinkedIn" className="bg-green-100 p-3 rounded-full text-green-600 hover:bg-green-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
