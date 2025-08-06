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
  FaChartLine,
  FaArrowRight
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
        {/* ...existing code... */}
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8">
        {/* ...existing code... */}
      </div>
    </footer>
  );
};

export default Footer;
