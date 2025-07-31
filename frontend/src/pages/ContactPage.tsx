import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = 'Full Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      // TODO: handle actual submission (API/email)
    }
  };

  return (
    <div className="contact-bg">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p className="contact-subtitle">Certified e-waste recycling for businesses and organizations</p>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-block">
            <div className="contact-row"><FaPhone className="contact-icon" /><span>(513) 555-1234</span></div>
            <div className="contact-row"><FaEnvelope className="contact-icon" /><span>info@rygneco.com</span></div>
            <div className="contact-row"><FaMapMarkerAlt className="contact-icon" /><span>123 Main St, Cincinnati, OH 45202</span></div>
          </div>
          <div className="contact-social">
            <a href="https://facebook.com/rygneco" target="_blank" rel="noopener" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://linkedin.com/company/rygneco" target="_blank" rel="noopener" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://twitter.com/rygneco" target="_blank" rel="noopener" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name<span className="required">*</span></label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required aria-required="true" aria-label="Full Name" />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input type="text" id="company" name="company" value={form.company} onChange={handleChange} aria-label="Company Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email<span className="required">*</span></label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required aria-required="true" aria-label="Email" />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} aria-label="Phone Number" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5} aria-label="Message" />
          </div>
          <button type="submit" className="btn btn-green">Send Message</button>
          {submitted && <div className="form-success">Thank you! Your message has been sent.</div>}
        </form>
      </div>
      <div className="contact-map-bg">
        <img src="/assets/cincinnati-map-blur.jpg" alt="Map of Cincinnati" className="map-bg-img" />
      </div>
      {/* Footer can be reused from your main layout */}
    </div>
  );
};

export default ContactPage;
