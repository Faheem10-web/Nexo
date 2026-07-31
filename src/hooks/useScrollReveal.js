import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * APPLE / LINEAR LEVEL PREMIUM SCROLL REVEAL
 * ------------------------------------------
 * FEATURES:
 * ✅ Ultra smooth 60FPS
 * ✅ No lag / no heavy GPU effects
 * ✅ Apple-style subtle motion
 * ✅ Mobile optimized
 * ✅ Auto cleanup
 * ✅ Perfect stagger timing
 * ✅ Luxury image reveal
 * ✅ No blur abuse
 * ✅ No rotate madness
 * ✅ Fast premium feel
 *
 * USAGE:
 *
 * <section ref={containerRef}>
 *   <h2 data-reveal>Heading</h2>
 *   <p data-reveal>Paragraph</p>
 *   <div data-reveal className="reveal-image">
 *      <img src="" />
 *   </div>
 * </section>
 */

export default function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Accessibility
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealElements = container.querySelectorAll("[data-reveal]");

    // Reduced motion support
    if (prefersReducedMotion) {
      gsap.set(revealElements, {
        opacity: 1,
        y: 0,
        clearProps: "all",
      });

      return;
    }

    // Device detection
    const isMobile = window.innerWidth < 768;

    // Performance optimized values
    const moveY = isMobile ? 20 : 32;
    const duration = isMobile ? 0.8 : 1;
    const stagger = isMobile ? 0.06 : 0.08;

    // Initial states
    gsap.set(revealElements, {
      opacity: 0,
      y: moveY,
      force3D: true,
      willChange: "transform, opacity",
    });

    // Luxury image setup
    const images = container.querySelectorAll(".reveal-image img");

    if (images.length) {
      gsap.set(images, {
        scale: 1.08,
        force3D: true,
        willChange: "transform",
      });
    }

    // Main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 88%",
        toggleActions: "play none none reset",
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
    });

    // Main reveal animation
    tl.to(revealElements, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
      clearProps: "willChange",
    });

    // Luxury image movement
    if (images.length) {
      tl.to(
        images,
        {
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
          stagger: 0.1,
          clearProps: "willChange",
        },
        0
      );
    }

    // Refresh after layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    // Cleanup
    return () => {
      clearTimeout(refreshTimer);

      tl.kill();

      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, [containerRef]);
}