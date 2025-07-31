import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaMobileAlt, FaExclamationTriangle, FaRecycle, FaArrowRight, FaArrowLeft, FaArrowUp, FaArrowDown, FaInfoCircle, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn
} from 'react-icons/fa';
import './EducationPage.css';

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
    <div className="education-page eco-bg">
      {/* Hero Section */}
      <section className="education-hero">
        {/* Removed hero image for cleaner look */}
      </section>

      {/* What Is E-Waste */}
      <section id="what-is-ewaste" className="education-ewaste">
        <h2>What Is E-Waste?</h2>
        <div className="education-ewaste-content">
          <FaMobileAlt className="education-icon" />
          <p>Electronic waste (e-waste) refers to discarded electrical or electronic devices, including everything from outdated smartphones and laptops to broken household appliances and industrial equipment.<br />E-waste often contains valuable materials like gold, copper, and rare earth elements, alongside hazardous substances such as lead, mercury, and cadmium.</p>
          <FaExclamationTriangle className="education-icon warning" />
        </div>
      </section>

      {/* Why Does E-Waste Matter */}
      <section className="education-matter">
        <h2>Why Does E-Waste Matter?</h2>
        <p>E-waste is the fastest-growing waste stream in the world, driven by rapid technological advancement and short product life cycles. Every discarded phone, laptop, or appliance contributes to a growing environmental challenge — and an untapped economic opportunity.<br />Improper disposal of e-waste can release toxic substances into soil, water, and air, endangering human health and ecosystems. Yet, e-waste also contains valuable materials like gold, copper, and rare earth metals that can be recovered and reused.<br />Recycling e-waste responsibly reduces pollution, conserves natural resources, and supports a circular economy where technology is reused, repaired, and repurposed — not wasted.</p>
      </section>

      {/* Circular Economy */}
      <section id="circular-economy" className="education-circular">
        <h2>What Is A Circular Economy?</h2>
        <div className="education-circular-diagram">
          <span>Use</span> <FaArrowRight /> <span>Reuse</span> <FaArrowRight /> <span>Repair</span> <FaArrowRight /> <span>Recycle</span> <FaArrowRight /> <span>Back to Use</span>
        </div>
        <p>A circular economy keeps resources in use longer—repairing, reusing, and recycling instead of throwing away.<br />This model reduces pollution, conserves raw materials, and gives new life to old tech.</p>
      </section>

      {/* Fun Facts */}
      <section id="fun-facts" className="education-funfacts">
        <h2>Fun Facts</h2>
        <div className="education-funfacts-cards">
          {funFacts.map((fact, idx) => (
            <div key={idx} className="education-funfact-card">
              {fact.icon}
              <span>{fact.fact}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Community Learning In Action */}
      <section id="community-learning" className="education-community">
        <h2>Community Learning In Action</h2>
        <p>We work with schools, community centers, and local partners to host hands-on learning events.<br />Have an idea or want to collaborate?</p>
        <div className="education-contact-block">
          <div><FaPhone /> <span>+1 (616)-RYGNECO</span></div>
          <div><FaEnvelope /> <span>info@rygneco.com</span></div>
          <div><FaMapMarkerAlt /> <span>123 Green St, Eco City, USA</span></div>
          <div className="education-social">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
      </section>

      {/* User Input Form */}
      <section className="education-form">
        <h2>Let’s Collaborate!</h2>
        <form onSubmit={handleSubmit} className="education-collab-form">
          <div>
            <label>Full Name*<br /><input type="text" name="name" value={form.name} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>Company Name<br /><input type="text" name="company" value={form.company} onChange={handleChange} /></label>
          </div>
          <div>
            <label>Email*<br /><input type="email" name="email" value={form.email} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>Phone Number<br /><input type="tel" name="phone" value={form.phone} onChange={handleChange} /></label>
          </div>
          {error && <div className="education-form-error">{error}</div>}
          <button type="submit" className="btn btn-green">Submit Request</button>
          {submitted && <div className="education-form-success">Thank you! We’ll be in touch soon.</div>}
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <Link to="#community-learning">Community Learning In Action</Link>
          <Link to="#what-is-ewaste">Learn more about E-Waste</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="footer-info">
          <span>© {new Date().getFullYear()} RYGNeco. All rights reserved.</span>
          <span className="footer-tagline">Empowering responsible e-waste recycling for a cleaner, greener future.</span>
        </div>
      </footer>
    </div>
  );
};

export default EducationPage;
