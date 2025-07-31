import React from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaLeaf, FaUsers, FaChartBar, FaTruck, FaMobileAlt, FaBuilding, FaGift, FaHandshake, FaBullhorn, FaMedal, FaMoneyBillWave, FaTree } from 'react-icons/fa';
import './JoinUsPage.css';

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
