import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Loader.css";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const titleRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Prevent scroll during loading
    document.body.style.overflow = "hidden";

    // Counter animation logic
    const countObj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (onComplete) onComplete();
      }
    });

    tl.to(countObj, {
      value: 100,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        setPercent(Math.floor(countObj.value));
      }
    });

    // Staggered title letter reveal
    tl.fromTo(
      ".loader-title span",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.15 },
      "-=1.8"
    );

    // Slide up loader panel and fade out elements
    tl.to([counterRef.current, titleRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.in"
    });

    tl.to(
      loaderRef.current,
      {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut"
      },
      "-=0.2"
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader-overlay" aria-live="polite" aria-label="Loading Website">
      <div className="loader-content">
        <h1 ref={titleRef} className="loader-title">
          {"NEXO".split("").map((char, index) => (
            <span key={index} style={{ display: "inline-block" }}>
              {char}
            </span>
          ))}
        </h1>
        <div ref={counterRef} className="loader-counter">
          <span className="counter-number">{percent}%</span>
          <span className="counter-sub">ELEVATING SPACES</span>
        </div>
      </div>
    </div>
  );
}
