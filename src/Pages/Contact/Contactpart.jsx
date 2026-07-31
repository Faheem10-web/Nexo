import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Send, Loader2, Sparkles, MapPin, Phone, Mail } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./Contactpart.css";

export default function Contactpart() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Activate cinematic scroll stagger reveal on landing
  useScrollReveal(sectionRef);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectType: "Residential",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shakeFields, setShakeFields] = useState([]);

  // Focus tracking for floating label transitions
  const [focusedField, setFocusedField] = useState("");

  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "fullName") {
      if (value.trim().length < 3) {
        errorMsg = "Name must be at least 3 characters";
      }
    }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMsg = "Please enter a valid email address";
      }
    }
    if (name === "message") {
      if (value.trim().length === 0) {
        errorMsg = "Please enter your message";
      }
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Dynamic clean-up of validation errors
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    setFocusedField("");
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    if (errorMsg) {
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Comprehensive validation checks
    const newErrors = {};
    const shakeList = [];

    const nameErr = validateField("fullName", formData.fullName);
    if (nameErr) {
      newErrors.fullName = nameErr;
      shakeList.push("fullName");
    }

    const emailErr = validateField("email", formData.email);
    if (emailErr) {
      newErrors.email = emailErr;
      shakeList.push("email");
    }

    const msgErr = validateField("message", formData.message);
    if (msgErr) {
      newErrors.message = msgErr;
      shakeList.push("message");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShakeFields(shakeList);
      // Reset shake state after animation ends
      setTimeout(() => setShakeFields([]), 500);
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury API response lag
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        projectType: "Residential",
        message: ""
      });
    }, 2000);
  };

  const goToProject = () => {
    navigate("/project");
  };

  return (
    <div ref={sectionRef} className="contact-container">
      {/* Parallax Background and overlays */}
      <div className="bg-image-overlay" />
      <div className="contact-glow-radial" />

      <div className="contact-content">
        {/* LEFT: Studio branding copy */}
        <div className="info-section">
          <h1 className="main-heading" data-reveal="heading">
            CREATING <br /> TIMELESS WORK
          </h1>

          <p className="description" data-reveal="paragraph">
            Experience the intersection of heritage craftsmanship and modern
            architectural precision. Our studio transforms raw vision into physical harmony.
          </p>

          {/* Contact Details cards */}
          <div className="contact-details-cards" data-reveal="paragraph">
            <div className="studio-info-row">
              <MapPin size={18} className="info-icon" />
              <span>12 Rue de l'Odéon, 75006 Paris, France</span>
            </div>
            <div className="studio-info-row">
              <Phone size={18} className="info-icon" />
              <span>+33 1 43 25 83 22</span>
            </div>
            <div className="studio-info-row">
              <Mail size={18} className="info-icon" />
              <span>inquiries@nexo-studio.com</span>
            </div>
          </div>

          <button className="view-coll-btn" onClick={goToProject} data-reveal="button">
            <span>View Collections</span>
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* RIGHT: Contact Form container card */}
        <div className="form-card-container" data-reveal="button">
          <div className="glass-card">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="form-title">Begin the Dialogue</h2>

                  <form onSubmit={handleSubmit} className="inquiry-form" noValidate>
                    {/* Full Name field */}
                    <motion.div
                      className={`form-group ${focusedField === "fullName" ? "focused" : ""} ${
                        formData.fullName ? "has-value" : ""
                      } ${errors.fullName ? "error" : ""}`}
                      animate={shakeFields.includes("fullName") ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("fullName")}
                        onBlur={handleBlur}
                        placeholder={focusedField === "fullName" ? "" : "Alexander Vestige"}
                        autoComplete="name"
                      />
                      {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </motion.div>

                    {/* Email field */}
                    <motion.div
                      className={`form-group ${focusedField === "email" ? "focused" : ""} ${
                        formData.email ? "has-value" : ""
                      } ${errors.email ? "error" : ""}`}
                      animate={shakeFields.includes("email") ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={handleBlur}
                        placeholder={focusedField === "email" ? "" : "alexander@vestige.com"}
                        autoComplete="email"
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </motion.div>

                    {/* Row split: Phone & Type */}
                    <div className="form-row">
                      <div
                        className={`form-group half-width ${focusedField === "phone" ? "focused" : ""} ${
                          formData.phone ? "has-value" : ""
                        }`}
                      >
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField("")}
                          placeholder={focusedField === "phone" ? "" : "+1 234 567"}
                          autoComplete="tel"
                        />
                      </div>

                      <div className="form-group half-width select-wrapper">
                        <label htmlFor="projectType">Project Type</label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Restoration">Restoration</option>
                        </select>
                      </div>
                    </div>

                    {/* Message textarea */}
                    <motion.div
                      className={`form-group ${focusedField === "message" ? "focused" : ""} ${
                        formData.message ? "has-value" : ""
                      } ${errors.message ? "error" : ""}`}
                      animate={shakeFields.includes("message") ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={handleBlur}
                        placeholder={focusedField === "message" ? "" : "Describe your vision..."}
                        rows="4"
                      />
                      {errors.message && <span className="error-text">{errors.message}</span>}
                    </motion.div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="submit-button"
                      disabled={isSubmitting}
                      aria-label="Send Inquiry form"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="spinner" />
                          <span>Delivering...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="success-overlay"
                >
                  <div className="success-icon-wrapper">
                    <CheckCircle2 size={48} className="success-icon" />
                    <Sparkles size={24} className="sparkle-icon" />
                  </div>
                  <h3>Dialogue Initiated</h3>
                  <p>
                    Thank you for sharing your vision with NEXO. A design consultant will contact you shortly.
                  </p>
                  <button className="success-back-btn" onClick={() => setIsSuccess(false)}>
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}