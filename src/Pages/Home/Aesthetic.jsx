import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, LampFloor } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Aesthetic.css";

export default function Aesthetic() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Active our cinematic scroll stagger reveal
  useScrollReveal(sectionRef);

  const handleExplore = () => {
    navigate("/project");
  };

  const handleAbout = () => {
    navigate("/about");
  };

  return (
    <section
      ref={sectionRef}
      className="aesthetic"
      aria-label="Studio Aesthetics Showcase"
    >
      {/* Left side text and action button */}
      <div className="aesthetic-left">
        <div className="tag" data-reveal="heading">
          <span className="dot" aria-hidden="true"></span>
          <p>INTERIOR STUDIO</p>
        </div>

        <h2 data-reveal="heading">
          Timeless.
          <br />
          Interior Design.
        </h2>

        <p className="desc" data-reveal="paragraph">
          Crafting luxurious interiors that blend elegance, comfort, and modern living.
        </p>

        <button
          className="explore-btns"
          onClick={handleAbout}
          aria-label="Learn more About Us"
          data-reveal="button"
        >
          About Us
          <ArrowUpRight size={24} className="btn-arrow" />
        </button>
      </div>

      {/* Main showcase center image */}
      <div className="main-image-container" data-reveal="image">
        <div className="main-image-wrapper">
          <img
            src="/assets/Aesthetic-1.png"
            alt="Minimal Luxury Living Room Design Showcase"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width="800"
            height="560"
            className="aesthetic-img"
          />
          <div className="aesthetic-img-overlay" />
        </div>
      </div>

      {/* Right cards details column */}
      <div className="right-cards">
        {/* Top Info Card */}
        <div className="top-card" data-reveal="button">
          <div className="icon-box" aria-hidden="true">
            <LampFloor size={28} />
          </div>

          <h3>Elevating spaces with refined aesthetics</h3>

          <button
            className="explore-link"
            onClick={handleExplore}
            aria-label="View Aesthetics Projects"
          >
            <span>View Project</span>
            <ArrowUpRight size={20} className="link-arrow" />
          </button>
        </div>

        {/* Bottom Callout Card */}
        <div className="bottom-card" onClick={handleExplore} data-reveal="button" style={{ cursor: "pointer" }}>
          <div className="pill">Luxury Interiors</div>

          <p>Transform your home into a masterpiece of modern elegance</p>
        </div>
      </div>
    </section>
  );
}