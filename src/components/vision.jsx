"use client";

import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import "./vision.css"

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting];
};
 
// Custom hook for responsive breakpoints
const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState('desktop');

  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.innerWidth < 480) setBreakpoint('mobile');
      else if (window.innerWidth < 768) setBreakpoint('tablet');
      else if (window.innerWidth < 1024) setBreakpoint('laptop');
      else setBreakpoint('desktop');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};

// Enhanced Image Component with lazy loading and error handling
const EnhancedImage = memo(({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageRef, isVisible] = useIntersectionObserver();

  return (
    <div ref={imageRef} className={`vm-image-container ${className}`}>
      {isVisible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`vm-image ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
          {...props}
        />
      )}
      {!isLoaded && !hasError && <div className="vm-image-skeleton" />}
      {hasError && <div className="vm-image-fallback">Image unavailable</div>}
    </div>
  );
});

// Animated Counter Component
const AnimatedCounter = memo(({ points, title, icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={`vm-panel ${isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="vm-panel-header">
        <div className="vm-panel-icon">{icon}</div>
        <h3 className="vm-subtitle">{title}</h3>
      </div>
      <ul className="vm-list">
        {points.map((point, index) => (
          <li 
            key={point}
            className={isVisible ? 'animate-in' : ''}
            style={{ animationDelay: `${delay + (index * 100)}ms` }}
          >
            <span className="vm-list-marker">●</span>
            <span className="vm-list-text">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

// Enhanced CTA Button with ripple effect
const CTAButton = memo(({ variant = 'primary', children, href, onClick, ...props }) => {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    
    // Create ripple effect
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={buttonRef}
      className={`vm-btn vm-btn-${variant}`}
      href={href}
      onClick={handleClick}
      {...props}
    >
      <span className="vm-btn-content">{children}</span>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="vm-btn-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </Component>
  );
});

// Main Component
const MISSION_POINTS = [
  "Innovate for ecological sustainability using advanced IT & AI",
  "Create sustainable urban environments prioritizing well‑being",
  "Collaborate with government and private entities for real impact",
  "Advance Saudi Vision 2030 through measurable environmental progress"
];

const VISION_POINTS = [
  "Be the premier consultancy leading sustainable urban transformation",
  "Pioneer advanced technologies to build resilient, eco‑friendly cities",
  "Position the Kingdom as a global leader in environmental sustainability",
  "Foster vibrant spaces that promote economy, society, and the environment"
];

export default function VisionMissionBanner({
  title = "Our Vision & Mission",
  subtitle = "Transforming tomorrow through sustainable innovation",
  imageLeft = "/assets/98.webp",
  imageRight = "/assets/99.webp",
  ctaPrimary = { label: "How We Work", href: "/about" },
  ctaSecondary = { label: "See Our Impact", href: "/projects" },
  className = "",
  ...props
}) {
  const [bannerRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const breakpoint = useResponsive();

  // Memoize icons to prevent re-renders
  const icons = useMemo(() => ({
    vision: "🚀",
    mission: "🎯"
  }), []);

  const isMobile = breakpoint === 'mobile' || breakpoint === 'tablet';

  return (
    <section 
      ref={bannerRef}
      className={`vm-banner ${isVisible ? 'banner-visible' : ''} ${className}`}
      aria-labelledby="vm-heading"
      {...props}
    >
      {/* Animated background elements */}
      <div className="vm-bg-elements">
        <div className="vm-bg-circle vm-bg-circle-1"></div>
        <div className="vm-bg-circle vm-bg-circle-2"></div>
        <div className="vm-bg-gradient"></div>
      </div>

      {/* Media Grid */}
      <div className="vm-media">
        <EnhancedImage
          src={imageLeft}
          alt="Vision: Sustainable urban transformation"
          className="vm-media-half vm-media-vision"
        />
        <EnhancedImage
          src={imageRight}
          alt="Mission: Environmental innovation and collaboration"
          className="vm-media-half vm-media-mission"
        />
        <div className="vm-media-overlay">
          <div className="vm-media-text">Innovation in Action</div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="vm-content">
        <div className="vm-box">
          <header className="vm-header">
            <div className="vm-header-badge">Sustainability Leaders</div>
            <h2 id="vm-heading" className="vm-title">
              {title}
            </h2>
            {subtitle && (
              <p className="vm-subtitle-main">{subtitle}</p>
            )}
          </header>

          <div className="vm-panels">
            <AnimatedCounter
              points={VISION_POINTS}
              title="Vision"
              icon={icons.vision}
              delay={200}
            />
            <AnimatedCounter
              points={MISSION_POINTS}
              title="Mission"
              icon={icons.mission}
              delay={400}
            />
          </div>

          <div className="vm-ctas">
            <CTAButton variant="primary" href={ctaPrimary.href}>
              {ctaPrimary.label}
              <span className="vm-btn-arrow">→</span>
            </CTAButton>
            <CTAButton variant="secondary" href={ctaSecondary.href}>
              {ctaSecondary.label}
            </CTAButton>
          </div>

          {/* Progress indicator */}
          <div className="vm-progress-bar">
            <div className={`vm-progress-fill ${isVisible ? 'animate' : ''}`}></div>
          </div>
        </div>
      </div>


    </section>
  );
}