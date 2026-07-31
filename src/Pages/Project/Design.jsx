import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Design.css";

function Design() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Activate cinematic scroll stagger reveal
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="design-section">
      <div className="design-container">
        {/* LEFT CONTENT */}
        <div className="design-left">
          <div className="diamond" data-reveal="heading">
            <span></span>
          </div>

          <h1 className="design-heading" data-reveal="heading">
            Designed for
            <br />
            modern living.
          </h1>

          <button
            className="design-btn"
            onClick={() => navigate("/contact")}
            data-reveal="button"
          >
            START YOUR PROJECT
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="design-right" data-reveal="image">
          <img
            src="/assets/items.png"
            alt="Minimalist Architectural Interior"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width="600"
            height="450"
            className="design-image"
          />
        </div>
      </div>
    </section>
  );
}

export default Design;