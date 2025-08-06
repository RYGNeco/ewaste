import React, { useState } from 'react';
import { 
<<<<<<< HEAD
  FaRecycle, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaArrowRight, 
=======
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaArrowRight,
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
  FaCheck,
  FaUser,
  FaBuilding,
  FaComments,
<<<<<<< HEAD
  FaShieldAlt,
  FaLeaf,
  FaGlobe,
  FaStar
} from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
=======
  FaHeadset,
  FaQuestionCircle,
  FaLightbulb
} from 'react-icons/fa';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiry: '',
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
<<<<<<< HEAD
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
=======
        name: '',
        email: '',
        company: '',
        inquiry: '',
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
        message: ''
      });
    }, 3000);
  };

<<<<<<< HEAD
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      details: '123 Green Street, Eco City, EC 12345',
      description: 'Our main office and processing facility'
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Available Mon-Fri, 8AM-6PM EST'
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: 'hello@rygneco.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: 'Mon-Fri: 8AM-6PM EST',
      description: 'Emergency support available 24/7'
    }
  ];

  const subjects = [
    'General Inquiry',
    'Partnership Opportunity',
    'Service Quote',
    'Technical Support',
    'Compliance Questions',
    'Data Security',
    'Other'
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: 'Secure & Compliant',
      description: 'Certified data destruction and environmental compliance'
    },
    {
      icon: FaLeaf,
      title: 'Eco-Friendly',
      description: 'Zero-waste process with maximum material recovery'
    },
    {
      icon: FaGlobe,
      title: 'Global Impact',
      description: 'Contributing to a sustainable future worldwide'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'IT Director',
      company: 'TechCorp Solutions',
      content: 'RYGNeco\'s professional service and environmental commitment exceeded our expectations.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Operations Manager',
      company: 'GreenTech Industries',
      content: 'The data security and compliance features give us peace of mind.',
      rating: 5
=======
  const contactMethods = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'hello@rygneco.com',
      description: 'Best for detailed inquiries',
      action: 'mailto:hello@rygneco.com'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9AM-6PM EST',
      action: 'tel:+15551234567'
    },
    {
      icon: FaComments,
      title: 'Live Chat',
      value: 'Available now',
      description: 'Instant support online',
      action: '#'
    }
  ];

  const inquiryTypes = [
    'Schedule a pickup',
    'Get a quote',
    'Partnership inquiry',
    'Technical support',
    'Data security questions',
    'Compliance information',
    'General question'
  ];

  const supportTopics = [
    {
      icon: FaHeadset,
      title: 'Customer Support',
      description: 'Get help with your account, scheduling, or services',
      action: 'Open support ticket'
    },
    {
      icon: FaQuestionCircle,
      title: 'FAQ',
      description: 'Find answers to commonly asked questions',
      action: 'Browse FAQ'
    },
    {
      icon: FaLightbulb,
      title: 'Feature Request',
      description: 'Suggest improvements or new features',
      action: 'Submit idea'
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
    }
  ];

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FaRecycle className="text-green-600" />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Let's Start Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> E-Waste Journey</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Ready to make a positive environmental impact? Our team is here to help you 
              implement sustainable e-waste solutions for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="card p-6 text-center group hover:shadow-xl transition-all">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4 group-hover:bg-green-200 transition-colors">
                  <info.icon className="text-2xl text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-600 font-medium mb-2">{info.details}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <FaCheck className="text-2xl text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">
                        First Name *
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="form-input pl-10"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">
                        Last Name *
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="form-input pl-10"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address *
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-input pl-10"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input pl-10"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company" className="form-label">
                      Company Name
                    </label>
                    <div className="relative">
                      <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
=======
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Get in touch
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Have a question about our services? Need help getting started? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
        

          {/* Main Contact Form */}
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a message</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message sent!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-900 mb-2">
                        Company
                      </label>
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
<<<<<<< HEAD
                        className="form-input pl-10"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="form-input resize-none"
                      placeholder="Tell us about your e-waste recycling needs..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-primary btn-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FaArrowRight />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info & Features */}
            <div className="space-y-8">
              {/* Why Choose Us */}
              <div className="card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose RYGNeco?</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="text-xl text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">What Our Clients Say</h3>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-sm" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm mb-2 italic">
                        "{testimonial.content}"
                      </p>
                      <div className="text-sm">
                        <span className="font-semibold text-gray-900">{testimonial.name}</span>
                        <span className="text-gray-500"> - {testimonial.role}, {testimonial.company}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Find Us</h3>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-3xl text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive Map</p>
                    <p className="text-sm text-gray-400">123 Green Street, Eco City, EC 12345</p>
                  </div>
                </div>
=======
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry" className="block text-sm font-medium text-gray-900 mb-2">
                        What can we help you with? *
                      </label>
                      <select
                        id="inquiry"
                        name="inquiry"
                        value={formData.inquiry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        required
                      >
                        <option value="">Select an option</option>
                        {inquiryTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us more about your needs..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <FaArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Office Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Visit our office</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p>123 Green Street</p>
                        <p>Eco City, EC 12345</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaClock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <p>Monday - Friday, 9AM - 6PM EST</p>
                    </div>
                  </div>
                </div>

                {/* Support Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Other ways to get help</h3>
                  <div className="space-y-4">
                    {supportTopics.map((topic, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                          <topic.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{topic.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
                          <button className="text-sm text-gray-900 hover:text-gray-700 font-medium">
                            {topic.action} →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Quick response guaranteed</h4>
                  <p className="text-sm text-gray-600">
                    We typically respond to all inquiries within 24 hours during business days. 
                    For urgent matters, please call us directly.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Contact Methods - Integrated Design */}
          <div className="mt-16 mb-20">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Other ways to reach us</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Prefer a different way to connect? We're here to help.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    className="group flex-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <method.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-900 font-medium mb-2 text-sm md:text-base">{method.value}</p>
                    <p className="text-gray-500 text-xs md:text-sm">{method.description}</p>
                  </a>
                ))}
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
              </div>
            </div>
          </div>
        </div>
      </section>
<<<<<<< HEAD

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already making a positive environmental impact 
            with our e-waste recycling solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="btn bg-white text-green-600 hover:bg-gray-100 btn-xl">
              Start Recycling Today
            </a>
            <a href="/how-it-works" className="btn btn-outline border-white text-white hover:bg-white hover:text-green-600 btn-xl">
              Learn How It Works
            </a>
          </div>
        </div>
      </section>

      <Footer />
=======
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
    </div>
  );
};

<<<<<<< HEAD
export default ContactPage;
=======
export default ContactPage;
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
