"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Leaf, BrainCog, Globe2, Network, ArrowRight, Sparkles } from 'lucide-react';

import "./problemsolutionbanner.css"
// Custom hook for intersection observer with threshold options
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        if (isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-50px',
        ...options
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasBeenVisible, options]);

  return { elementRef, isVisible, hasBeenVisible };
};

// Custom hook for mouse tracking
const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  }, []);

  return { containerRef, mousePosition, handleMouseMove };
};

// Background Icon Component with enhanced animations
const BackgroundIcon = memo(({ 
  icon: IconComponent, 
  className, 
  position, 
  color, 
  size, 
  isVisible, 
  mousePosition,
  delay = 0 
}) => {
  const [iconRef, setIconRef] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax effect based on mouse position
  const parallaxX = mousePosition ? (mousePosition.x - 50) * 0.1 : 0;
  const parallaxY = mousePosition ? (mousePosition.y - 50) * 0.1 : 0;

  const iconStyle = {
    transform: `
      translate(${parallaxX}px, ${parallaxY}px) 
      rotate(${isVisible ? '360deg' : '0deg'}) 
      scale(${isHovered ? '1.2' : '1'})
    `,
    opacity: isVisible ? 0.15 : 0,
    transition: `
      all 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.3s ease-out
    `,
    transitionDelay: `${delay}ms`,
    filter: `blur(${isHovered ? '0px' : '1px'})`,
    ...position
  };

  return (
    <div
      ref={setIconRef}
      className={`bg-icon ${className}`}
      style={iconStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconComponent size={size} color={color} strokeWidth={1.5} />
      {isHovered && (
        <div className="icon-pulse" style={{ color }} />
      )}
    </div>
  );
});

BackgroundIcon.displayName = 'BackgroundIcon';

// Animated Text Component
const AnimatedText = memo(({ children, className, delay = 0, isVisible }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, delay]);

  return (
    <div
      className={`animated-text ${className} ${hasAnimated ? 'animate-in' : ''}`}
      style={{
        transform: hasAnimated ? 'translateY(0)' : 'translateY(30px)',
        opacity: hasAnimated ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
});

AnimatedText.displayName = 'AnimatedText';

// Enhanced CTA Button
const EnhancedCTA = memo(({ href, children, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    
    // Add click ripple effect
    const button = buttonRef.current;
    if (button) {
      button.classList.add('ripple-effect');
      setTimeout(() => button.classList.remove('ripple-effect'), 600);
    }

    // Smooth scroll to target
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, [href]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`enhanced-cta ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''} ${isPressed ? 'pressed' : ''}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      aria-label="Learn about how we work and our methodology"
    >
      <span className="cta-content">
        <span className="cta-text">{children}</span>
        <ArrowRight 
          size={18} 
          className="cta-arrow"
          style={{
            transform: isHovered ? 'translateX(4px)' : 'translateX(0px)',
            transition: 'transform 0.2s ease'
          }}
        />
      </span>
      <div className="cta-glow" />
      <div className="cta-particles">
        <Sparkles size={16} className="particle-icon" />
      </div>
    </button>
  );
});

EnhancedCTA.displayName = 'EnhancedCTA';

// Main Component
export default function ProblemSolutionBanner() {
  const { elementRef, isVisible, hasBeenVisible } = useIntersectionObserver();
  const { containerRef, mousePosition, handleMouseMove } = useMouseTracking();
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading delay for staggered animations
    const timer = setTimeout(() => setContentLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const backgroundIcons = [
    {
      icon: Leaf,
      className: 'leaf',
      position: { left: '8%', top: '15%' },
      color: '#10b981',
      size: 64,
      delay: 0
    },
    {
      icon: BrainCog,
      className: 'cog',
      position: { right: '10%', top: '12%' },
      color: '#06b6d4',
      size: 76,
      delay: 200
    },
    {
      icon: Network,
      className: 'network',
      position: { left: '20%', bottom: '18%' },
      color: '#0891b2',
      size: 68,
      delay: 400
    },
    {
      icon: Globe2,
      className: 'globe',
      position: { right: '5%', bottom: '15%' },
      color: '#0ea5e9',
      size: 58,
      delay: 600
    }
  ];

  return (
    <section 
      ref={elementRef}
      className={`problem-solution-banner ${hasBeenVisible ? 'has-been-visible' : ''}`}
      role="region"
      aria-label="Problem and solution overview"
    >
      
      <div 
        ref={containerRef}
        className="banner-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {}}
      >
        
        {/* Enhanced Background Icons */}
        <div className="background-icons" aria-hidden="true">
          {backgroundIcons.map((iconConfig, index) => (
            <BackgroundIcon
              key={iconConfig.className}
              {...iconConfig}
              isVisible={hasBeenVisible}
              mousePosition={mousePosition}
            />
          ))}
          
          {/* Floating particles */}
          <div className="floating-particles">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`particle particle-${i}`}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  animationDelay: `${i * 0.5}s`,
                  opacity: hasBeenVisible ? 0.1 : 0
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="banner-content">
          <div className="content-left">
            <AnimatedText 
              className="problem-title" 
              delay={200}
              isVisible={contentLoaded && hasBeenVisible}
            >
              <h2>
                Urban sustainability, compliance, and digital transformation are 
                <span className="highlight-text"> complex challenges</span>
              </h2>
            </AnimatedText>
          </div>

          <div className="content-right">
            <AnimatedText 
              className="solution-text" 
              delay={400}
              isVisible={contentLoaded && hasBeenVisible}
            >
              <p>
                <strong className="brand-highlight">FC ECO</strong> simplifies complexity. 
                We blend IT, AI, and environmental science to deliver scalable, 
                real-world solutions—advancing <span className="vision-highlight">Saudi Vision 2030</span>.
              </p>
            </AnimatedText>

            <div 
              className="cta-wrapper"
              style={{
                opacity: hasBeenVisible ? 1 : 0,
                transform: hasBeenVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 600ms'
              }}
            >
              <EnhancedCTA href="#how-we-work" isVisible={hasBeenVisible}>
                How We Work
              </EnhancedCTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}