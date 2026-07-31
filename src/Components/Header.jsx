import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import * as bootstrap from "bootstrap";

import "./Header.css";

export default function Header() {

  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  // Mobile Menu Drawer State
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Dark/Light Theme State
  const [theme, setTheme] = useState(() => {
    return (
      document.documentElement.getAttribute("data-theme") ||
      localStorage.getItem("nexo-theme") ||
      "light"
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("nexo-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const isContactPage = location.pathname === "/contact";

  const isDarkTopPage =
    location.pathname === "/" ||
    location.pathname === "/about" ||
    location.pathname === "/project" ||
    isContactPage;

  const isScrolledState = isContactPage ? false : scrolled || !isDarkTopPage;

  /* =========================
     SCROLL NAVBAR (AUTO HIDE & SHOW)
  ========================= */

  useEffect(() => {
    let lastScroll = window.scrollY || 0;
    let ticking = false;

    const updateScroll = () => {
      const currentScroll = window.scrollY || 0;

      // Update scrolled state when past top offset
      setScrolled(currentScroll > 30);

      // Never hide navbar if mobile menu is currently open
      if (menuOpen) {
        setShowNavbar(true);
        lastScroll = currentScroll;
        ticking = false;
        return;
      }

      const diff = currentScroll - lastScroll;

      if (currentScroll > 120) {
        if (diff > 6) {
          // Scrolling DOWN -> HIDE navbar
          setShowNavbar(false);
        } else if (diff < -6) {
          // Scrolling UP -> SHOW navbar
          setShowNavbar(true);
        }
      } else {
        // Near top of page -> ALWAYS SHOW navbar
        setShowNavbar(true);
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Sync with Lenis smooth scroll instance if active
    if (window.lenis) {
      window.lenis.on("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (window.lenis) {
        window.lenis.off("scroll", handleScroll);
      }
    };
  }, [menuOpen]);

  /* =========================
     AUTO CLOSE MOBILE MENU
  ========================= */

  useEffect(() => {

    const navbar = document.getElementById("navbarContent");

    if (!navbar) return;

    let timer;

    const handleShown = () => {

      clearTimeout(timer);

      timer = setTimeout(() => {

        if (navbar.classList.contains("show")) {

          const bsCollapse =
            bootstrap.Collapse.getInstance(navbar);

          bsCollapse?.hide();

        }

      }, 3000);

    };

    navbar.addEventListener(
      "shown.bs.collapse",
      handleShown
    );

    return () => {

      clearTimeout(timer);

      navbar.removeEventListener(
        "shown.bs.collapse",
        handleShown
      );

    };

  }, []);

  /* =========================
     PROJECT NAVIGATION
  ========================= */

  const goToProject = () => {
    navigate("/project");
  };

  return (
    <header
      className={`
        navbar-wrapper
        ${isScrolledState ? "scrolled" : ""}
        ${showNavbar ? "show-navbar" : "hide-navbar"}
      `}
    >

      <nav className="navbar navbar-expand-lg custom-navbar">

        <div className="container-fluid px-lg-4 px-2">

          {/* LOGO */}
          <NavLink
            className="navbar-brand d-flex align-items-center"
            to="/"
          >
            <img
              src={isScrolledState && theme === "light" ? "/darklogo.png" : "/logo.png"}
              alt="NEXO Interior Studio Logo"
              className="logo-img"
              width="145"
              height="40"
              decoding="async"
              fetchPriority="high"
            />
          </NavLink>

          {/* TOGGLE */}
          <button
            className={`navbar-toggler ms-auto ${menuOpen ? "" : "collapsed"}`}
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarContent"
            aria-expanded={menuOpen ? "true" : "false"}
            aria-label="Toggle navigation menu"
          >
            <div className="custom-toggler">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* MENU */}
          <div
            className={`collapse navbar-collapse justify-content-center ${menuOpen ? "show" : ""}`}
            id="navbarContent"
          >
            <ul className="navbar-nav nav-center">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active-link"
                      : "nav-link"
                  }
                  to="/"
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active-link"
                      : "nav-link"
                  }
                  to="/about"
                  onClick={closeMenu}
                >
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active-link"
                      : "nav-link"
                  }
                  to="/project"
                  onClick={closeMenu}
                >
                  Project
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active-link"
                      : "nav-link"
                  }
                  to="/contact"
                  onClick={closeMenu}
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            {/* MOBILE INNER ACTIONS (INSIDE EXPANDED MENU) */}
            <div className="mobile-inner-actions d-lg-none mt-4 pt-3 border-top w-100 d-flex flex-column align-items-center gap-3">
              <button
                className="theme-toggle-btn mobile-theme-btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
              </button>

              <button
                className="explore-btn w-100"
                onClick={goToProject}
              >
                Explore Collection
              </button>
            </div>

          </div>

          {/* DESKTOP ACTIONS & THEME TOGGLE */}
          <div className="desktop-actions d-none d-lg-flex align-items-center gap-3">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              className="explore-btn"
              onClick={goToProject}
            >
              Explore Collection
            </button>
          </div>

        </div>

      </nav>

    </header>
  );
}