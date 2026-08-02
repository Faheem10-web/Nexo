import React, { useState } from "react";
import SmallLazyLoader from "./SmallLazyLoader";
import "./LazyImage.css";

/**
 * LazyImage Component
 * Wraps responsive img tags with a small lazy loader placeholder until image load finishes.
 */
export default function LazyImage({
  src,
  alt = "",
  className = "",
  wrapperClassName = "",
  loaderSize = "sm",
  loaderText = null,
  style = {},
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`nexo-lazy-image-wrapper ${wrapperClassName}`}>
      {!isLoaded && !hasError && (
        <div className="nexo-lazy-image-loader">
          <SmallLazyLoader size={loaderSize} text={loaderText} variant="spinner" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`nexo-lazy-image-element ${isLoaded ? "loaded" : ""} ${className}`}
        style={style}
        {...props}
      />
    </div>
  );
}
