import React, { useState } from "react";
import { Link } from "react-scroll";
import "./Services.css";

const servicesList = [
  {
    title: "Wedding Decoration & Planning",
    desc: "From elegant themes to complete event coordination, we make your special day magical.",
    details:
      "We handle everything — from floral setups, stage design, lighting, to guest management. Our team ensures your wedding looks straight out of a dream.",
    image: "/images/wedding.jpg",
    icon: "💍",
  },
  {
    title: "Birthday Parties",
    desc: "Fun-filled birthday setups with creative themes, lights, and decorations.",
    details:
      "Whether it’s a kids’ birthday or an adult bash, we design exciting themes, cakes, and photo booths to make it memorable.",
    image: "/images/birthday.jpg",
    icon: "🎂",
  },
  {
    title: "Anniversary Events",
    desc: "Celebrate your milestones with style, romance, and memorable décor.",
    details:
      "Elegant lighting, romantic flower arrangements, and perfect ambiance to celebrate love and togetherness.",
    image: "/images/anniversary.jpg",
    icon: "💖",
  },
  {
    title: "Corporate Events",
    desc: "Professional setups, conferences, and brand events — we handle it all.",
    details:
      "From seminars to brand launches, our event management ensures a premium and professional setup.",
    image: "/images/corporate.jpg",
    icon: "🏢",
  },
  {
    title: "Venue Decoration",
    desc: "Transforming venues into dreamy spaces for any occasion.",
    details:
      "We customize decorations based on themes, colors, and occasions — giving your venue a magical touch.",
    image: "/images/venue.jpg",
    icon: "🌸",
  },
  {
    title: "Balloon & Theme Setup",
    desc: "Colorful balloon setups and custom theme decorations for any celebration.",
    details:
      "Creative balloon arches, LED balloons, and personalized setups for kids and adults alike.",
    image: "/images/balloon.jpg",
    icon: "🎈",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCard = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="services-container">
      <h2 className="services-title">✨ Our Services ✨</h2>
      <p className="services-subtext">
        We create stunning, unforgettable experiences for every occasion.
      </p>

      <div className="services-grid">
        {servicesList.map((service, index) => (
          <div
            key={index}
            className={`service-card ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleCard(index)}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>

            {activeIndex === index && (
              <div className="service-details">
                <img src={service.image} alt={service.title} />
                <p>{service.details}</p>

                {/* Book Now Button */}
                <Link
                  to="contact"
                  smooth={true}
                  duration={700}
                  offset={-70}
                  className="book-btn"
                >
                  Book Now ✨
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
