import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaMobileAlt, FaExclamationTriangle, FaRecycle, FaArrowRight, FaArrowLeft, FaArrowUp, FaArrowDown, FaInfoCircle, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn
} from 'react-icons/fa';

const funFacts = [
  {
    icon: <FaRecycle />,
    fact: 'Only 17.4% of e-waste is documented as properly recycled globally.'
  },
  {
    icon: <FaInfoCircle />,
    fact: 'One ton of e-waste can contain more gold than a ton of mined ore.'
  },
  {
    icon: <FaExclamationTriangle />,
    fact: 'Over 50 million tons of e-waste are generated annually — and rising.'
  }
];

const EducationPage = () => {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email) {
      setError('Please fill in all required fields.');
      return;
    }
    // Simulate POST to backend
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setSubmitted(true);
    setForm({ name: '', company: '', email: '', phone: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-100 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Education Center</h1>
          <p className="text-xl text-gray-600">
            Learn about e-waste, circular economy, and how you can make a difference
          </p>
        </div>
      </section>

      {/* What Is E-Waste */}
      <section id="what-is-ewaste" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">What Is E-Waste?</h2>
          <div className="bg-green-50 p-8 rounded-lg border border-green-200">
            <div className="flex items-center justify-center mb-6">
              <FaMobileAlt className="text-6xl text-green-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              Electronic waste (e-waste) refers to discarded electrical or electronic devices, including everything from outdated smartphones and laptops to broken household appliances and industrial equipment.
              <br /><br />
              E-waste often contains valuable materials like gold, copper, and rare earth elements, alongside hazardous substances such as lead, mercury, and cadmium.
            </p>
            <div className="flex items-center justify-center mt-6">
              <FaExclamationTriangle className="text-4xl text-yellow-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Does E-Waste Matter */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Why Does E-Waste Matter?</h2>
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed">
              E-waste is the fastest-growing waste stream in the world, driven by rapid technological advancement and short product life cycles. Every discarded phone, laptop, or appliance contributes to a growing environmental challenge — and an untapped economic opportunity.
              <br /><br />
              Improper disposal of e-waste can release toxic substances into soil, water, and air, endangering human health and ecosystems. Yet, e-waste also contains valuable materials like gold, copper, and rare earth metals that can be recovered and reused.
              <br /><br />
              Recycling e-waste responsibly reduces pollution, conserves natural resources, and supports a circular economy where technology is reused, repaired, and repurposed — not wasted.
            </p>
          </div>
        </div>
      </section>

      {/* Circular Economy */}
      <section id="circular-economy" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">What Is A Circular Economy?</h2>
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-lg font-semibold text-gray-700">
              <span className="bg-white px-4 py-2 rounded-lg shadow">Use</span>
              <FaArrowRight className="text-blue-600" />
              <span className="bg-white px-4 py-2 rounded-lg shadow">Reuse</span>
              <FaArrowRight className="text-blue-600" />
              <span className="bg-white px-4 py-2 rounded-lg shadow">Repair</span>
              <FaArrowRight className="text-blue-600" />
              <span className="bg-white px-4 py-2 rounded-lg shadow">Recycle</span>
              <FaArrowRight className="text-blue-600" />
              <span className="bg-white px-4 py-2 rounded-lg shadow">Back to Use</span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              A circular economy keeps resources in use longer—repairing, reusing, and recycling instead of throwing away.
              <br /><br />
              This model reduces pollution, conserves raw materials, and gives new life to old tech.
            </p>
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section id="fun-facts" className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Fun Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {funFacts.map((fact, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 text-center shadow-md">
                <div className="text-4xl text-green-600 mb-4">{fact.icon}</div>
                <span className="text-gray-700 font-medium">{fact.fact}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Learning In Action */}
      <section id="community-learning" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Community Learning In Action</h2>
          <div className="bg-green-50 p-8 rounded-lg border border-green-200">
            <p className="text-lg text-gray-700 mb-8 text-center">
              We work with schools, community centers, and local partners to host hands-on learning events.
              <br /><br />
              Have an idea or want to collaborate?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <FaPhone className="text-green-600 text-xl" />
                <span>+1 (616)-RYGNECO</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaEnvelope className="text-green-600 text-xl" />
                <span>info@rygneco.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaMapMarkerAlt className="text-green-600 text-xl" />
                <span>123 Green St, Eco City, USA</span>
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <a href="#" aria-label="Facebook" className="text-blue-600 hover:text-blue-800 text-2xl">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter" className="text-blue-600 hover:text-blue-800 text-2xl">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram" className="text-blue-600 hover:text-blue-800 text-2xl">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-blue-600 hover:text-blue-800 text-2xl">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* User Input Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Let's Collaborate!</h2>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border border-gray-200 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name*
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Company Name
                </label>
                <input 
                  type="text" 
                  name="company" 
                  value={form.company} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email*
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            {error && <div className="text-red-600 mb-4 p-3 bg-red-50 rounded-lg">{error}</div>}
            <button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Submit Request
            </button>
            {submitted && <div className="text-green-600 mt-4 p-3 bg-green-50 rounded-lg text-center">Thank you! We'll be in touch soon.</div>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default EducationPage;
