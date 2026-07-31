import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import ProjectDetailModal from "./ProjectDetailModal";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Portfolio.css";

export default function Portfolio({ activeTab }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  // Activate cinematic scroll stagger reveal on scroll-in
  useScrollReveal(sectionRef);
  
  const projects = [
    {
      id: 1,
      title: "LAKEVIEW RESIDENCE",
      category: "LIVING",
      image: "/assets/Portfolio.1.png",
      location: "Geneva, Switzerland",
      year: "2025",
      area: "4,200 Sq.Ft",
      status: "Completed",
      style: "Modern Minimalist",
      description: "A striking residential interior project overlooking Lake Geneva. Features refined oak panels, bespoke travertine fireplace, and customized Italian leather furnishings that capture natural light reflecting off the water.",
      gallery: ["/assets/Portfolio.1.png", "/assets/Explore.1.png", "/assets/Aesthetic-1.png"]
    },
    {
      id: 2,
      title: "CALACATTA KITCHEN",
      category: "KITCHEN",
      image: "/assets/Portfolio.2.png",
      location: "Milan, Italy",
      year: "2024",
      area: "650 Sq.Ft",
      status: "Completed",
      style: "Contemporary Luxury",
      description: "A culinary sanctuary integrating Calacatta marble slab details, brass handles, concealed high-tech appliances, and a dramatic cantilevered breakfast bar crafted for gourmet hosting.",
      gallery: ["/assets/Portfolio.2.png", "/assets/Explore.4.png", "/assets/items.png"]
    },
    {
      id: 3,
      title: "HORIZON OFFICES",
      category: "COMMERCIAL",
      image: "/assets/Portfolio.3.png",
      location: "London, UK",
      year: "2025",
      area: "12,500 Sq.Ft",
      status: "Completed",
      style: "Warm Industrial",
      description: "An open-plan workplace combining polished concrete, acoustic glass walls, customized ergonomic modular desk hubs, and wellness pods to inspire creativity and focus.",
      gallery: ["/assets/Portfolio.3.png", "/assets/Portfolio.8.png", "/assets/Explore.4.png"]
    },
    {
      id: 4,
      title: "MINIMAL BEDROOM",
      category: "BEDROOM",
      image: "/assets/Portfolio.4.png",
      location: "Kyoto, Japan",
      year: "2024",
      area: "420 Sq.Ft",
      status: "Completed",
      style: "Japandi Style",
      description: "A serene sleep haven embracing wabi-sabi elements, features paper lantern lighting fixtures, tatami textures, and oak slide panels separating the vanity area.",
      gallery: ["/assets/Portfolio.4.png", "/assets/Explore.3.jpg", "/assets/Portfolio.1.png"]
    },
    {
      id: 5,
      title: "LUXURY DINING",
      category: "DINING",
      image: "/assets/Portfolio.5.png",
      location: "Paris, France",
      year: "2025",
      area: "580 Sq.Ft",
      status: "Completed",
      style: "Haussmannian Modern",
      description: "A sophisticated dining salon featuring original Haussmann paneling updated with matte black moldings, crystal ring chandelier, and velvet shell chairs.",
      gallery: ["/assets/Portfolio.5.png", "/assets/Explore.7.jpg", "/assets/Porfolio.20.png"]
    },
    {
      id: 6,
      title: "MODERN VILLA",
      category: "ARCHITECTURE",
      image: "/assets/Porfolio.6.png",
      location: "Malibu, California",
      year: "2025",
      area: "6,800 Sq.Ft",
      status: "Completed",
      style: "Coastal Brutalism",
      description: "A striking structure of board-formed concrete and structural glass, stepping down a Malibu cliff. Designed to maximize panoramic Pacific vistas while providing total privacy.",
      gallery: ["/assets/Porfolio.6.png", "/assets/Explore.1.png", "/assets/Explore.5.png"]
    },
    {
      id: 7,
      title: "ELEGANT LOUNGE",
      category: "INTERIOR",
      image: "/assets/Explore.7.jpg",
      location: "New York City, USA",
      year: "2024",
      area: "1,200 Sq.Ft",
      status: "Completed",
      style: "Mid-Century Modernist",
      description: "A chic lounge space blending rosewood shelves, custom brass details, vintage leather armchairs, and floor-to-ceiling glass looking out over the skyline.",
      gallery: ["/assets/Explore.7.jpg", "/assets/Porfolio.6.png", "/assets/Portfolio.9.png"]
    },
    {
      id: 8,
      title: "WOODEN WORKSPACE",
      category: "OFFICE",
      image: "/assets/Portfolio.8.png",
      location: "Munich, Germany",
      year: "2025",
      area: "350 Sq.Ft",
      status: "Completed",
      style: "Eco-Minimalism",
      description: "A home office utilizing sustainably sourced black forest timber, dynamic backlighting controls, built-in hidden storage wall cabinets, and custom executive desk panels.",
      gallery: ["/assets/Portfolio.8.png", "/assets/Portfolio.3.png", "/assets/Explore.3.jpg"]
    },
    {
      id: 9,
      title: "PREMIUM APARTMENT",
      category: "LUXURY",
      image: "/assets/Portfolio.9.png",
      location: "Tokyo, Japan",
      year: "2025",
      area: "1,850 Sq.Ft",
      status: "Completed",
      style: "Metropolitan Luxury",
      description: "A penthouse residence utilizing high-gloss panels, metal trims, and custom ambient controls. Accented with dark walnut floors and customized sculpture displays.",
      gallery: ["/assets/Portfolio.9.png", "/assets/Porfolio.6.png", "/assets/Explore.6.png"]
    }
  ];

  // Category Tab Filter Mapping
  const filteredProjects = useMemo(() => {
    if (activeTab === "ALL") return projects;
    return projects.filter((project) => {
      const cat = project.category.toUpperCase();
      if (activeTab === "LIVING") {
        return ["LIVING", "BEDROOM", "DINING", "INTERIOR", "LUXURY"].includes(cat);
      }
      if (activeTab === "KITCHEN") {
        return cat === "KITCHEN";
      }
      if (activeTab === "COMMERCIAL") {
        return ["COMMERCIAL", "OFFICE"].includes(cat);
      }
      if (activeTab === "WELLNESS") {
        return ["ARCHITECTURE", "WELLNESS"].includes(cat);
      }
      return false;
    });
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="portfolio" aria-label="Portfolio Grid Section">
      {/* Grid wrapper */}
      <div className="portfolio-grid">
        <AnimatePresence mode="wait">
          {filteredProjects.map((item) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="portfolio-card"
              key={item.id}
              onClick={() => setSelectedProject(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(item);
                }
              }}
              aria-label={`View details for project ${item.title}`}
              data-reveal="image"
            >
              <div className="image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  width="600"
                  height="600"
                />
                <div className="card-image-overlay" />
              </div>

              <div className="card-content">
                <div>
                  <h2>{item.title}</h2>
                  <span>{item.category}</span>
                </div>

                <button className="card-btn-arrow" aria-hidden="true">
                  <FaArrowRight />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Cinematic Detail Viewer Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}