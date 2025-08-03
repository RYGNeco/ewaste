import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRecycle, 
  FaLeaf, 
  FaGlobe, 
  FaChartLine, 
  FaUsers, 
  FaShieldAlt,
  FaArrowRight,
  FaCheck,
  FaPlay,
  FaStar,
  FaQuoteLeft,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaCalendar
} from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '50K+', label: 'Devices Recycled', icon: FaRecycle },
    { number: '100+', label: 'Partner Companies', icon: FaUsers },
    { number: '95%', label: 'Recovery Rate', icon: FaChartLine },
    { number: '24/7', label: 'Support Available', icon: FaShieldAlt }
  ];

  const features = [
    {
      icon: FaRecycle,
      title: 'Smart Recycling',
      description: 'Advanced sorting technology ensures maximum material recovery and environmental impact.',
      color: 'text-green-600'
    },
    {
      icon: FaLeaf,
      title: 'Eco-Friendly',
      description: 'Zero-waste process that protects the environment and reduces carbon footprint.',
      color: 'text-green-600'
    },
    {
      icon: FaGlobe,
      title: 'Global Impact',
      description: 'Contributing to a sustainable future through responsible e-waste management.',
      color: 'text-green-600'
    }
  ];

  const services = [
    {
      title: 'Corporate Pickup',
      description: 'Scheduled collection services for businesses with large e-waste volumes.',
      icon: FaUsers,
      features: ['Free consultation', 'Flexible scheduling', 'Volume discounts']
    },
    {
      title: 'Data Security',
      description: 'Complete data destruction ensuring your sensitive information remains protected.',
      icon: FaShieldAlt,
      features: ['Certified destruction', 'Audit trails', 'Compliance reports']
    },
    {
      title: 'Asset Recovery',
      description: 'Maximize value from your old electronics through our recovery programs.',
      icon: FaChartLine,
      features: ['Value assessment', 'Market analysis', 'Revenue sharing']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'IT Director',
      company: 'TechCorp Solutions',
      content: 'RYGNeco transformed our e-waste management. Their professional service and environmental commitment exceeded our expectations.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Operations Manager',
      company: 'GreenTech Industries',
      content: 'The data security and compliance features give us peace of mind. Highly recommended for any business.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Sustainability Officer',
      company: 'EcoForward Inc',
      content: 'Outstanding environmental impact and transparent reporting. They truly walk the talk on sustainability.',
      rating: 5
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Schedule Pickup',
      description: 'Book your e-waste collection through our easy online platform or mobile app.',
      icon: FaCalendar
    },
    {
      step: '02',
      title: 'Secure Collection',
      description: 'Our certified team collects your devices with proper documentation and tracking.',
      icon: FaShieldAlt
    },
    {
      step: '03',
      title: 'Smart Processing',
      description: 'Advanced sorting and processing ensures maximum material recovery and value.',
      icon: FaRecycle
    },
    {
      step: '04',
      title: 'Complete Report',
      description: 'Receive detailed reports on environmental impact and data destruction certification.',
      icon: FaChartLine
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      
      <div className="pt-16 pb-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <FaLeaf className="text-green-600" />
                  Leading E-Waste Recycling Solutions
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  Transform Your
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> E-Waste</span>
                  <br />
                  Into Opportunity
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Professional e-waste recycling services that protect the environment, 
                  secure your data, and maximize value recovery for your business.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link 
                    to="/register" 
                    className="btn btn-primary btn-xl flex items-center gap-2 group"
                  >
                    Get Started Today
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="btn btn-secondary btn-xl flex items-center gap-2">
                    <FaPlay className="text-sm" />
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4 group-hover:bg-green-200 transition-colors">
                    <stat.icon className="text-2xl text-green-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose RYGNeco?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine cutting-edge technology with environmental responsibility 
                to deliver the best e-waste recycling experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card p-8 text-center group hover:scale-105 transition-transform">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6 group-hover:bg-green-200 transition-colors">
                    <feature.icon className={`text-2xl ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive e-waste solutions tailored to your business needs.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="card p-8 group hover:shadow-xl transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6 group-hover:bg-green-200 transition-colors">
                    <service.icon className="text-2xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheck className="text-green-500 text-xs" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple, secure, and sustainable e-waste recycling process.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 z-0"></div>
                  )}
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full text-xl font-bold mb-6">
                      {step.step}
                    </div>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                      <step.icon className="text-xl text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Trusted by leading companies across industries.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <FaQuoteLeft className="text-3xl text-green-200 mb-4" />
                  <p className="text-gray-600 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your E-Waste Journey?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already making a positive environmental impact 
              while securing their data and maximizing value recovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn bg-white text-green-600 hover:bg-gray-100 btn-xl">
                Get Started Free
              </Link>
              <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-green-600 btn-xl">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Trusted By Industry Leaders</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {/* Placeholder for company logos */}
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 font-semibold">Logo {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      
    </div>
  );
};

export default HomePage;
