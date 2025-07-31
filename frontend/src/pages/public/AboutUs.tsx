import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { FaRecycle, FaTools, FaChartBar, FaRegSmileBeam, FaLeaf, FaBuilding, FaCertificate, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaUserCircle, FaCheckCircle, FaBookOpen, FaSyncAlt, FaLock, FaHammer, FaUsers } from 'react-icons/fa';
import '../styles/HomePage.css';

const AboutUs = () => {
  return (
    <div className="aboutus eco-bg">
      {/* Hero Section */}
      <section className="hero" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
        <div className="hero-image animate-fade-in-left" style={{flex: '1 1 300px', display: 'flex', justifyContent: 'center'}}>
          <img src="/hero-eco-recycle.svg" alt="Eco-friendly electronics recycling illustration" style={{maxWidth: '350px', width: '100%', borderRadius: '1rem'}} />
        </div>
        <div className="hero-content animate-fade-in-up" style={{flex: '2 1 400px', maxWidth: '600px', textAlign: 'center', padding: '0 2rem'}}>
          <h1>About Us</h1>
          <p className="subheadline">Meet the team behind RYGNeco and discover our mission to transform e-waste into opportunity.</p>
        </div>
        <div className="hero-image animate-fade-in-right" style={{flex: '1 1 300px', display: 'flex', justifyContent: 'center'}}>
          <img src="/illustrative-diagram-electrical-waste-recycling-process-step-223221443.jpg" alt="E-waste recycling process diagram" style={{maxWidth: '350px', width: '100%', borderRadius: '1rem'}} />
        </div>
      </section>

      {/* Meet the Team */}
      <section id="meet-the-team" className="team animate-on-scroll">
        <h2>Meet the Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img src="/leila-meyer-headshot.jpg" alt="Leila Meyer Headshot" className="team-headshot" style={{width: '120px', borderRadius: '50%'}} />
            <h3>Leila Meyer</h3>
            <span className="team-title">Chief Executive Officer</span>
            <p>Leila Meyer is a passionate entrepreneur committed to tackling the global e-waste crisis through innovative, community-driven solutions. With a multidisciplinary background in Architecture, Construction, Education, Interior Design, and Marketing, Leila brings a unique and holistic perspective to sustainability and circular design.</p>
            <p>She earned her Bachelor of Science in Architecture from the University of Cincinnati, where she developed a deep understanding of design thinking and environmental responsibility. Her diverse experience across industries informs her leadership at RYGNeco, guiding a new vision for managing electronic waste—transforming discarded tech into opportunity and building a more sustainable future.</p>
          </div>
          <div className="team-card">
            <img src="/sama-mushtaq-headshot.jpg" alt="Sama Mushtaq Headshot" className="team-headshot" style={{width: '120px', borderRadius: '50%'}} />
            <h3>Sama Mushtaq</h3>
            <span className="team-title">Chief Sustainability Officer</span>
            <p>Bio placeholder: Insert Sama’s background, passions, and role in driving sustainability at RYGNeco.</p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section id="our-mission" className="mission animate-on-scroll">
        <h2>Our Mission</h2>
        <p>We are committed to transforming the way the world thinks about electronic waste. Guided by the principles of circular economy, clean technology, and community empowerment, we give devices a second life—reducing waste and restoring value.</p>
        <p>By building accessible, ethical, and sustainable systems for reuse, repair, and recycling, we aim to close the loop on e-waste—protecting the planet while empowering people.</p>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="offer animate-on-scroll">
        <h2>What We Do</h2>
        <div className="offer-cards">
          <div className="offer-card"><FaRecycle className="offer-icon" /><span>E-Waste Collection & Logistics</span></div>
          <div className="offer-card"><FaTools className="offer-icon" /><span>Device Refurbishment & Resale</span></div>
          <div className="offer-card"><FaChartBar className="offer-icon" /><span>Environmental Impact Reporting</span></div>
          <div className="offer-card"><FaBookOpen className="offer-icon" /><span>Community Workshops & Education</span></div>
          <div className="offer-card"><FaBuilding className="offer-icon" /><span>Business Pick-Up Services</span></div>
          <div className="offer-card"><FaCertificate className="offer-icon" /><span>Certified Recycling</span></div>
        </div>
      </section>

      {/* Why It Matters */}
      <section id="why-it-matters" className="matters animate-on-scroll">
        <h2>Why It Matters</h2>
        <p>E-waste is one of the fastest-growing waste streams in the world. Improper disposal releases toxic materials into the soil and water, threatening both the environment and public health.</p>
        <p>By choosing RYGNeco, you're helping create a world where electronics are not discarded—but revived, respected, and reintegrated responsibly.</p>
        <ul className="matters-list">
          <li><FaLeaf className="matters-icon" /> Reducing Harmful Waste</li>
          <li><FaSyncAlt className="matters-icon" /> Conserving Natural Resources</li>
          <li><FaRecycle className="matters-icon" /> Supporting a Circular Economy</li>
          <li><FaBookOpen className="matters-icon" /> Spreading Knowledge & Awareness</li>
        </ul>
      </section>

      {/* Our Values */}
      <section id="our-values" className="values animate-on-scroll">
        <h2>Our Values</h2>
        <ul className="values-list">
          <li><FaLeaf className="values-icon" /> <strong>Sustainability</strong> – A long-term commitment to our planet.</li>
          <li><FaUsers className="values-icon" /> <strong>Community</strong> – Local partnerships that create jobs, share knowledge, and drive change.</li>
          <li><FaHammer className="values-icon" /> <strong>Innovation</strong> – Smarter, cleaner e-waste solutions through thoughtful design and technology.</li>
          <li><FaCheckCircle className="values-icon" /> <strong>Responsibility</strong> – Ethical handling of every device we collect.</li>
          <li><FaLock className="values-icon" /> <strong>Equity</strong> – Access to clean, affordable tech is a right, not a privilege.</li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="cta animate-on-scroll" style={{textAlign: 'center', margin: '3rem 0'}}>
        <h2>Ready to Make a Difference?</h2>
        <p>Join us in building a cleaner, more equitable tech future.</p>
        <div className="cta-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
          <Link to="/get-involved" className="btn btn-green">Get Involved</Link>
          <Link to="/partner" className="btn btn-outline-green">Partner With Us</Link>
          <Link to="/recycle" className="btn btn-green">Recycle Now</Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
