import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import "./Hero.css";

// Reusable Magnetic Button Component
function MagneticButton({ children, className, onClick, ariaLabel }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 12,
        mass: 0.1,
      }}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // Parallax Scroll Effect
  const { scrollY } = useScroll();

  const backgroundY = useTransform(
    scrollY,
    [0, 800],
    ["0%", "20%"]
  );

  const contentOpacity = useTransform(
    scrollY,
    [0, 500],
    [1, 0]
  );

  const contentY = useTransform(
    scrollY,
    [0, 500],
    [0, 100]
  );

  // Title
  const titleWords = "Luxury in\nEvery Detail".split("\n");

  const goToProject = () => {
    navigate("/project");
  };

  return (
    <section ref={heroRef} className="hero">

      {/* Static Background Image */}
      <motion.div
        className="hero-bg-parallax"
        style={{
          y: backgroundY,
          backgroundImage: "url(/assets/hero.png)",
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      />

      {/* Dark Overlay */}
      <div className="overlay" />

      {/* Ambient Light */}
      <div className="hero-light" />

      {/* Content */}
      <motion.div
        className="hero-content"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >

        {/* Subtitle */}
        <motion.span
          className="hero-subtitle"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
        >
          PREMIUM INTERIOR DESIGN
        </motion.span>

        {/* Title */}
        <h1 className="hero-title">
          {titleWords.map((line, lineIdx) => (
            <span key={lineIdx} className="title-line-mask">

              {line.split(" ").map((word, wordIdx) => (
                <motion.span
                  key={wordIdx}
                  className="title-word"
                  initial={{
                    y: "100%",
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    delay:
                      0.5 +
                      (lineIdx * 2 + wordIdx) * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}

              {lineIdx < titleWords.length - 1 && <br />}

            </span>
          ))}
        </h1>

        {/* Paragraph */}
        <motion.p
          className="hero-text"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.2,
            delay: 1.1,
            ease: "easeOut",
          }}
        >
          Carefully crafted interiors that blend comfort,
          elegance, and timeless design.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="hero-buttons"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 1.3,
            ease: "easeOut",
          }}
        >

          <MagneticButton
            className="primary-btn"
            onClick={goToProject}
            ariaLabel="Explore Collection"
          >
            Explore Collection
            <ArrowRight
              size={18}
              strokeWidth={2}
              className="btn-icon"
            />
          </MagneticButton>

          <MagneticButton
            className="secondary-btn"
            onClick={goToProject}
            ariaLabel="View Projects"
          >
            View Projects
            <ArrowRight
              size={18}
              strokeWidth={2}
              className="btn-icon"
            />
          </MagneticButton>

        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2,
          duration: 1,
        }}
      >
        <span className="scroll-text">
          SCROLL
        </span>

        <div className="scroll-line">
          <motion.div
            className="scroll-dot"
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

    </section>
  );
}