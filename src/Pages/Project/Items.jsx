import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Items.css";

export default function Items({ activeTab, setActiveTab }) {
  const tabs = ["ALL", "LIVING", "KITCHEN", "COMMERCIAL", "WELLNESS"];
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  // Activate cinematic scroll stagger reveal on page load
  useScrollReveal(sectionRef);

  // Parallax Scroll Effect matching Hero section
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], ["0%", "20%"]);

  // Auto-centering active tab button on mobile horizontal scrolling
  const handleTabClick = (tab, e) => {
    setActiveTab(tab);
    if (e.target && containerRef.current) {
      const container = containerRef.current;
      const btn = e.target;
      const scrollLeft = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth"
      });
    }
  };

  return (
    <section ref={sectionRef} className="items" aria-label="Portfolio Category Filter">
      {/* Background Image Parallax Panel matching Hero */}
      <motion.div
        className="items-bg-parallax"
        style={{
          y: backgroundY,
          backgroundImage: `url("https://i.pinimg.com/736x/40/57/62/405762d3ca985898637fa588c14851dd.jpg")`,
        }}
      />

      {/* Dark Ambient Overlay */}
      <div className="items-overlay" />

      <span className="items-subtitle" data-reveal="heading">OUR WORK</span>

      <h1 className="items-title" data-reveal="heading">Project Portfolio</h1>

      {/* Decorative luxury divider */}
      <div className="items-divider" aria-hidden="true" data-reveal="paragraph">
        <span></span>
        <div className="diamond"></div>
        <span></span>
      </div>

      <p className="items-description" data-reveal="paragraph">
        A curated collection of architectural excellence and interior harmony,
        designed for the modern connoisseur.
      </p>

      {/* Filter Tabs list */}
      <div ref={containerRef} className="items-tabs" role="tablist" data-reveal="button">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              className={`tab-btn ${isActive ? "active" : ""}`}
              onClick={(e) => handleTabClick(tab, e)}
            >
              <span className="tab-text">{tab}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="active-tab-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}