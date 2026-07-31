import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Register GSAP ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Lazy-loaded pages for optimized performance
const Home = React.lazy(() => import("./Pages/Home/Home"));
const About = React.lazy(() => import("./Pages/About/About"));
const Project = React.lazy(() => import("./Pages/Project/Project"));
const Contact = React.lazy(() => import("./Pages/Contact/Contact"));

// Elegant skeleton placeholder to avoid CLS (Cumulative Layout Shift)
function PageSkeleton() {
  return (
    <div 
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-bg-dark, #0d0b09)",
        color: "var(--color-gold, #c9a57c)",
        fontFamily: "var(--font-accent, sans-serif)",
        fontSize: "12px",
        letterSpacing: "4px",
        textTransform: "uppercase"
      }}
      aria-live="polite"
      aria-label="Loading page contents"
    >
      <div className="skeleton-spinner" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <span>✦</span> Loading Space
      </div>
    </div>
  );
}

// Global ScrollToTop helper to reset viewport and Lenis scrolls on route change
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Prevent browser auto scroll restoration from overriding route change scroll reset
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    };

    resetScroll();

    const rafId = requestAnimationFrame(resetScroll);
    const timer1 = setTimeout(resetScroll, 50);
    const timer2 = setTimeout(resetScroll, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [location.pathname, location.search, location.key]);

  return null;
}

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.4,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;
    lenis.scrollTo(0, { immediate: true });

    // Connect Lenis with ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update);

    // Synchronize Lenis scroll RAF cycle with the GSAP ticker
    const updateTick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTick);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Header />
        <main className="main-content" id="main-content" tabIndex="-1">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/project" element={<Project />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;