import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaBars, FaTimes } from 'react-icons/fa';

const EcoNavbar: React.FC = () => {
  // Dropdown and mobile menu state
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <header className="eco-header" style={{position: 'sticky', top: 0, zIndex: 100}}>
      <nav ref={navRef} className="eco-nav" aria-label="Main Navigation">
        <div className="eco-logo">
          <Link to="/" aria-label="RYGNeco Home"><FaRecycle /> RYGNeco</Link>
        </div>
        <button className="eco-hamburger" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={`eco-nav-list${mobileMenu ? ' open' : ''}`} role="menubar">
          {/* Join Us */}
          <li className="eco-nav-item" role="none">
            <Link to="/join-us" role="menuitem" aria-haspopup="true" aria-expanded={dropdown==='join'} onClick={()=>setDropdown(null)} onMouseEnter={()=>!mobileMenu&&setDropdown('join')} onMouseLeave={()=>!mobileMenu&&setDropdown(null)} onFocus={()=>setDropdown('join')} tabIndex={0}>Join Us</Link>
            <ul className={`eco-dropdown${dropdown==='join' ? ' show' : ''}`} role="menu">
              <li><Link to="/join-us#why-rygneco" role="menuitem" onClick={()=>setDropdown(null)}>Why RYGNeco?</Link></li>
              <li><Link to="/join-us#recycling-accessible" role="menuitem" onClick={()=>setDropdown(null)}>Recycling Made Accessible</Link></li>
              <li><Link to="/join-us#recycling-offers" role="menuitem" onClick={()=>setDropdown(null)}>Recycling Offers</Link></li>
            </ul>
          </li>
          {/* How It Works */}
          <li className="eco-nav-item" role="none">
            <Link to="/how-it-works" role="menuitem" aria-haspopup="true" aria-expanded={dropdown==='how'} onClick={()=>setDropdown(null)} onMouseEnter={()=>!mobileMenu&&setDropdown('how')} onMouseLeave={()=>!mobileMenu&&setDropdown(null)} onFocus={()=>setDropdown('how')} tabIndex={0}>How It Works</Link>
            <ul className={`eco-dropdown${dropdown==='how' ? ' show' : ''}`} role="menu">
              <li><Link to="/how-it-works#our-process" role="menuitem" onClick={()=>setDropdown(null)}>Our Process</Link></li>
              <li><Link to="/how-it-works#items-we-accept" role="menuitem" onClick={()=>setDropdown(null)}>What Items We Accept</Link></li>
              <li><Link to="/how-it-works#sorting" role="menuitem" onClick={()=>setDropdown(null)}>How Do We Sort Your E-Waste?</Link></li>
              <li><Link to="/how-it-works#reports" role="menuitem" onClick={()=>setDropdown(null)}>Recycling Reports</Link></li>
              <li><Link to="/how-it-works#faq" role="menuitem" onClick={()=>setDropdown(null)}>Frequently Asked Questions</Link></li>
            </ul>
          </li>
          {/* Education */}
          <li className="eco-nav-item" role="none">
            <Link to="/education" role="menuitem" aria-haspopup="true" aria-expanded={dropdown==='edu'} onClick={()=>setDropdown(null)} onMouseEnter={()=>!mobileMenu&&setDropdown('edu')} onMouseLeave={()=>!mobileMenu&&setDropdown(null)} onFocus={()=>setDropdown('edu')} tabIndex={0}>Education</Link>
            <ul className={`eco-dropdown${dropdown==='edu' ? ' show' : ''}`} role="menu">
              <li><Link to="/education#what-is-ewaste" role="menuitem" onClick={()=>setDropdown(null)}>What Is E-Waste?</Link></li>
              <li><Link to="/education#circular-economy" role="menuitem" onClick={()=>setDropdown(null)}>What Is a Circular Economy?</Link></li>
              <li><Link to="/education#fun-facts" role="menuitem" onClick={()=>setDropdown(null)}>Fun Facts</Link></li>
              <li><Link to="/education#community-learning" role="menuitem" onClick={()=>setDropdown(null)}>Community Learning in Action</Link></li>
            </ul>
          </li>
          {/* About Us */}
          <li className="eco-nav-item" role="none">
            <Link to="/about-us" role="menuitem" aria-haspopup="true" aria-expanded={dropdown==='about'} onClick={()=>setDropdown(null)} onMouseEnter={()=>!mobileMenu&&setDropdown('about')} onMouseLeave={()=>!mobileMenu&&setDropdown(null)} onFocus={()=>setDropdown('about')} tabIndex={0}>About Us</Link>
            <ul className={`eco-dropdown${dropdown==='about' ? ' show' : ''}`} role="menu">
              <li><Link to="/about-us#meet-the-team" role="menuitem" onClick={()=>setDropdown(null)}>Meet The Team</Link></li>
              <li><Link to="/about-us#our-mission" role="menuitem" onClick={()=>setDropdown(null)}>Our Mission</Link></li>
              <li><Link to="/about-us#what-we-do" role="menuitem" onClick={()=>setDropdown(null)}>What We Do</Link></li>
              <li><Link to="/about-us#our-values" role="menuitem" onClick={()=>setDropdown(null)}>Our Values</Link></li>
            </ul>
          </li>
          {/* Contact */}
          <li className="eco-nav-item" role="none">
            <Link to="/contact" role="menuitem" tabIndex={0}>Contact</Link>
          </li>
          {/* Login */}
          <li className="eco-nav-item" role="none">
            <Link to="/login" className="btn btn-green" role="menuitem" tabIndex={0}>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default EcoNavbar; 