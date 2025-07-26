import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CeoInfo from '../components/CeoInfo';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-12">
            Our E-Waste Management Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 inline-flex rounded-full mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                E-Waste Collection
              </h3>
              <p className="text-gray-600 mb-4">
                We offer convenient collection services for businesses and individuals. 
                Our team ensures safe handling and transportation of your electronic waste.
              </p>
              <a href="#contact" className="text-green-600 font-medium hover:underline inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            {/* Service Card 2 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 inline-flex rounded-full mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Secure Data Destruction
              </h3>
              <p className="text-gray-600 mb-4">
                Protect your sensitive information with our certified data destruction services. 
                We ensure complete erasure of all data from your devices.
              </p>
              <a href="#contact" className="text-green-600 font-medium hover:underline inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            {/* Service Card 3 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 inline-flex rounded-full mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                IT Asset Disposal
              </h3>
              <p className="text-gray-600 mb-4">
                Comprehensive IT asset management and environmentally responsible disposal. 
                We handle the entire lifecycle from collection to recycling.
              </p>
              <a href="#contact" className="text-green-600 font-medium hover:underline inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-4" style={{background: 'linear-gradient(to bottom, #ecfdf5, #ffffff)'}}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
              <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
                About Rygneco E-Waste Tracker
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Rygneco is dedicated to revolutionizing e-waste management through innovative 
                  tracking and recycling solutions. Founded in 2020, we've been at the 
                  forefront of sustainable electronic disposal practices.
                </p>
                <p>
                  Our mission is to reduce the environmental impact of electronic waste 
                  while recovering valuable resources. Through our transparent tracking 
                  system, clients can monitor their e-waste journey from collection to 
                  recycling, ensuring compliance and environmental responsibility.
                </p>
                <p>
                  With state-of-the-art facilities and expert teams, we handle all types 
                  of electronic waste, from personal devices to large corporate IT assets, 
                  providing tailored solutions for businesses and individuals alike.
                </p>
              </div>
              <div className="mt-6 flex space-x-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Certified Recycling</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Secure Data Handling</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-w-1 aspect-h-1">
                    <img 
                      src="/placeholder.svg" 
                      alt="E-Waste Collection" 
                      className="object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="aspect-w-1 aspect-h-1 mt-8">
                    <img 
                      src="/placeholder.svg" 
                      alt="Recycling Process" 
                      className="object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="aspect-w-1 aspect-h-1 -mt-4">
                    <img 
                      src="/placeholder.svg" 
                      alt="Resource Recovery" 
                      className="object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="aspect-w-1 aspect-h-1 mt-4">
                    <img 
                      src="/placeholder.svg" 
                      alt="Sustainable Practices" 
                      className="object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-200 rounded-full opacity-60 -z-10"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-300 rounded-full opacity-70 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CeoInfo />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
