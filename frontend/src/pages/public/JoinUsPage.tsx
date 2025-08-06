<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaLeaf, FaUsers, FaChartBar, FaTruck, FaMobileAlt, FaBuilding, FaGift, FaHandshake, FaBullhorn, FaMedal, FaMoneyBillWave, FaTree } from 'react-icons/fa';
import '../styles/JoinUsPage.css';

const JoinUsPage = () => (
  <div className="joinus-page eco-bg">
    {/* Hero Section */}
    <section id="hero" className="joinus-hero" style={{ background: 'linear-gradient(135deg, #e0f7fa 0%, #e8f5e9 100%)', padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 className="joinus-headline">Join Us Today</h1>
      <p className="joinus-subtext">Ready to make a real impact? Sign up or login now to start recycling your e-waste and track your contribution to a greener, cleaner future!</p>
      <div className="joinus-cta" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <Link to="/register" className="btn btn-green btn-lg">Register</Link>
        <Link to="/login" className="btn btn-outline-green btn-lg">Login</Link>
      </div>
    </section>

    {/* Join the Movement Section */}
    <section id="movement" className="joinus-movement" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h2>Join the Movement Toward Cleaner Tech</h2>
      <p>Be part of the movement to give tech a second life and build a cleaner, more connected world.</p>
      <FaLeaf className="joinus-icon" style={{ fontSize: '2.5rem', color: '#43a047', margin: '1rem 0' }} />
    </section>

    {/* Why E-Waste? Why Us? Section */}
    <section id="why-rygneco" className="joinus-why" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', gap: '2rem' }}>
      <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
        <FaRecycle className="joinus-icon" style={{ fontSize: '3rem', color: '#388e3c' }} />
      </div>
      <div style={{ flex: '2 1 400px', minWidth: '280px' }}>
        <h3>Why E-Waste? Why Us?</h3>
        <p>Did you know that millions of tons of e-waste end up in landfills every year, leaking toxic materials into the earth and air? At RYGNeco, we believe that education is the first step in solving this crisis. That’s why we make it our goal to not only recycle your old electronics but also teach about the environmental harm of improper disposal and the positive change that responsible recycling can bring.</p>
      </div>
    </section>

    {/* Recycling Made Accessible Section */}
    <section id="recycling-accessible" className="joinus-accessible" style={{ padding: '3rem 1rem', background: '#f1f8e9' }}>
      <h3>Recycling Made Accessible</h3>
      <p>Whether you're cleaning out your drawers at home or handling large-scale e-waste for your business, we make it simple to get your unwanted devices to the right place...</p>
      <ul className="joinus-access-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
        <li><FaMobileAlt /> Individuals</li>
        <li><FaBuilding /> Small Businesses</li>
        <li><FaTruck /> Enterprises & Pickup Services</li>
      </ul>
    </section>

    {/* Proof That Progress Is Possible Section */}
    <section id="recycling-reports" className="joinus-progress" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
      <h3>Proof That Progress Is Possible</h3>
      <div className="joinus-stats" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
        <div className="joinus-stat-card"><FaChartBar /> <span>CO2 Saved: <strong>12,000 kg</strong></span></div>
        <div className="joinus-stat-card"><FaRecycle /> <span>Materials Recovered: <strong>8,500 kg</strong></span></div>
        <div className="joinus-stat-card"><FaTree /> <span>Trees Planted: <strong>500+</strong></span></div>
      </div>
    </section>

    {/* Partner With Us | Donate | Spread the Word Section */}
    <section id="join-options" className="joinus-options" style={{ padding: '3rem 1rem', background: '#e3f2fd' }}>
      <div className="joinus-options-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        <div className="joinus-option-card" style={{ flex: '1 1 250px', minWidth: '220px' }}>
          <h4><FaHandshake /> Partner With Us</h4>
          <p>For organizations, schools, and companies.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/schedule-pickup" className="btn btn-green">Schedule a Pickup</Link>
            <Link to="/become-partner" className="btn btn-outline-green">Become a Partner</Link>
          </div>
        </div>
        <div className="joinus-option-card" style={{ flex: '1 1 250px', minWidth: '220px' }}>
          <h4><FaGift /> Donate Your Devices</h4>
          <p>Info on accepted devices.</p>
          <Link to="/accepted-items" className="btn btn-green">View Accepted Items</Link>
        </div>
        <div className="joinus-option-card" style={{ flex: '1 1 250px', minWidth: '220px' }}>
          <h4><FaBullhorn /> Spread the Word</h4>
          <p>Social engagement, host events, and more.</p>
          <div className="joinus-social" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="#" aria-label="Facebook"><FaUsers /></a>
            <a href="#" aria-label="Twitter"><FaBullhorn /></a>
            <a href="#" aria-label="Instagram"><FaMedal /></a>
            <a href="#" aria-label="LinkedIn"><FaHandshake /></a>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section id="learn-more" className="joinus-cta-final" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h3>Want to Learn More?</h3>
      <Link to="/how-it-works" className="btn btn-green btn-lg">Learn More</Link>
    </section>

    {/* RYGNeco Offers Section */}
    <section id="recycling-offers" className="joinus-offers" style={{ padding: '3rem 1rem', background: '#fffde7' }}>
      <h3>RYGNeco Offers</h3>
      <div className="joinus-offers-cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
        <div className="joinus-offer-card"><FaMoneyBillWave /> <span>Unlock Tax Breaks</span></div>
        <div className="joinus-offer-card"><FaRecycle /> <span>Turn E-Waste into Cash</span></div>
        <div className="joinus-offer-card"><FaMedal /> <span>Earn Rewards for Referrals</span></div>
        <div className="joinus-offer-card"><FaGift /> <span>Win Challenges</span></div>
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
        <a href="#" aria-label="Facebook"><FaUsers /></a>
        <a href="#" aria-label="Twitter"><FaBullhorn /></a>
        <a href="#" aria-label="Instagram"><FaMedal /></a>
        <a href="#" aria-label="LinkedIn"><FaHandshake /></a>
      </div>
      <div className="footer-info">
        <span>© {new Date().getFullYear()} RYGNeco. All rights reserved.</span>
        <span className="footer-tagline">Empowering responsible e-waste recycling for a cleaner, greener future.</span>
      </div>
    </footer>
  </div>
);

export default JoinUsPage;
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaCheck,
  FaRecycle,
  FaUsers,
  FaBuilding,
  FaGraduationCap,
  FaChartLine,
  FaShieldAlt,
  FaLeaf
} from 'react-icons/fa';

const JoinUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const userTypes = [
    {
      icon: FaUsers,
      title: "Individuals",
      description: "Recycle your personal devices and track your environmental impact",
      features: ["Free account", "Impact tracking", "Reward points", "Easy scheduling"],
      cta: "Start for free",
      link: "/register",
      popular: false
    },
    {
      icon: FaBuilding,
      title: "Businesses",
      description: "Enterprise-grade e-waste solutions with compliance reporting",
      features: ["Bulk processing", "Data destruction", "Compliance reports", "Dedicated support"],
      cta: "Contact sales",
      link: "/contact",
      popular: true
    },
    {
      icon: FaGraduationCap,
      title: "Educational",
      description: "Special programs for schools and educational institutions",
      features: ["Educational resources", "Community events", "Student programs", "Group discounts"],
      cta: "Learn more",
      link: "/education",
      popular: false
    }
  ];

  const stats = [
    { value: "50,000+", label: "Devices recycled" },
    { value: "12,000kg", label: "CO₂ emissions saved" },
    { value: "95%", label: "Material recovery rate" },
    { value: "500+", label: "Partner organizations" }
  ];

  const benefits = [
    {
      icon: FaRecycle,
      title: "Responsible recycling",
      description: "Every device is processed according to the highest environmental standards"
    },
    {
      icon: FaShieldAlt,
      title: "Secure data destruction",
      description: "Your sensitive information is completely and securely wiped from all devices"
    },
    {
      icon: FaChartLine,
      title: "Impact transparency",
      description: "Track your environmental contribution with detailed reporting and analytics"
    },
    {
      icon: FaLeaf,
      title: "Carbon neutral process",
      description: "Our entire recycling process is carbon neutral and certified sustainable"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-8 border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Join the movement
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight leading-none">
              Turn e-waste into
              <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                environmental impact
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of individuals and organizations making a difference through responsible e-waste recycling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/register"
                className="group bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 flex items-center gap-2"
              >
                Get started free
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link 
                to="/how-it-works"
                className="text-gray-600 hover:text-gray-900 px-8 py-4 font-medium transition-colors duration-200"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="px-4 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Choose your path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're an individual or organization, we have the right solution for your e-waste needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <div 
                key={index} 
                className={`relative bg-white border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 ${
                  type.popular ? 'border-green-200 shadow-md' : 'border-gray-200'
                }`}
              >
                {type.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{type.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{type.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-600">
                      <FaCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={type.link}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    type.popular 
                      ? 'bg-gray-900 text-white hover:bg-gray-800' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {type.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Why choose RYGNeco
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to making e-waste recycling simple, secure, and sustainable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <benefit.icon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
            Ready to make an impact?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join our community and start turning your e-waste into positive environmental change today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/register"
              className="group bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 flex items-center gap-2"
            >
              Create free account
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link 
              to="/contact"
              className="text-gray-600 hover:text-gray-900 px-8 py-4 font-medium transition-colors duration-200"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUsPage;
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
