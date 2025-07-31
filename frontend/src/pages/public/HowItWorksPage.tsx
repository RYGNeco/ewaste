import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck, FaTruck, FaLock, FaSyncAlt, FaRegSmileBeam,
  FaDesktop, FaTabletAlt, FaMobileAlt, FaTv, FaNetworkWired, FaKeyboard, FaPlug, FaMicrophone, FaSearch, FaChevronDown, FaChevronUp, FaCertificate, FaChartBar, FaFileAlt, FaWeight, FaLeaf, FaClipboardList
} from 'react-icons/fa';
import '../styles/HowItWorksPage.css';

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
    let related = null;
    deviceCategories.forEach(cat => {
      cat.items.forEach(item => {
        if (item.toLowerCase().includes(val.toLowerCase())) found = item;
        // Synonym match
        if (val.toLowerCase() === 'macbook' && item.toLowerCase().includes('laptop')) related = item;
      });
    });
    if (found) setSearchResult({ type: 'accepted', item: found });
    else if (related) setSearchResult({ type: 'related', item: related });
    else if (val) setSearchResult({ type: 'notfound' });
    else setSearchResult(null);
  };

  return (
    <div className="howitworks-page eco-bg">
      {/* Hero Section */}
      <section className="howitworks-hero" aria-label="E-waste recycling illustration">
        <img src="/illustrative-diagram-electrical-waste-recycling-process-step-223221443.jpg" alt="Illustration of e-waste recycling process" style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '1rem' }} />
      </section>

      {/* Our Process */}
      <section id="our-process" className="howitworks-process">
        <h2>Our Process</h2>
        <p>From collection to refurbishment, reuse to responsible recycling, our process is designed with purpose. We make it easy, transparent, and impactful—so you can be part of the solution, every step of the way.</p>
        <div className="howitworks-steps">
          <div className="howitworks-step"><FaCalendarCheck /> <span>Schedule: Schedule a pickup for your e-waste through our easy online form.</span></div>
          <div className="howitworks-step"><FaTruck /> <span>Collect: Our team collects your devices from your location at the scheduled time.</span></div>
          <div className="howitworks-step"><FaLock /> <span>Secure: All data is securely wiped from all devices following industry standards.</span></div>
          <div className="howitworks-step"><FaSyncAlt /> <span>Process: Devices are refreshed, repurposed, or responsibly recycled.</span></div>
          <div className="howitworks-step"><FaRegSmileBeam /> <span>Impact: Receive detailed reports on your environmental impact and data security.</span></div>
        </div>
      </section>

      {/* What Items We Accept */}
      <section id="items-we-accept" className="howitworks-items">
        <h2>What Items We Accept</h2>
        <p>Aren’t sure if you can turn in a specific item? Use our search tool below to look up specific items!</p>
        <div className="howitworks-contact">
          <span>Email: <a href="mailto:info@rygneco.com">info@rygneco.com</a></span>
          <span>Phone: <a href="tel:+161679gneco">+1 (616)-RYGNECO</a></span>
        </div>
        <div className="howitworks-searchbar">
          <FaSearch />
          <input type="text" value={search} onChange={handleSearch} placeholder="Search for an item..." aria-label="Search for an item" />
        </div>
          {searchResult && (
            <div className="howitworks-search-result">
              {searchResult.type === 'accepted' && <span>✅ "{searchResult.item}" — Accepted</span>}
              {searchResult.type === 'related' && <span>Did you mean...<br />✅ "Laptops" — Accepted</span>}
              {searchResult.type === 'notfound' && <span>We currently do not accept this item for recycling.</span>}
              <Link to="#items-we-accept">See all accepted Small Household Electronics →</Link>
            </div>
          )}
        <div className="howitworks-categories">
          {deviceCategories.map((cat, idx) => (
            <div key={cat.title} className="howitworks-category">
              <button className="howitworks-category-btn" onClick={() => setExpandedCat(expandedCat === idx ? null : idx)} aria-expanded={expandedCat === idx} aria-controls={`cat-panel-${idx}`}>
                {cat.icon} {cat.title} {expandedCat === idx ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {expandedCat === idx && (
                <div id={`cat-panel-${idx}`} className="howitworks-category-panel">
                  <ul>
                    {cat.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sorting Section */}
      <section id="sorting" className="howitworks-sorting">
        <h2>How Do We Sort Your E-Waste?</h2>
        <p>At RYGNeco, we sort your e-waste into three categories described in the table below.</p>
        <table className="howitworks-table">
          <thead>
            <tr><th>Category</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>Refurbishable</td><td>Devices that can be repaired, reused, or donated</td></tr>
            <tr><td>Recyclable</td><td>Broken/non-working devices that can be dismantled for materials</td></tr>
            <tr><td>Hazardous</td><td>Items requiring special handling (e.g., batteries, old monitors)</td></tr>
          </tbody>
        </table>
      </section>

      {/* Reports Section */}
      <section id="reports" className="howitworks-reports">
        <h2>Recycling Reports You Can Rely On</h2>
        <div className="howitworks-reports-list">
          {reportsList.map(report => (
            <div key={report.title} className="howitworks-report-card">
              {report.icon} <span>{report.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="howitworks-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="howitworks-faq-list">
          {faqList.map((faq, idx) => (
            <div key={faq.q} className="howitworks-faq-item">
              <button className="howitworks-faq-btn" aria-expanded={faqOpen[idx]} aria-controls={`faq-panel-${idx}`} onClick={() => setFaqOpen(faqOpen.map((open, i) => i === idx ? !open : open))}>
                {faqOpen[idx] ? <FaChevronUp /> : <FaChevronDown />} {faq.q}
              </button>
              {faqOpen[idx] && (
                <div id={`faq-panel-${idx}`} className="howitworks-faq-panel">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <Link to="#items-we-accept">What Items We Accept</Link>
          <Link to="/events">Events Page</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="footer-info">
          <span>© {new Date().getFullYear()} RYGNeco. All rights reserved.</span>
          <span className="footer-tagline">Empowering responsible e-waste recycling for a cleaner, greener future.</span>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorksPage;
