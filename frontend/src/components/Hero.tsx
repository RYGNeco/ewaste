import React from 'react';
import heroImage from '../assets/images/heroplaceholder.png';
const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="pt-32 pb-16 md:pt-40 md:pb-24 px-4"
      style={{
        background: 'linear-gradient(to bottom, #f0fdf4, #ecfdf5)',
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold text-green-700 mb-4 leading-tight">
              Recycling E-Waste for a Greener Future
            </h1>
            <p className="text-gray-700 text-lg mb-6 md:pr-8">
              At Rygneco, we're dedicated to transforming electronic waste into valuable resources
              while protecting our environment for future generations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#services"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
              >
                Our Services
              </a>
              <a
                href="#contact"
                className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-200 rounded-full opacity-70"></div>
              <img
                src={heroImage}
                alt="E-Waste Recycling"
                className="rounded-lg relative z-10 w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-300 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
