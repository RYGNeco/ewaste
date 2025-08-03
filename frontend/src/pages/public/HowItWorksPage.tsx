import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck, FaTruck, FaLock, FaSyncAlt, FaRegSmileBeam,
  FaDesktop, FaTabletAlt, FaMobileAlt, FaTv, FaNetworkWired, FaKeyboard, FaPlug, FaMicrophone, FaSearch, FaChevronDown, FaChevronUp, FaCertificate, FaChartBar, FaFileAlt, FaWeight, FaLeaf, FaClipboardList
} from 'react-icons/fa';

const deviceCategories = [
  {
    title: 'Computers',
    icon: <FaDesktop />,
    items: ['Desktop Computers', 'Servers', 'Tablets', 'Monitors']
  },
  {
    title: 'Mobile Devices',
    icon: <FaMobileAlt />,
    items: ['Smartphones', 'Cell Phones', 'PDAs']
  },
  {
    title: 'Office Equipment',
    icon: <FaTabletAlt />,
    items: ['Printers', 'Scanners', 'Copiers', 'Fax Machines']
  },
  {
    title: 'Entertainment',
    icon: <FaTv />,
    items: ['TVs', 'Game Consoles', 'DVD Players', 'Audio Equipment']
  },
  {
    title: 'Networking',
    icon: <FaNetworkWired />,
    items: ['Routers', 'Switches', 'Modems']
  },
  {
    title: 'Peripherals',
    icon: <FaKeyboard />,
    items: ['Keyboards', 'Mice', 'Webcams', 'Speakers']
  },
  {
    title: 'Power Equipment',
    icon: <FaPlug />,
    items: ['UPS', 'Power Strips', 'Chargers']
  },
  {
    title: 'Cables and Mics',
    icon: <FaMicrophone />,
    items: ['Cables', 'Microphones', 'Adapters']
  }
];

const faqList = [
  {
    q: 'What types of electronics do you accept?',
    a: 'We accept a wide range of electronics including computers, mobile devices, office equipment, entertainment systems, networking gear, peripherals, power equipment, and more.'
  },
  {
    q: 'What happens to my old electronics?',
    a: 'Devices are either refurbished for reuse, responsibly recycled for materials, or handled as hazardous waste if needed.'
  },
  {
    q: 'How do you handle data security?',
    a: 'All data is securely wiped from devices following industry standards. We provide a Data Destruction Certificate for your records.'
  },
  {
    q: 'Do you offer pickup services?',
    a: 'Yes, you can schedule a pickup through our online form. Our team will collect your devices at the scheduled time.'
  },
  {
    q: 'Where and when are your next collection events?',
    a: 'Check our Events page for upcoming collection events and locations.'
  },
  {
    q: 'Can businesses recycle with RYGNeco?',
    a: 'Absolutely! We offer tailored solutions for businesses, including scheduled pickups and compliance documentation.'
  }
];

const reportsList = [
  { title: 'Certificate of Recycling', icon: <FaCertificate /> },
  { title: 'Data Destruction Certificate', icon: <FaLock /> },
  { title: 'Asset Tracking Report', icon: <FaClipboardList /> },
  { title: 'Weight Summary', icon: <FaWeight /> },
  { title: 'Environmental Impact Report', icon: <FaLeaf /> },
  { title: 'Chain of Custody', icon: <FaChartBar /> }
];

