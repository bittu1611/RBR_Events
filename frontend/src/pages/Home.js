import React, { useEffect } from "react";
import { Link } from "react-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const galleryItems = [
    { img: "/sample1.jpg", text: "Elegant Wedding Decor" },
    { img: "/sample2.jpg", text: "Luxury Corporate Setup" },
    { img: "/sample3.jpg", text: "Birthday Celebration" },
    { img: "/sample4.jpg", text: "Engagement Party" },
    { img: "/sample5.jpg", text: "Cultural Event" },
    { img: "/sample6.jpg", text: "Outdoor Celebration" },
  ];

  return (
    <div className="home-container" id="home">
      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content" data-aos="fade-up">
            <h1 className="title">
              WELCOME TO <br /> <span>RBR Events</span>
            </h1>
            <p className="subtitle">
              We turn your special moments into unforgettable memories.<br/> From
              stunning décor to complete event planning, <br/> our team creates magic
              in every detail. <br/> Let us make your celebrations grand, beautiful,
              and truly unforgettable.
            </p>

            <div className="hero-buttons" data-aos="zoom-in">
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-70}
                className="btn primary"
              >
                Book Now
              </Link>
              <Link
                to="services"
                smooth={true}
                duration={500}
                offset={-70}
                className="btn secondary"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section className="gallery-preview" id="gallery">
        <h2 className="section-title" data-aos="fade-up">
          ✨ Our Event Highlights ✨
        </h2>
        <div className="gallery">
          {galleryItems.map((item, i) => (
            <div
              className="img-card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <img src={item.img} alt={item.text} />
              <div className="overlay">
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
