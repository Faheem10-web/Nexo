import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Explore.css";

export default function Explore() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Activate cinematic scroll stagger reveal
  useScrollReveal(sectionRef);

  const goToProject = () => {
    navigate("/project");
  };

  const cards = [
    {
      id: 1,
      title: "Modern Living",
      desc: "Comfort meets sophistication.",
      img: "/assets/Explore.1.png",
      className: "explore-card-large"
    },
    {
      id: 2,
      title: "Refined Kitchen",
      desc: "Where beauty meets purpose.",
      img: "/assets/Explore.4.png",
      className: "explore-card-tall"
    },
    {
      id: 3,
      title: "Reading Corners",
      desc: "Peaceful moments, every day.",
      img: "/assets/Explore.3.jpg",
      className: "explore-card-small"
    },
    {
      id: 4,
      title: "Dining Spaces",
      desc: "Gather, dine, and connect.",
      img: "/assets/Explore.4.png",
      className: "explore-card-medium"
    },
    {
      id: 5,
      title: "Modern Cinema Room",
      desc: "Comfort meets sophistication.",
      img: "/assets/Explore.7.jpg",
      className: "explore-card-wide"
    },
    {
      id: 6,
      title: "Signature Pieces",
      desc: "Timeless design. Lasting impact.",
      img: "/assets/Explore.6.png",
      className: "explore-card-bottom"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="explore-section"
      aria-label="Studio Collections"
    >
      {/* Left Sidebar Info Card */}
      <div className="explore-sidebar">
        <div className="tag" data-reveal="heading">
          <span className="dot" aria-hidden="true"></span>
          <p>COLLECTION</p>
        </div>

        <h2 className="explore-heading" data-reveal="heading">
          Explore Our
          <br />
          Collection
        </h2>

        <p className="explore-description" data-reveal="paragraph">
          Curated spaces. Timeless design. Discover pieces that bring beauty,
          function, and inspiration into every corner of your home.
        </p>

        <button
          className="explore-main-button"
          onClick={goToProject}
          aria-label="Explore entire interiors collection"
          data-reveal="button"
        >
          Explore collection
          <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Right Grid Columns */}
      <div className="explore-card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`explore-card ${card.className}`}
            data-reveal="image"
          >
            <img
              className="explore-card-image"
              src={card.img}
              alt={`${card.title} Design Setup`}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              width="600"
              height="480"
            />
            <div className="explore-card-overlay" />

            <div className="explore-card-content">
              <div>
                <h3 className="explore-card-title">{card.title}</h3>
                <p className="explore-card-text">{card.desc}</p>
              </div>

              <button
                className="explore-arrow-button"
                onClick={goToProject}
                aria-label={`View details of ${card.title}`}
              >
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}