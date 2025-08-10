"use client";
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { User, Building2, Target, Lightbulb, ChevronRight, Award, Users, Globe } from 'lucide-react';
import "./about.css"

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState(null);

  const observer = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold }
          )
        : null,
    [threshold]
  );

  useEffect(() => {
    if (!element || !observer) return;
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, observer]);

  return [setElement, isVisible];
};

// Custom hook for image loading state
const useImageLoader = (src) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);
    img.src = src;
  }, [src]);

  return { isLoaded, hasError };
};

// Enhanced Image Component with loading states
const EnhancedImage = React.memo(({ src, alt, className = "", priority = false }) => {
  const { isLoaded, hasError } = useImageLoader(src);
  
  return (
    <div className={`image-container ${className}`}>
      {!isLoaded && !hasError && (
        <div className="image-skeleton" role="img" aria-label="Loading image">
          <div className="skeleton-animation"></div>
        </div>
      )}
      {hasError && (
        <div className="image-error" role="img" aria-label="Failed to load image">
          <Building2 size={48} className="error-icon" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`main-image ${isLoaded ? 'loaded' : ''}`}
        loading={priority ? 'eager' : 'lazy'}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
    </div>
  );
});

// Content Section Component
const ContentSection = React.memo(({ 
  title, 
  content, 
  imageSrc, 
  imageAlt, 
  icon: Icon, 
  reversed = false,
  priority = false 
}) => {
  const [setRef, isVisible] = useIntersectionObserver(0.2);

  return (
    <section 
      ref={setRef}
      className={`content-section ${reversed ? 'reversed' : ''} ${isVisible ? 'animate-in' : ''}`}
      role="region"
      aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="content-wrapper">
        <div className="text-content">
          <div className="title-wrapper">
            {Icon && <Icon className="section-icon" size={32} aria-hidden="true" />}
            <h2 id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</h2>
          </div>
          <p>{content}</p>
        </div>
        <div className="image-content">
          <EnhancedImage 
            src={imageSrc} 
            alt={imageAlt} 
            priority={priority}
          />
        </div>
      </div>
    </section>
  );
});

// Stats Component
const StatsSection = React.memo(() => {
  const [setRef, isVisible] = useIntersectionObserver(0.3);
  
  const stats = [
    { icon: Users, value: "20+", label: "Clients Served" },
    { icon: Globe, value: "5+", label: "Cities Transformed" },
    { icon: Award, value: "2+", label: "Industry Awards" },
    { icon: Target, value: "95%", label: "Client Satisfaction" }
  ];

  return (
    <section ref={setRef} className={`stats-section ${isVisible ? 'animate-in' : ''}`}>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ '--delay': `${index * 0.1}s` }}>
            <stat.icon className="stat-icon" size={24} aria-hidden="true" />
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
});

// Main About Component
export default function About() {
  const CEO_MESSAGE = `At FC ECO, we are dedicated to leveraging technology to drive positive environmental change. By integrating Information Technology (IT) and Artificial Intelligence (AI), we create innovative, sustainable solutions that empower businesses, governments, and communities to address global ecological challenges. Our team combines cutting-edge technology with environmental expertise to build smart systems that optimize resource management, reduce carbon footprints, and promote eco-friendly practices. In collaboration with leading academic institutions and environmental organizations, we ensure our solutions are rooted in the latest scientific research. Together, we are paving the way toward a smarter, greener, and more sustainable future.`;
  const CEO_IMAGE = "/assets/6.webp";
  const COMPANY_NAME = "FC ECO";
  const COMPANY_INTRO = `FC ECO is a pioneering technology company that leverages Information Technology (IT) and Artificial Intelligence (AI) to address global environmental challenges. We develop innovative, sustainable solutions for businesses, governments, and communities worldwide. Our interdisciplinary team combines cutting-edge technology with environmental expertise to create scalable, eco-friendly systems. We collaborate with academic institutions and environmental organizations to ensure our solutions are grounded in the latest scientific research.`;
  const COMPANY_IMAGE = "/assets/5.webp";

  return (
    <div id="about-us-page" className="about-us-container">
      {/* Hero Section */}
      <section className="about-hero-section" role="banner">
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            Transforming Tomorrow Through 
            <span className="gradient-text"> Sustainable Innovation</span>
          </h1>
          <p className="about-hero-subtitle">
            Where technology meets environmental responsibility
          </p>
        </div>
      </section>

      {/* CEO Message Section */}
      <ContentSection
        title="Message from Our CEO"
        content={CEO_MESSAGE}
        imageSrc={CEO_IMAGE}
        imageAlt="CEO of FC ECO"
        icon={User}
        priority={true}
      />

      {/* Stats Section */}
      <StatsSection />

      {/* Company Intro Section */}
      <ContentSection
        title={`About ${COMPANY_NAME}`}
        content={COMPANY_INTRO}
        imageSrc={COMPANY_IMAGE}
        imageAlt="FC ECO team and office"
        icon={Building2}
        reversed={true}
      />


    </div>
  );
}