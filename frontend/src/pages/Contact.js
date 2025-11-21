import React, { useState } from "react";
import { postContact } from "../api";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
    eventDate: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postContact(form);
      setSent(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        message: "",
        eventDate: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to submit!");
    }
  };

  if (sent)
    return (
      <div className="thankyou-container">
        <h3>🎉 Thank You! Your enquiry was submitted.</h3>
        <p>Our RBR Events Jaipur team will contact you shortly!</p>
      </div>
    );

  return (
    <div className="contact-container">

      <h2 className="contact-title">📞 Contact / Booking</h2>
      <p className="contact-subtitle">
        We'd love to bring your dream event to life.
      </p>

      {/* FORM */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            name="serviceType"
            placeholder="Service Type (Wedding / Birthday...)"
            value={form.serviceType}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <textarea
            name="message"
            placeholder="Event Details..."
            value={form.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit">🚀 Send Enquiry</button>
      </form>

      {/* CONTACT INFO */}
      <div className="contact-info">
        <h3>📍 Our Office</h3>
        <p>RBR Events</p>
        <p>Pratap Nagar, Jaipur, Rajasthan</p>
        <p>📞 8502817889</p>
        <p>✉️ rangbirangirasmein@gmail.com</p>
      </div>

      {/* GOOGLE MAP */}
      <div className="map-container">
  <iframe
    title="RBR Events Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.103865944462!2d75.81987307509205!3d26.86401587666451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db67cd21e91f7%3A0x8b6e5f70e7f9d0cf!2sPratap%20Nagar%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1731605400001!5m2!1sen!2sin"
    width="100%"
    height="350"
    style={{ border: 0 }}   // ✅ style string nahi, object
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"  // ✅ camelCase
  ></iframe>
</div>


      {/* FLOATING ACTION BUTTONS */}
      <div className="floating-socials">
        {/* WhatsApp */}
        <a
          href="https://wa.me/918502817889?text=Hello%20I%20want%20to%20book%20an%20event"
          target="_blank"
          rel="noreferrer"
          className="social-btn whatsapp"
        >
           <img src={'whatsapp.png'}/>
        </a>

        {/* Instagram FIXED */}
        <a
          href="https://www.instagram.com/rangbirangirasmein.in/"
          target="_blank"
          rel="noreferrer"
          className="social-btn instagram"
        >
          <img src={'instagram.png'} height={'25px'}/>
        </a>

        {/* Email – NOW GMAIL OPENS ALWAYS */}
        <a
          href="mailto:rangbirangirasmein@gmail.com?subject=Event%20Enquiry&body=Hello%20RBR%20Events,"
          className="social-btn email"
        >
          ✉️
        </a>

        {/* Phone Call */}
        <a href="tel:8502817889" className="social-btn call">
          📞
        </a>
      </div>
    </div>
  );
}
  