const HowItWorksPage = () => {
  const [search, setSearch] = useState<string>('');
  type SearchResult = { type: 'accepted' | 'related' | 'notfound'; item?: string } | null;
  const [searchResult, setSearchResult] = useState<SearchResult>(null);
  const [expandedCat, setExpandedCat] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<boolean[]>(Array(faqList.length).fill(false));

  // Search logic (simple match + synonym)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    let found = null;
    
    if (val.toLowerCase().includes('laptop') || val.toLowerCase().includes('computer')) {
      found = { type: 'accepted' as const, item: val };
    } else if (val.toLowerCase().includes('phone') || val.toLowerCase().includes('mobile')) {
      found = { type: 'related' as const, item: val };
    }
    
    if (found) setSearchResult(found);
    else if (val) setSearchResult({ type: 'notfound' });
    else setSearchResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      
      {/* Hero Section */}
      <section className="py-8 px-4" aria-label="E-waste recycling illustration">
        <div className="max-w-6xl mx-auto">
          <img 
            src="/illustrative-diagram-electrical-waste-recycling-process-step-223221443.jpg" 
            alt="Illustration of e-waste recycling process" 
            className="w-full max-h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Our Process */}
      <section id="our-process" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Process</h2>
          <p className="text-xl text-gray-600 mb-12">
            From collection to refurbishment, reuse to responsible recycling, our process is designed with purpose. We make it easy, transparent, and impactful—so you can be part of the solution, every step of the way.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
              <FaCalendarCheck className="text-4xl text-green-600 mx-auto mb-4" />
              <span className="font-semibold text-gray-900">Schedule: Schedule a pickup for your e-waste through our easy online form.</span>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
              <FaTruck className="text-4xl text-green-600 mx-auto mb-4" />
              <span className="font-semibold text-gray-900">Collect: Our team collects your devices from your location at the scheduled time.</span>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
              <FaLock className="text-4xl text-green-600 mx-auto mb-4" />
              <span className="font-semibold text-gray-900">Secure: All data is securely wiped from all devices following industry standards.</span>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
              <FaSyncAlt className="text-4xl text-green-600 mx-auto mb-4" />
              <span className="font-semibold text-gray-900">Process: Devices are refreshed, repurposed, or responsibly recycled.</span>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
              <FaRegSmileBeam className="text-4xl text-green-600 mx-auto mb-4" />
              <span className="font-semibold text-gray-900">Impact: Receive detailed reports on your environmental impact and data security.</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Items We Accept */}
      <section id="items-we-accept" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">What Items We Accept</h2>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Aren't sure if you can turn in a specific item? Use our search tool below to look up specific items!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 text-center">
            <span className="text-gray-700">
              Email: <a href="mailto:info@rygneco.com" className="text-green-600 hover:text-green-700">info@rygneco.com</a>
            </span>
            <span className="text-gray-700">
              Phone: <a href="tel:+161679gneco" className="text-green-600 hover:text-green-700">+1 (616)-RYGNECO</a>
            </span>
          </div>
          
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={search} 
                onChange={handleSearch} 
                placeholder="Search for an item..." 
                aria-label="Search for an item"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {searchResult && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-white rounded-lg border border-gray-200">
              {searchResult.type === 'accepted' && <span className="text-green-600 font-semibold">✅ "{searchResult.item}" — Accepted</span>}
              {searchResult.type === 'related' && <span className="text-blue-600">Did you mean...<br />✅ "Laptops" — Accepted</span>}
              {searchResult.type === 'notfound' && <span className="text-red-600">We currently do not accept this item for recycling.</span>}
              <Link to="#items-we-accept" className="block mt-2 text-green-600 hover:text-green-700">See all accepted Small Household Electronics →</Link>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {deviceCategories.map((cat, idx) => (
              <div key={cat.title} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button 
                  className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between font-semibold text-gray-900"
                  onClick={() => setExpandedCat(expandedCat === idx ? null : idx)} 
                  aria-expanded={expandedCat === idx} 
                  aria-controls={`cat-panel-${idx}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-green-600">{cat.icon}</span>
                    {cat.title}
                  </span>
                  {expandedCat === idx ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedCat === idx && (
                  <div id={`cat-panel-${idx}`} className="p-4 bg-white">
                    <ul className="space-y-2">
                      {cat.items.map(item => <li key={item} className="text-gray-700">{item}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sorting Section */}
      <section id="sorting" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">How Do We Sort Your E-Waste?</h2>
          <p className="text-xl text-gray-600 mb-8 text-center">
            At RYGNeco, we sort your e-waste into three categories described in the table below.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="border border-gray-300 p-4 text-left font-semibold">Category</th>
                  <th className="border border-gray-300 p-4 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-4 font-semibold text-gray-900">Refurbishable</td>
                  <td className="border border-gray-300 p-4 text-gray-700">Devices that can be repaired, reused, or donated</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-4 font-semibold text-gray-900">Recyclable</td>
                  <td className="border border-gray-300 p-4 text-gray-700">Broken/non-working devices that can be dismantled for materials</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-4 font-semibold text-gray-900">Hazardous</td>
                  <td className="border border-gray-300 p-4 text-gray-700">Items requiring special handling (e.g., batteries, old monitors)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section id="reports" className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Recycling Reports You Can Rely On</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportsList.map(report => (
              <div key={report.title} className="bg-white p-6 rounded-lg border border-gray-200 text-center shadow-md">
                <div className="text-4xl text-green-600 mb-4">{report.icon}</div>
                <span className="font-semibold text-gray-900">{report.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqList.map((faq, idx) => (
              <div key={faq.q} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <button 
                  className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between font-semibold text-gray-900"
                  aria-expanded={faqOpen[idx]} 
                  aria-controls={`faq-panel-${idx}`} 
                  onClick={() => setFaqOpen(faqOpen.map((open, i) => i === idx ? !open : open))}
                >
                  <span>{faq.q}</span>
                  {faqOpen[idx] ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {faqOpen[idx] && (
                  <div id={`faq-panel-${idx}`} className="p-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
