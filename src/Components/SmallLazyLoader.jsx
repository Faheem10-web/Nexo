import React from "react";
import "./SmallLazyLoader.css";

/**
 * SmallLazyLoader
 * Lightweight, aesthetic luxury loader component for lazy-loaded routes,
 * image placeholders, and async state feedback.
 */
export default function SmallLazyLoader({
  size = "md",
  variant = "spinner",
  text = null,
  color = null,
  fullScreen = false,
  centered = false,
  className = "",
  style = {}
}) {
  // Compute pixel dimension based on preset or raw number
  const getSizePx = (s) => {
    if (typeof s === "number") return s;
    switch (s) {
      case "sm":
        return 20;
      case "lg":
        return 48;
      case "md":
      default:
        return 32;
    }
  };

  const pxSize = getSizePx(size);

  const containerClasses = [
    "nexo-lazy-loader-container",
    fullScreen ? "full-screen" : "",
    centered ? "centered" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  const customColorStyle = color
    ? {
        "--color-accent": color,
        ...style
      }
    : style;

  return (
    <div
      className={containerClasses}
      style={customColorStyle}
      role="status"
      aria-live="polite"
      aria-label={text || "Loading content"}
    >
      {variant === "spinner" && (
        <div
          className="nexo-small-spinner"
          style={{ width: `${pxSize}px`, height: `${pxSize}px` }}
        >
          <div className="nexo-small-spinner-track" />
          <div className="nexo-small-spinner-head" />
          {pxSize >= 28 && <span className="nexo-small-spinner-sparkle">✦</span>}
        </div>
      )}

      {variant === "pulse" && (
        <div
          className="nexo-small-pulse"
          style={{ width: `${pxSize}px`, height: `${pxSize}px` }}
        />
      )}

      {variant === "dots" && (
        <div className="nexo-small-dots">
          <span />
          <span />
          <span />
        </div>
      )}

      {text && <span className="nexo-lazy-loader-text">{text}</span>}
    </div>
  );
}
