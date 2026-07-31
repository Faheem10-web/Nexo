import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {

  const [shopOpen, setShopOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  return (
    <footer className="footer">

      <div className="container">

        <div className="row footer-row">

          {/* LEFT */}
          <div className="col-lg-4 col-md-12">

            <div className="footer-brand">

              <Link to="/" className="footer-logo">
                <img
                  src="/logo.png"
                  alt="NEXO Logo"
                  className="footer-logo-img"
                  width="150"
                  height="42"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </Link>

              <p className="footer-text">
                Creating elegant interiors with
                modern luxury, timeless comfort,
                and aesthetic living.
              </p>

              {/* SOCIAL */}
              <div className="footer-social">

                <Link to="/">
                  <i className="fa-brands fa-instagram"></i>
                </Link>

                <Link to="/">
                  <i className="fa-brands fa-linkedin-in"></i>
                </Link>

                <Link to="/">
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>

              </div>

            </div>

          </div>

          {/* DESKTOP */}
          <div className="col-lg-2 d-none d-lg-block">

            <div className="footer-column">

              <h3>Shop</h3>

              <Link to="/">Living Room</Link>
              <Link to="/">Bedroom</Link>
              <Link to="/">Decor</Link>
              <Link to="/">Luxury Frames</Link>

            </div>

          </div>

          <div className="col-lg-2 d-none d-lg-block">

            <div className="footer-column">

              <h3>Company</h3>

              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/">Careers</Link>
              <Link to="/">Press</Link>

            </div>

          </div>

          {/* NEWSLETTER */}
          <div className="col-lg-4 col-md-12">

            <div className="newsletter-section">

              <h3>Newsletter</h3>

              <p>
                Get latest collections and interior inspiration.
              </p>

              <div className="newsletter-box">

                <input
                  type="email"
                  placeholder="Email Address"
                />

                <button>
                  Subscribe
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* MOBILE ACCORDION */}
        <div className="mobile-footer d-lg-none">

          {/* SHOP */}
          <div className="mobile-column">

            <button
              className="mobile-title"
              onClick={() => setShopOpen(!shopOpen)}
            >
              <span>Shop</span>

              <i className={`fa-solid ${shopOpen ? "fa-minus" : "fa-plus"}`}></i>
            </button>

            <div className={`mobile-links ${shopOpen ? "active" : ""}`}>

              <Link to="/">Living Room</Link>
              <Link to="/">Bedroom</Link>
              <Link to="/">Decor</Link>
              <Link to="/">Luxury Frames</Link>

            </div>

          </div>

          {/* COMPANY */}
          <div className="mobile-column">

            <button
              className="mobile-title"
              onClick={() => setCompanyOpen(!companyOpen)}
            >
              <span>Company</span>

              <i className={`fa-solid ${companyOpen ? "fa-minus" : "fa-plus"}`}></i>
            </button>

            <div className={`mobile-links ${companyOpen ? "active" : ""}`}>

              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/">Careers</Link>
              <Link to="/">Press</Link>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">

          <p>
            © 2026 NEXO Interiors. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;