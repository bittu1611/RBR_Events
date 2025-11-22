import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">✨ About RBR Events</h2>
      <p className="about-intro">
        At <span>RBR Events</span>, we transform ordinary spaces into extraordinary experiences. 
        From grand weddings to intimate birthdays, our expert planners and designers bring your 
        dreams to life with creativity and precision.
      </p>

      <div className="about-cards">
        <div className="about-card">
          <h3>🎉 Our Mission</h3>
          <p>
            To craft stunning, memorable events that reflect your unique story and personality.
          </p>
        </div>
        <div className="about-card">
          <h3>💡 What We Do</h3>
          <p>
            We specialize in wedding decor, corporate events, theme setups, and all kinds of celebrations.
          </p>
        </div>
        <div className="about-card">
          <h3>🤝 Why Choose Us</h3>
          <p>
            Because we handle every detail with love, passion, and precision — making your special day stress-free and perfect.
          </p>
        </div>
      </div>

      {/* ===== TEAM SECTION ===== */}
      <div className="team-section">
        <h2 className="team-title">🌟 Meet Our Team</h2>
        <div className="team-grid">
          {[
            {
              name: "Pankaj",
              role: "Founder & Event Director",
              img: "/images/team1.jpg",
              mo: "8502817889"
            },
            {
              name: "Sachin",
              role: "Creative Designer",
              img: "/images/team2.jpg",
              mo: "77280 10639"
            },
            {
              name: "xyz",
              role: "Client Coordinator",
              img: "/images/team3.jpg",
              mo: "8502817889"
            },
          ].map((member, i) => (
            <div key={i} className="team-card">
              <img src={member.img} alt={member.name} />
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <button className="team-mobile">
                           
                            <a className="ancartag"
                              href="tel:+918502817889"
                              onClick={(e) => e.stopPropagation()}
                            >
                             {member.mo}
                            </a>
                          </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-contact">
        <p><strong>📍 Address:</strong> Jaipur, Rajasthan, India</p>
        <p><strong>📞 Contact:</strong> +91 8502817889</p>
        <p><strong>✉️ Email:</strong> info@rbrevents.com</p>
      </div>
    </div>
  );
}
