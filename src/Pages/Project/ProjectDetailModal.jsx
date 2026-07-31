import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Calendar, MapPin, Minimize2, CheckCircle2 } from "lucide-react";
import "./ProjectDetailModal.css";

export default function ProjectDetailModal({ project, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const touchStartX = useRef(0);

  // Preload gallery images for zero-latency switching
  useEffect(() => {
    if (project && project.gallery) {
      project.gallery.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [project]);

  // Lock page scrolling under overlay
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard navigation listeners (ESC, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIdx]);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % project.gallery.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  // Touch Swipe Handlers for mobile users
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const currentImg = project.gallery[currentIdx] || project.image;

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Project Details`}
    >
      <div className={`modal-container ${fullscreenMode ? "fullscreen" : ""}`}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close details view"
        >
          <X size={24} />
        </button>

        {/* Fullscreen Toggle */}
        <button
          className="modal-expand-btn"
          onClick={() => setFullscreenMode(!fullscreenMode)}
          aria-label={fullscreenMode ? "Exit fullscreen mode" : "Enter fullscreen mode"}
        >
          {fullscreenMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>

        {/* Modal Layout splits */}
        <div className="modal-split-layout">
          {/* LEFT: Cinematic Gallery */}
          <div
            className="modal-gallery-pane"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="gallery-main-image-wrapper">
              <motion.img
                key={currentIdx}
                src={currentImg}
                alt={`${project.title} gallery item ${currentIdx + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="gallery-active-img"
              />
            </div>

            {/* Slider arrows */}
            <button
              className="gallery-arrow prev"
              onClick={handlePrev}
              aria-label="Previous slide image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="gallery-arrow next"
              onClick={handleNext}
              aria-label="Next slide image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Progress Bar & Indicators */}
            <div className="gallery-progress-panel">
              <div className="progress-bar-track">
                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentIdx + 1) / project.gallery.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="gallery-counter-label">
                {currentIdx + 1} / {project.gallery.length}
              </span>
            </div>
          </div>

          {/* RIGHT: Metadata and details description */}
          {!fullscreenMode && (
            <motion.div
              className="modal-details-pane"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="details-header">
                <span className="details-category-pill">{project.category}</span>
                <h2 className="details-title">{project.title}</h2>
                <div className="details-style-row">
                  <CheckCircle2 size={16} className="status-check" />
                  <span>{project.style} &bull; {project.status}</span>
                </div>
              </div>

              {/* Spaced Metadata Info */}
              <div className="details-metadata-grid">
                <div className="meta-card">
                  <MapPin size={16} className="meta-icon" />
                  <div>
                    <span className="meta-label">Location</span>
                    <span className="meta-value">{project.location}</span>
                  </div>
                </div>

                <div className="meta-card">
                  <Calendar size={16} className="meta-icon" />
                  <div>
                    <span className="meta-label">Year</span>
                    <span className="meta-value">{project.year}</span>
                  </div>
                </div>

                <div className="meta-card">
                  <div className="sqft-icon meta-icon">✦</div>
                  <div>
                    <span className="meta-label">Area</span>
                    <span className="meta-value">{project.area}</span>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="details-description-box">
                <h3>Design Overview</h3>
                <p>{project.description}</p>
              </div>

              {/* Thumbnail Navigation Indicators */}
              <div className="gallery-thumbs-row">
                {project.gallery.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIdx(index)}
                    className={`thumb-nav-btn ${index === currentIdx ? "active" : ""}`}
                    aria-label={`Show slide image ${index + 1}`}
                  >
                    <img src={thumb} alt={`Thumbnail preview ${index + 1}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
