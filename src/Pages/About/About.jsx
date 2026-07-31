import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Heart, Sparkles } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";
import Timeless from "../Home/Timeless";
import "./About.css";

export default function About() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Activate scroll stagger animation reveals
  useScrollReveal(sectionRef);

  // Parallax Scroll Effect matching Hero section
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], ["0%", "20%"]);

  const handleCTA = () => {
    navigate("/contact");
  };

  const values = [
    {
      id: 1,
      icon: <Sparkles size={24} />,
      title: "Tactile Simplicity",
      desc: "We prioritize raw materiality, warm organic tones, and functional elegance inspired by Scandinavian utility and Japandi mindfulness."
    },
    {
      id: 2,
      icon: <Heart size={24} />,
      title: "Empathetic Craft",
      desc: "Every design is curated around your lifestyle, crafting spatial harmony that nurtures connection and timeless everyday ease."
    },
    {
      id: 3,
      icon: <ShieldCheck size={24} />,
      title: "Quiet Sustainability",
      desc: "Using sustainable, premium wood, natural stone, and local architectural craft to build spaces that endure for generations."
    }
  ];

  return (
    <div ref={sectionRef} className="about-page">
      {/* 1. Header Banner */}
      <section className="about-header" aria-label="About Studio Header">
        {/* Background Image Parallax Panel */}
        <motion.div
          className="about-bg-parallax"
          style={{
            y: backgroundY,
            backgroundImage: `url("https://i.pinimg.com/1200x/14/04/a4/1404a462249b10b39abeb201781a9b71.jpg")`,
          }}
        />
        {/* Ambient Dark Overlay */}
        <div className="about-header-overlay" />

        <span className="about-subtitle" data-reveal="heading">✦ THE STUDIO</span>
        <h1 className="about-title" data-reveal="heading">
          Quiet Luxury &
          <br />
          Editorial Detail
        </h1>
        <p className="about-lead" data-reveal="paragraph">
          Nexo is an award-winning architecture and interior design studio crafting tactile residential spaces that blend warm minimalism with Scandinavian utility.
        </p>
      </section>

      {/* 2. Story Section */}
      <section className="about-story" aria-label="Our Story & Vision">
        <div className="about-story-container">
          {/* Left Text */}
          <div className="about-story-text">
            <h2 data-reveal="heading">Crafting Sincere Spaces</h2>
            <p data-reveal="paragraph">
              Founded with the vision of merging Danish cozy materiality with Japanese spatial composure, Nexo is dedicated to creating residences that feel like modern sanctuaries.
            </p>
            <p data-reveal="paragraph">
              We work closely with clients to understand the rhythm of their daily life, selecting natural travertine, oak woods, linen curtains, and warm finishes that speak to the senses.
            </p>
            <button
              className="about-story-btn"
              onClick={handleCTA}
              data-reveal="button"
              aria-label="Begin design dialogue with us"
            >
              Get In Touch
              <ArrowUpRight size={20} />
            </button>
          </div>

          {/* Right Image */}
          <div className="about-story-image-box" data-reveal="image">
            <div className="about-story-img-wrapper">
              <img
                src="https://i.pinimg.com/736x/d0/82/d4/d082d4a10d67a378470a1805c63da6a4.jpg"
                alt="Tactile warm minimal interior design"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width="1200"
                height="800"
              />
              <div className="about-story-img-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="about-values" aria-label="Core Design Values">
        <div className="about-values-heading">
          <span className="values-tag" data-reveal="heading">✦ OUR FOUNDATIONS</span>
          <h2 data-reveal="heading">Design Philosophy</h2>
        </div>

        <div className="about-values-grid">
          {values.map((val) => (
            <div key={val.id} className="value-card" data-reveal="button">
              <div className="value-icon-box">{val.icon}</div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Timeless CTA Section above Footer */}
      <Timeless />
    </div>
  );
}
