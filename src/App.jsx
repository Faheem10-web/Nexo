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
import SmallLazyLoader from "./Components/SmallLazyLoader";

// Lazy-loaded pages for optimized performance
const Home = React.lazy(() => import("./Pages/Home/Home"));
const About = React.lazy(() => import("./Pages/About/About"));
const Project = React.lazy(() => import("./Pages/Project/Project"));
const Contact = React.lazy(() => import("./Pages/Contact/Contact"));

// Page transition fallback using SmallLazyLoader
function PageSkeleton() {
  return <SmallLazyLoader fullScreen text="NEXO STUDIO" size="md" variant="spinner" />;
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
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

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
        <Suspense fallback={<PageSkeleton />}>
          <Header />
          <main className="main-content" id="main-content" tabIndex="-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/project" element={<Project />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;