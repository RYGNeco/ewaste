import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTruck, FaShieldAlt, FaDollarSign, FaRecycle } from 'react-icons/fa';

const ServicesDropdown: React.FC = () => {
  const serviceItems = [
    {
      title: 'Corporate Pickup',
      href: '/services/corporate-pickup',
      icon: FaTruck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Data Destruction',
      href: '/services/data-destruction',
      icon: FaShieldAlt,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Asset Recovery',
      href: '/services/asset-recovery',
      icon: FaDollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Recycling Process',
      href: '/services/recycling-process',
      icon: FaRecycle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100 z-50">
      <div className="p-3">
        <div className="space-y-1">
          {serviceItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group/item"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bgColor} group-hover/item:scale-110 transition-transform`}>
                <item.icon className={`text-sm ${item.color}`} />
              </div>
              <span className="font-medium text-gray-900 group-hover/item:text-green-600 transition-colors text-sm">
                {item.title}
              </span>
              <FaArrowRight className="text-gray-400 group-hover/item:text-green-600 group-hover/item:translate-x-1 transition-all ml-auto text-xs" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesDropdown; 