import React from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaWrench, FaChartBar, FaBrain, FaTruck, FaRecycle, FaCheckCircle, FaSeedling, FaHandshake, FaLightbulb, FaShieldAlt, FaBalanceScale } from "react-icons/fa";
import "../styles/AboutUsPage.css";

const AboutUsPage = () => (
  <div className="aboutus-page eco-bg">
    {/* Hero Section */}
    <section className="aboutus-hero">
      <img src="/assets/about-hero-bg.jpg" alt="E-waste sustainability banner" className="aboutus-hero-img" />
      <div className="aboutus-hero-tagline">
        Leadership, Vision, and the Mission Behind RYGNeco.
      </div>
    </section>

    {/* Meet the Team */}
    <section id="meet-the-team" className="aboutus-team">
      <h2>Meet the Team</h2>
      <div className="aboutus-team-profiles">
        <div className="aboutus-profile">
          <img src="/leila-meyer-headshot.jpg" alt="Leila Meyer headshot" className="aboutus-profile-img" />
          <div className="aboutus-profile-info">
            <h3>Leila Meyer, CEO</h3>
            <p>
              Leila Meyer is a passionate entrepreneur committed to tackling the global e-waste crisis through innovative, community-driven solutions.<br />
              With a multidisciplinary background spanning Architecture, Construction, Education, Interior Design, and Marketing, she brings a unique and holistic perspective to sustainability and circular design.<br />
              Leila earned her Bachelor of Science in Architecture from the University of Cincinnati, where she cultivated a deep understanding of design thinking and environmental responsibility. Over the years, she has expanded her expertise across industries through internships, sharpening the skills that now guide her leadership at RYGNeco.<br />
              Leila's vision for RYGNeco is to revolutionize how we manage electronic waste—transforming discarded tech into opportunity and paving the way for a more sustainable future.
            </p>
          </div>
        </div>
        <div className="aboutus-profile">
          <img src="/sama-mushtaq-headshot.jpg" alt="Sama Mushtaq headshot" className="aboutus-profile-img" />
          <div className="aboutus-profile-info">
            <h3>Sama Mushtaq, CSO</h3>
            <p>
              {/* Bio coming soon. */}
              <span className="aboutus-profile-placeholder">Bio coming soon.</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Our Mission */}
    <section id="our-mission" className="aboutus-mission">
      <h2>Our Mission</h2>
      <div className="aboutus-mission-text">
        At our company, we are committed to transforming the way the world thinks about electronic waste.<br />
        Rooted in the principles of circular economy, clean technology, and community empowerment, we work to give devices a second life—reducing waste and restoring value.<br />
        We want to close the loop on e-waste by creating accessible, ethical, and sustainable systems for reuse, repair, and recycling.
      </div>
    </section>

    {/* What We Do */}
    <section id="what-we-do" className="aboutus-whatwedo">
      <h2>What We Do</h2>
      <div className="aboutus-services">
        <div className="aboutus-service"><FaBoxOpen /> E-Waste Collection & Logistics</div>
        <div className="aboutus-service"><FaWrench /> Device Refurbishment & Resale</div>
        <div className="aboutus-service"><FaChartBar /> Environmental Impact Reporting</div>
        <div className="aboutus-service"><FaBrain /> Community Workshops & Education</div>
        <div className="aboutus-service"><FaTruck /> Business Pick-Up Services</div>
        <div className="aboutus-service"><FaRecycle /> Certified Recycling</div>
      </div>
      <div className="aboutus-why-matter">
        <h3>Why Does It Matter?</h3>
        <p>
          E-waste is one of the fastest-growing waste streams in the world.<br />
          Toxic materials can leak into soil and water when improperly disposed of.<br />
          By choosing RYGNeco, you're making a measurable difference.<br />
          Our company represents a future where electronics aren’t discarded—they’re revived, respected, and reintegrated into the world responsibly.
        </p>
        <div className="aboutus-highlights">
          <span className="aboutus-highlight"><FaCheckCircle /> Reducing Harmful Waste</span>
          <span className="aboutus-highlight"><FaCheckCircle /> Conserving Natural Resources</span>
          <span className="aboutus-highlight"><FaCheckCircle /> Supporting a Circular Economy</span>
          <span className="aboutus-highlight"><FaCheckCircle /> Spreading The Knowledge</span>
        </div>
      </div>
    </section>

    {/* Our Values */}
    <section id="our-values" className="aboutus-values">
      <h2>Our Values</h2>
      <div className="aboutus-values-text">
        At our company, our values guide every step we take. We believe in sustainability as a long-term commitment to the planet—not just a quick fix.<br />
        Our work is grounded in community, partnering locally to create jobs, share knowledge, and spark meaningful change.<br />
        With a focus on innovation, we’re always looking for smarter, cleaner ways to manage e-waste through thoughtful design and technology.<br />
        We take responsibility seriously, ensuring every device we collect is handled with care—ethically reused, repurposed, or recycled.<br />
        And at the core of it all is equity—because access to clean, affordable technology should be a right, not a privilege.
      </div>
      <div className="aboutus-values-grid">
        <span className="aboutus-value"><FaSeedling /> Sustainability</span>
        <span className="aboutus-value"><FaHandshake /> Community</span>
        <span className="aboutus-value"><FaLightbulb /> Innovation</span>
        <span className="aboutus-value"><FaShieldAlt /> Responsibility</span>
        <span className="aboutus-value"><FaBalanceScale /> Equity</span>
      </div>
    </section>

    {/* CTA Section */}
    <section className="aboutus-cta">
      <h2>Ready to make an impact?</h2>
      <div className="aboutus-cta-buttons">
        <Link to="/join-us" className="btn btn-green">Join Us</Link>
        <Link to="/how-it-works#our-process" className="btn btn-outline-green">Schedule a Pickup</Link>
        <a href="#meet-the-team" className="btn btn-green">Meet the Team</a>
      </div>
    </section>

    {/* Footer */}
    <footer className="footer">
      <div className="footer-links">
        <a href="#meet-the-team">Meet The Team</a>
        <a href="#our-mission">Our Mission</a>
        <a href="#what-we-do">What We Do</a>
        <a href="#our-values">Our Values</a>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="footer-social">
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
        <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
        <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
      </div>
      <div className="footer-info">
        <span>© {new Date().getFullYear()} RYGNeco. All rights reserved.</span>
        <span className="footer-tagline">Empowering responsible e-waste recycling for a cleaner, greener future.</span>
      </div>
    </footer>
  </div>
);

export default AboutUsPage;
