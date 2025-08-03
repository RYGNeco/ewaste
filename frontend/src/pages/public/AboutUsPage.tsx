import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaBoxOpen, 
  FaWrench, 
  FaChartBar, 
  FaBrain, 
  FaTruck, 
  FaRecycle, 
  FaCheckCircle, 
  FaSeedling, 
  FaHandshake, 
  FaLightbulb, 
  FaShieldAlt, 
  FaArrowRight,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaPlay,
  FaAward,
  FaUsers,
  FaGlobe,
  FaHeart,
  FaStar,
  FaQuoteLeft,
  FaArrowUp
} from "react-icons/fa";
import aboutHeroBg from "../../assets/about-hero-bg.jpg";

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "50K+", label: "Devices Recycled", icon: FaRecycle },
    { number: "100+", label: "Business Partners", icon: FaHandshake },
    { number: "25K+", label: "Lives Impacted", icon: FaUsers },
    { number: "95%", label: "Satisfaction Rate", icon: FaStar }
  ];

  const values = [
    {
      icon: FaHeart,
      title: "Passion for Sustainability",
      description: "We're driven by a deep commitment to environmental stewardship and creating lasting positive impact.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: FaShieldAlt,
      title: "Trust & Transparency",
      description: "Every step of our process is transparent, ensuring you know exactly how your e-waste is handled.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaLightbulb,
      title: "Innovation First",
      description: "We constantly push boundaries to find better, more efficient ways to manage electronic waste.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: FaGlobe,
      title: "Global Impact",
      description: "Our local actions create global change, contributing to a cleaner planet for future generations.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-blue-900/80 to-purple-900/80 z-10"></div>
        <img 
          src={aboutHeroBg}
          alt="E-waste sustainability banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <FaRecycle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-medium">Leading E-Waste Solutions</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Transforming
              </span>
              <br />
              <span className="text-white">E-Waste into</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Opportunity
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              We're not just recycling electronics—we're building a sustainable future where every device gets a second chance to make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-blue-500 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10 flex items-center gap-3">
                  Watch Our Story
                  <FaPlay className="w-4 h-4" />
                </span>
              </button>
              <a 
                href="#our-story"
                className="group relative overflow-hidden border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Our Story
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-4 h-4 bg-green-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <div className="w-6 h-6 bg-blue-400 rounded-full opacity-40"></div>
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-1000">
          <div className="w-3 h-3 bg-purple-400 rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <FaStar className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Meet Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visionary leaders driving innovation in sustainable e-waste solutions
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* CEO Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src="/leila-meyer-headshot.jpg" 
                        alt="Leila Meyer" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <FaSeedling className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      <FaAward className="w-4 h-4" />
                      CEO & Founder
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-3">Leila Meyer</h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      A passionate entrepreneur with a multidisciplinary background spanning Architecture, Construction, Education, Interior Design, and Marketing. Leila brings a unique holistic perspective to sustainability and circular design.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['Architecture', 'Sustainability', 'Innovation', 'Leadership'].map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 justify-center lg:justify-start">
                      <a href="#" className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        <FaTwitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CSO Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center">
                        <FaHandshake className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                        <p className="text-blue-600 font-semibold">Photo Coming Soon</p>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <FaHandshake className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      <FaAward className="w-4 h-4" />
                      CSO & Co-Founder
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-3">Sama Mushtaq</h3>
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <FaLightbulb className="w-6 h-6 text-yellow-600" />
                        <h4 className="font-bold text-yellow-800">Bio Coming Soon</h4>
                      </div>
                      <p className="text-yellow-700 text-sm leading-relaxed">
                        With a rich background in sustainable development and a passion for technology's role in creating a circular economy, Sama's expertise is central to our mission. We look forward to sharing more about their journey and vision for a greener planet.
                      </p>
                    </div>
                    <div className="flex gap-4 justify-center lg:justify-start">
                      <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                        <FaTwitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every action we take
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-full group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              What We <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Do</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive e-waste solutions that make a real difference in our world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: FaBoxOpen, 
                title: "Smart Collection", 
                description: "Efficient, technology-driven collection and logistics for all types of electronic waste",
                gradient: "from-green-500 to-emerald-500",
                features: ["GPS Tracking", "Scheduled Pickups", "Real-time Updates"]
              },
              { 
                icon: FaWrench, 
                title: "Device Revival", 
                description: "Expert refurbishment and restoration giving electronics a second life",
                gradient: "from-blue-500 to-cyan-500",
                features: ["Quality Testing", "Data Security", "Warranty Included"]
              },
              { 
                icon: FaChartBar, 
                title: "Impact Analytics", 
                description: "Detailed reporting on your environmental contribution and sustainability metrics",
                gradient: "from-purple-500 to-pink-500",
                features: ["Real-time Dashboards", "Carbon Footprint", "Progress Tracking"]
              },
              { 
                icon: FaBrain, 
                title: "Education Hub", 
                description: "Empowering communities with knowledge and skills for sustainable living",
                gradient: "from-orange-500 to-red-500",
                features: ["Workshops", "Online Courses", "Community Events"]
              },
              { 
                icon: FaTruck, 
                title: "Business Solutions", 
                description: "Comprehensive e-waste management services for organizations of all sizes",
                gradient: "from-indigo-500 to-purple-500",
                features: ["Bulk Collection", "Compliance Support", "Custom Solutions"]
              },
              { 
                icon: FaRecycle, 
                title: "Certified Recycling", 
                description: "Responsible disposal with full environmental compliance and transparency",
                gradient: "from-teal-500 to-green-500",
                features: ["Certified Process", "Environmental Compliance", "Full Traceability"]
              }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-full group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Ready to Make a <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Difference</span>?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto">
              Join thousands of organizations already making a positive impact on our planet through responsible e-waste management.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/join-us" 
                className="group relative overflow-hidden bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Journey
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                to="/how-it-works" 
                className="group relative overflow-hidden border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Learn How It Works
                  <FaPlay className="w-4 h-4" />
                </span>
              </Link>
              <a 
                href="tel:+1234567890" 
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-blue-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Call Us Now
                  <FaArrowRight className="w-5 h-5" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
      >
        <FaArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default AboutUsPage;
