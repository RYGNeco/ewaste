import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRecycle, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaArrowUp,
  FaLeaf,
  FaShieldAlt,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Our Mission', href: '/about-us#our-mission' },
      { label: 'Meet The Team', href: '/about-us#meet-the-team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press Kit', href: '/press' }
    ],
    services: [
      { label: 'Corporate Pickup', href: '/services#corporate' },
      { label: 'Data Security', href: '/services#security' },
      { label: 'Asset Recovery', href: '/services#recovery' },
      { label: 'Compliance', href: '/services#compliance' },
      { label: 'Reporting', href: '/services#reporting' }
    ],
    resources: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Education Center', href: '/education' },
      { label: 'Blog', href: '/blog' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'FAQ', href: '/faq' }
    ],
    support: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Help Center', href: '/help' },
      { label: 'Live Chat', href: '/chat' },
      { label: 'Status Page', href: '/status' },
      { label: 'Support Ticket', href: '/support' }
    ]
  };

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/rygneco', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com/rygneco', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com/rygneco', label: 'Instagram' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/rygneco', label: 'LinkedIn' },
    { icon: FaYoutube, href: 'https://youtube.com/rygneco', label: 'YouTube' }
  ];



  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <FaRecycle className="text-3xl text-green-400" />
              <span className="text-2xl font-bold">RYGNeco</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leading e-waste recycling solutions that protect the environment, 
              secure your data, and maximize value recovery for your business.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <FaMapMarkerAlt className="text-green-400 flex-shrink-0" />
                <span>123 Green Street, Eco City, EC 12345</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaPhone className="text-green-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaEnvelope className="text-green-400 flex-shrink-0" />
                <span>hello@rygneco.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaClock className="text-green-400 flex-shrink-0" />
                <span>Mon-Fri: 8AM-6PM EST</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:bg-green-600 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-300 text-sm">
              © {currentYear} RYGNeco. All rights reserved. | 
              <Link to="/privacy" className="hover:text-green-400 transition-colors ml-1">
                Privacy Policy
              </Link> | 
              <Link to="/terms" className="hover:text-green-400 transition-colors ml-1">
                Terms of Service
              </Link>
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <FaLeaf className="text-green-400" />
                <span>ISO 14001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-400" />
                <span>R2 Certified</span>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white hover:bg-green-700 transition-colors"
              aria-label="Back to top"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
