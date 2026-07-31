import React, { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { ShoppingBag, FolderOpen, Users, Trophy } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Awards.css";

// High-performance animated counter that runs when visible in the viewport
function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [currentValue, setCurrentValue] = useState(0);

  // Extract digits and symbols
  const digits = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    stiffness: 40,
    damping: 15,
  });

  useEffect(() => {
    if (isInView) {
      progress.set(digits);
    }
  }, [isInView, digits, progress]);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      setCurrentValue(Math.floor(latest));
    });
  }, [smoothProgress]);

  return <span ref={ref}>{currentValue}{suffix}</span>;
}

export default function Awards() {
  const sectionRef = useRef(null);

  // Activate cinematic scroll stagger reveal
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="awards"
      aria-label="Studio Statistics & Awards"
    >
      {/* Box 1 */}
      <div className="award-box" data-reveal="button">
        <div className="icon-circle" aria-hidden="true">
          <ShoppingBag />
        </div>
        <h2>
          <AnimatedCounter value="500+" />
        </h2>
        <p>Products</p>
      </div>

      <div className="divider" aria-hidden="true" />

      {/* Box 2 */}
      <div className="award-box" data-reveal="button">
        <div className="icon-circle" aria-hidden="true">
          <FolderOpen />
        </div>
        <h2>
          <AnimatedCounter value="20+" />
        </h2>
        <p>Projects</p>
      </div>

      <div className="divider" aria-hidden="true" />

      {/* Box 3 */}
      <div className="award-box" data-reveal="button">
        <div className="icon-circle" aria-hidden="true">
          <Users />
        </div>
        <h2>
          <AnimatedCounter value="50+" />
        </h2>
        <p>Satisfied Customers</p>
      </div>

      <div className="divider" aria-hidden="true" />

      {/* Box 4 */}
      <div className="award-box" data-reveal="button">
        <div className="icon-circle" aria-hidden="true">
          <Trophy />
        </div>
        <h2>
          <AnimatedCounter value="1st" />
        </h2>
        <p>Top 1 in Paris</p>
      </div>
    </section>
  );
}