import React from 'react';

const CeoInfo: React.FC = () => {
  return (
    <section id="ceo" className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-12">
          Message from Our CEOs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* CEO 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-green-500 shadow-lg mb-6">
              <img 
                src="/placeholder.svg" 
                alt=" XYZ XYZ Portrait" 
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              XYZ XYZ
            </h3>
            <p className="text-green-600 font-medium mb-4">
              Founder & Co-CEO
            </p>
            <div className="text-gray-700 space-y-4 text-left">
              <p>
                "At Rygneco, our vision is to revolutionize how the world handles electronic waste. 
                We believe that every discarded device represents not just an environmental 
                challenge, but an opportunity to recover valuable resources and protect our planet."
              </p>
            </div>
            <div className="mt-6 flex space-x-4">
              <a href="https://twitter.com/rygneco" aria-label="Twitter" className="text-green-600 hover:text-green-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
                </svg>
              </a>
              <a href="mailto:ceo@rygneco.com" aria-label="Email" className="text-green-600 hover:text-green-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8.245V12h3.245c-.199.979-.792 1.798-1.673 2.316l2.613 2.03c1.587-1.464 2.548-3.587 2.548-6.057 0-.551-.051-1.104-.157-1.654L16 8.245z" fill="#3F83F8"/>
                  <path d="M10.335 13.304l-1.335 1.04-1.335-1.04C7.244 15.53 7 18 7 18s2.09-.684 3.5-1.171C11.91 17.316 14 18 14 18s-.244-2.47-.665-4.696l-1.335 1.04-1.335-1.04z" fill="#34A853"/>
                  <path d="M5.441 12.016c-.774-.538-1.339-1.343-1.566-2.251H1V6.334C1 3.388 3.388 1 6.334 1h14.332C23.612 1 26 3.388 26 6.334v11.332c0 2.946-2.388 5.334-5.334 5.334H6.334C3.388 23 1 20.612 1 17.666V9.765h2.875c.23-.913.8-1.723 1.581-2.261l-2.582-2.01c-1.587 1.464-2.548 3.587-2.548 6.057 0 .551.051 1.104.157 1.654l5.338 1.112z" fill="#4285F4"/>
                  <path d="M18.259 6.334c0-.815-.662-1.478-1.478-1.478H10.22c-.816 0-1.478.663-1.478 1.478v2.582l4.305 3.348 4.305-3.348V6.334z" fill="#EA4335"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/rygneco-ceo" aria-label="LinkedIn" className="text-green-600 hover:text-green-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* CEO 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-green-500 shadow-lg mb-6">
              <img 
                src="/placeholder.svg" 
                alt="XYZ XYZ Portrait" 
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              XYZ XYZ
            </h3>
            <p className="text-green-600 font-medium mb-4">
              Co-CEO & Head of Operations
            </p>
            <div className="text-gray-700 space-y-4 text-left">
              <p>
                "Our commitment goes beyond recycling – we're dedicated to creating a circular 
                economy where electronics are designed, used, and recycled with minimal 
                environmental impact. Join us in our mission to make e-waste management transparent, 
                efficient, and beneficial for all."
              </p>
            </div>
            <div className="mt-6 flex space-x-4">
              <a href="https://twitter.com/rygneco" aria-label="Twitter" className="text-green-600 hover:text-green-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
                </svg>
              </a>
              <a href="mailto:ceo@rygneco.com" aria-label="Email" className="text-green-600 hover:text-green-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8.245V12h3.245c-.199.979-.792 1.798-1.673 2.316l2.613 2.03c1.587-1.464 2.548-3.587 2.548-6.057 0-.551-.051-1.104-.157-1.654L16 8.245z" fill="#3F83F8"/>
                  <path d="M10.335 13.304l-1.335 1.04-1.335-1.04C7.244 15.53 7 18 7 18s2.09-.684 3.5-1.171C11.91 17.316 14 18 14 18s-.244-2.47-.665-4.696l-1.335 1.04-1.335-1.04z" fill="#34A853"/>
                  <path d="M5.441 12.016c-.774-.538-1.339-1.343-1.566-2.251H1V6.334C1 3.388 3.388 1 6.334 1h14.332C23.612 1 26 3.388 26 6.334v11.332c0 2.946-2.388 5.334-5.334 5.334H6.334C3.388 23 1 20.612 1 17.666V9.765h2.875c.23-.913.8-1.723 1.581-2.261l-2.582-2.01c-1.587 1.464-2.548 3.587-2.548 6.057 0 .551.051 1.104.157 1.654l5.338 1.112z" fill="#4285F4"/>
                  <path d="M18.259 6.334c0-.815-.662-1.478-1.478-1.478H10.22c-.816 0-1.478.663-1.478 1.478v2.582l4.305 3.348 4.305-3.348V6.334z" fill="#EA4335"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/rygneco-ceo" aria-label="LinkedIn" className="text-green-600 hover:text-green-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoInfo;
