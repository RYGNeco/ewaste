import React from 'react';
import { FaRecycle, FaTruck, FaTools, FaChartLine, FaBuilding, FaGraduationCap } from 'react-icons/fa';

const ServicesPage = () => {
  const services = [
    {
      icon: FaRecycle,
      title: "E-Waste Collection",
      description: "[Placeholder] Comprehensive collection services for all types of electronic waste",
      features: ["Scheduled Pickups", "Secure Handling", "Real-time Tracking"]
    },
    {
      icon: FaTools,
      title: "Device Refurbishment",
      description: "[Placeholder] Professional restoration of electronic devices",
      features: ["Quality Testing", "Parts Replacement", "Performance Optimization"]
    },
    {
      icon: FaChartLine,
      title: "Data Analytics",
      description: "[Placeholder] Advanced tracking and reporting of e-waste metrics",
      features: ["Custom Dashboards", "Environmental Impact", "Compliance Reports"]
    },
    {
      icon: FaBuilding,
      title: "Corporate Solutions",
      description: "[Placeholder] Tailored e-waste management for businesses",
      features: ["Bulk Collection", "Asset Management", "Compliance Support"]
    },
    {
      icon: FaGraduationCap,
      title: "Education Programs",
      description: "[Placeholder] Training and awareness programs",
      features: ["Workshops", "Online Courses", "Certification"]
    },
    {
      icon: FaTruck,
      title: "Logistics Support",
      description: "[Placeholder] End-to-end transportation solutions",
      features: ["Route Optimization", "GPS Tracking", "Delivery Confirmation"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Wireframe Style */}
      <section className="pt-20 pb-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-2 bg-gray-100 rounded-lg mb-6">
              <FaRecycle className="text-gray-500 text-2xl" />
            </div>
            <h1 className="text-4xl font-bold mb-6">
              [Wireframe] Our Services
            </h1>
            <div className="h-4 bg-gray-200 w-3/4 mx-auto mb-8 rounded"></div>
            <div className="h-3 bg-gray-200 w-2/3 mx-auto rounded"></div>
          </div>
        </div>
      </section>

      {/* Services Grid - Wireframe Style */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <service.icon className="text-gray-500 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                    <div className="h-2 bg-gray-200 w-full rounded mb-4"></div>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="h-2 bg-gray-100 w-5/6 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow - Wireframe Style */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">[Wireframe] Our Process</h2>
            <div className="h-3 bg-gray-200 w-1/2 mx-auto rounded"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-gray-500 font-semibold">{step}</span>
                  </div>
                  <div className="h-2 bg-gray-200 w-24 rounded mb-2"></div>
                  <div className="h-2 bg-gray-200 w-20 rounded"></div>
                </div>
              ))}
            </div>
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
          </div>
        </div>
      </section>

      {/* CTA Section - Wireframe Style */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">[Wireframe] Ready to Get Started?</h2>
            <div className="h-3 bg-gray-200 w-2/3 mx-auto rounded mb-8"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-12 w-40 bg-gray-200 rounded-lg"></div>
              <div className="h-12 w-40 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
