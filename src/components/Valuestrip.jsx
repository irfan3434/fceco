"use client";
import Link from 'next/link';
import React, { useState, useEffect, useCallback, memo } from 'react';
import { BrainCog, Leaf, ShieldCheck, Globe2, ArrowRight, ExternalLink } from 'lucide-react';
import "./Valuestrip.css"

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(elementRef);
    return () => observer.disconnect();
  }, [elementRef, threshold]);

  return [setElementRef, isVisible];
};

// Custom hook for managing feature animations
const useFeatureAnimations = (featuresLength) => {
  const [animatedItems, setAnimatedItems] = useState(new Set());

  const handleItemAnimation = useCallback((index) => {
    setAnimatedItems(prev => new Set([...prev, index]));
  }, []);

  return { animatedItems, handleItemAnimation };
};

// Memoized feature item component
const FeatureItem = memo(({ feature, index, isVisible, onAnimationComplete }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
        onAnimationComplete(index);
      }, index * 150); // Staggered animation

      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, index, onAnimationComplete]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Could trigger modal or navigation
      console.log(`Activated feature: ${feature.title}`);
    }
  };

  return (
    <li 
      className={`feature-item ${hasAnimated ? 'animate-in' : ''}`}
      style={{ 
        animationDelay: `${index * 150}ms`,
        transform: hasAnimated ? 'translateY(0)' : 'translateY(20px)',
        opacity: hasAnimated ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      tabIndex={0}
      role="button"
      aria-label={`Learn more about ${feature.title}: ${feature.desc}`}
      onKeyPress={handleKeyPress}
    >
      <div className="feature-icon-wrapper">
        <span className="feature-icon" aria-hidden="true">
          <feature.icon size={28} strokeWidth={1.5} />
        </span>
        <div className="icon-glow"></div>
      </div>
      <div className="feature-content">
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-description">{feature.desc}</p>
      </div>
      <div className="feature-hover-indicator" aria-hidden="true">
        <ExternalLink size={16} />
      </div>
    </li>
  );
});

FeatureItem.displayName = 'FeatureItem';

// Main component
export default function HomeTopValueStrip() {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const { animatedItems, handleItemAnimation } = useFeatureAnimations(4);
  const [ctaHovered, setCtaHovered] = useState(false);

  const features = [
    {
      icon: BrainCog,
      title: "AI-Powered Innovation",
      desc: "Integrating cutting-edge AI technologies to drive measurable ecological impact and sustainable solutions.",
    },
    {
      icon: Globe2,
      title: "Sustainable Urban Mastery",
      desc: "Leading experts in city-scale environmental transformation and smart infrastructure development.",
    },
    {
      icon: ShieldCheck,
      title: "Cybersecurity & Trust",
      desc: "Enterprise-grade security protecting data and systems for a sustainable digital future.",
    },
    {
      icon: Leaf,
      title: "Aligned With Vision 2030",
      desc: "Committed partners in Saudi Arabia's ambitious journey toward a sustainable and diversified economy.",
    },
  ];

  const handleCtaClick = useCallback((e) => {
    e.preventDefault();
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <section 
      ref={ref}
      className="value-proposition-strip"
      role="region"
      aria-label="Company value propositions and key features"
    >
      <h2 className="strip-heading">Pillars of Environmental Excellence</h2>
      <div className="strip-container">
        <ul 
          className="features-grid"
          role="list"
          aria-label="Key features and capabilities"
        >
          {features.map((feature, index) => (
            <FeatureItem
              key={feature.title}
              feature={feature}
              index={index}
              isVisible={isVisible}
              onAnimationComplete={handleItemAnimation}
            />
          ))}
        </ul>
        
        <div className={`cta-section ${isVisible ? 'animate-in' : ''}`}>
          <Link href="/services" className='nodec'>
          <button
            className={`cta-button ${ctaHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            aria-label="Explore our services and solutions"

          >
            <span>Explore Services</span>
            <ArrowRight 
              size={18} 
              style={{
                transform: ctaHovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.2s ease'
              }}
            />
          </button>
          </Link>
        </div>
      </div>


    </section>
  );
}