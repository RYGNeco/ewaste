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
  FaLeaf,
  FaHandshake
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
