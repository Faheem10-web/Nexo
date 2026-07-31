import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Timeless.css";

function Timeless() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Activate cinematic scroll stagger reveal
  useScrollReveal(sectionRef);

  // CONTACT PAGE NAVIGATION
  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <section ref={sectionRef} className="timeless-section">
      {/* OVERLAY */}
      <div className="timeless-overlay"></div>

      {/* CONTENT */}
      <div className="timeless-content">
        <h1 className="timeless-title" data-reveal="heading">
          Let’s Create Something Timeless
        </h1>

        <p className="timeless-description" data-reveal="paragraph">
          We welcome collaborations, new commissions, and conversations about
          design.
        </p>

        <button
          className="timeless-btn"
          onClick={goToContact}
          data-reveal="button"
        >
          <span>CONTACT US</span>

          <div className="timeless-btn-icon">
            <ArrowUpRight strokeWidth={2.4} />
          </div>
        </button>
      </div>
    </section>
  );
}

export default Timeless;