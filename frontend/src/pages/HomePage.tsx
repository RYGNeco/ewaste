import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaRecycle,
  FaBuilding,
  FaShieldAlt,
  FaCertificate,
  FaChartBar,
  FaWeight,
  FaTools,
  FaLeaf,
  FaCalendarCheck,
  FaTruck,
  FaLock,
  FaSyncAlt,
  FaRegSmileBeam,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage eco-bg">
      {/* Hero Section */}
      <section className="hero" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
        <div className="hero-image animate-fade-in-left" style={{flex: '1 1 300px', display: 'flex', justifyContent: 'center'}}>
          <img src="https://images.squarespace-cdn.com/content/v1/6063fb56ece40577795aaa5f/20fe33a3-8425-41fd-b8cf-2811651ca473/iStock-1372577388.jpg" alt="Eco-friendly electronics recycling illustration" style={{maxWidth: '350px', width: '100%', borderRadius: '1rem'}} />
        </div>
        <div className="hero-content animate-fade-in-up" style={{flex: '2 1 400px', maxWidth: '600px', textAlign: 'center', padding: '0 2rem'}}>
          <h1>Responsible E-Waste Recycling for a Cleaner Tomorrow!</h1>
          <p className="subheadline">
            At RYGNeco, we make it easy for businesses and individuals to safely and responsibly recycle their electronic waste. From outdated computers to broken printers and everything in between — we help reduce landfill waste, recover valuable materials, and protect the environment.
          </p>
          <div className="cta-buttons">
            <Link to="/login" className="btn btn-green">Login</Link>
            <Link to="/register" className="btn btn-outline-green">Register</Link>
          </div>
        </div>
        <div className="hero-image animate-fade-in-right" style={{flex: '1 1 300px', display: 'flex', justifyContent: 'center'}}>
          <img src="/illustrative-diagram-electrical-waste-recycling-process-step-223221443.jpg" alt="E-waste recycling process diagram" style={{maxWidth: '350px', width: '100%', borderRadius: '1rem'}} />
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="offer animate-on-scroll">
        <h2>What We Offer</h2>
        <p className="offer-sub">Whether you're a small office or a large corporation, we provide reliable, secure, and eco-conscious solutions for disposing of your electronic waste.</p>
        <div className="offer-cards">
          <div className="offer-card">
            <FaBuilding className="offer-icon" />
            <h3>Business Pick-Up Services</h3>
            <p>Scheduled or on-demand e-waste collection from your business location.</p>
          </div>
          <div className="offer-card">
            <FaShieldAlt className="offer-icon" />
            <h3>Secure Data Destruction</h3>
            <p>Certified wiping or shredding with documentation for your records.</p>
          </div>
          <div className="offer-card">
            <FaRecycle className="offer-icon" />
            <h3>Certified Recycling</h3>
            <p>Environmentally responsible processing that meets all regulations.</p>
          </div>
          <div className="offer-card">
            <FaCertificate className="offer-icon" />
            <h3>Compliance Documentation</h3>
            <p>Clear, itemized reports and certificates for audits and tracking.</p>
          </div>
        </div>
      </section>

      {/* First Year Goals Section */}
      <section className="goals animate-on-scroll">
        <h2>RYGNeco's First Year Goals</h2>
        <div className="goal-stats">
          <div className="goal-card">
            <FaLeaf className="goal-icon" />
            <span className="goal-title">E-Waste Partners</span>
            <span className="goal-value">50+</span>
          </div>
          <div className="goal-card">
            <FaChartBar className="goal-icon" />
            <span className="goal-title">Devices Collected</span>
            <span className="goal-value">10,000+</span>
          </div>
          <div className="goal-card">
            <FaWeight className="goal-icon" />
            <span className="goal-title">Total Weight (kg)</span>
            <span className="goal-value">25,000</span>
          </div>
          <div className="goal-card">
            <FaTools className="goal-icon" />
            <span className="goal-title">Devices Refurbished</span>
            <span className="goal-value">2,000+</span>
          </div>
          <div className="goal-card">
            <FaRecycle className="goal-icon" />
            <span className="goal-title">Devices Recycled</span>
            <span className="goal-value">8,000+</span>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="process animate-on-scroll">
        <h2>Our Process</h2>
        <div className="process-steps">
          <div className="process-step">
            <FaCalendarCheck className="process-icon" />
            <span>Schedule</span>
            <p>Easy online form to schedule pickup.</p>
          </div>
          <div className="process-step">
            <FaTruck className="process-icon" />
            <span>Collect</span>
            <p>Our team collects your devices on time.</p>
          </div>
          <div className="process-step">
            <FaLock className="process-icon" />
            <span>Secure</span>
            <p>Data is securely wiped or destroyed.</p>
          </div>
          <div className="process-step">
            <FaSyncAlt className="process-icon" />
            <span>Process</span>
            <p>Devices are refurbished, repurposed, or recycled.</p>
          </div>
          <div className="process-step">
            <FaRegSmileBeam className="process-icon" />
            <span>Impact</span>
            <p>Receive detailed environmental and data security reports.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="footer-social">
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>
        <div className="footer-info">
          <span>© {new Date().getFullYear()} RYGNeco. All rights reserved.</span>
          <span className="footer-tagline">Empowering responsible e-waste recycling for a cleaner, greener future.</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
