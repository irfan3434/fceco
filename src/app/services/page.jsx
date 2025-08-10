"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';

import "./services.css"

// Custom hook for services filtering
const useServicesFilter = (services) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredServices = useMemo(() => {
    if (activeFilter === 'all') return services;
    return services.filter(service => service.category === activeFilter);
  }, [services, activeFilter]);

  return { activeFilter, setActiveFilter, filteredServices };
};

// Custom hook for card interactions
const useCardInteractions = () => {
  const [activeCardId, setActiveCardId] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const handleCardClick = useCallback((cardId) => {
    setActiveCardId(prev => prev === cardId ? null : cardId);
  }, []);

  const handleCardHover = useCallback((cardId) => {
    setHoveredCardId(cardId);
  }, []);

  const handleClickOutside = useCallback((event) => {
    const target = event.target;
    if (!target.closest('.service-card')) {
      setActiveCardId(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return {
    activeCardId,
    hoveredCardId,
    handleCardClick,
    handleCardHover
  };
};

// Sample data (replace with your actual data source)
const servicesData = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    category: 'IT',
    shortDescription: ['AI Software Development', 'AI Integration Services'],
    detailedDescription: 'FCECO offers tailored AI solutions that optimize business processes, enhance decision-making, and drive innovation. Our services seamlessly integrate AI technologies into existing systems, automating processes and improving efficiency with minimal disruption.',
    imageUrl: '/assets/11.webp',
    imageAlt: 'Artificial Intelligence Services'
  },
  {
    id: 'drones-usage',
    title: 'Drones Utilization',
    category: 'Environmental',
    shortDescription: ['Aerial Surveys', 'Geographic Information Systems'],
    detailedDescription: 'Use of Drones In Aerial Surveys and Geographic Information Systems to provide a faster, more cost-effective, and versatile way to collect and analyze spatial data. Enabling high-resolution imagery capture and accurate mapping, transforming various fields like urban planning, environmental monitoring, and disaster management.',
    imageUrl: '/assets/20.webp',
    imageAlt: 'Drones Utilization Services'
  },
  {
    id: 'cctv',
    title: 'CCTV',
    category: 'IT',
    shortDescription: ['CCTV Operations', 'CCTV Management'],
    detailedDescription: 'We are renowned for providing comprehensive CCTV solutions with advanced surveillance systems designed to ensure 24/7 security. Our systems offer real-time monitoring, high-quality recording, and intelligent analytics that detect unusual activity, enhance situational awareness, and enable quick response to potential threats.',
    imageUrl: '/assets/12.webp',
    imageAlt: 'CCTV Security Solutions'
  },
  {
    id: 'GIS',
    title: 'GIS',
    category: 'IT',
    shortDescription: ['GIS Services', 'GIS WEB Applications'],
    detailedDescription: 'FCECO leverages web technologies to manage, analyze, and visualize spatial data, enabling access and interaction with geographic information through web browsers, mobile apps, or other client interfaces, allows users to access and share spatial information from anywhere with an internet connection, fostering collaboration and knowledge sharing. ',
    imageUrl: '/assets/21.webp',
    imageAlt: 'GIS Applications'
  },
  {
    id: 'access-control',
    title: 'Access Control',
    category: 'IT',
    shortDescription: ['Security Solutions', 'Access Regulation'],
    detailedDescription: 'Offering advanced security solutions that manage and regulate entry to both physical and digital spaces, ensuring that only authorized personnel have access to critical resources. Our systems use multi-factor authentication, biometric scanning, and centralized management to enhance security, prevent unauthorized access, and provide detailed logs for compliance and auditing.',
    imageUrl: '/assets/13.webp',
    imageAlt: 'Access Control Systems'
  },
  {
    id: 'networking',
    title: 'Networking',
    category: 'IT',
    shortDescription: ['Robust Network', 'Seamless Connectivity'],
    detailedDescription: 'FCECO design, implement, and manage robust network infrastructures that not only ensure seamless connectivity but also support the scalability and reliability of business operations. Our approach focuses on minimizing downtime, optimizing network performance, and integrating advanced security measures to protect data and prevent unauthorized access.',
    imageUrl: '/assets/14.webp',
    imageAlt: 'Network Infrastructure Services'
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    category: 'IT',
    shortDescription: ['Managed Security Services (MSS)', 'Data Encryption and Protection', 'Cloud Security', 'Identity and Access Management (IAM)'],
    detailedDescription: 'We provide real-time monitoring and analysis of security threats, offering insights to prevent attacks and mitigate risks. Our services include simulating cyber-attacks to identify system weaknesses through vulnerability scans and ethical hacking, along with strategies for detecting, responding to, and recovering from security incidents like breaches, malware, or denial-of-service attacks.',
    imageUrl: '/assets/15.webp',
    imageAlt: 'Cyber Security Services'
  },
  {
    id: 'clean-energy',
    title: 'Clean Energy Studies',
    category: 'Environmental',
    shortDescription: ['Energy Efficiency', 'Research', 'Renewable Energy'],
    detailedDescription: 'We offer comprehensive Clean Energy Studies focused on optimizing energy use and sustainability. Our Energy Efficiency Research identifies strategies to reduce energy consumption, minimize costs, and enhance operational performance. Additionally, we provide expert guidance on implementing Renewable Energy solutions, such as solar and wind power, to achieve long-term energy independence and lower carbon footprints.',
    imageUrl: '/assets/16.webp',
    imageAlt: 'Clean Energy Research'
  },
  {
    id: 'solar-systems',
    title: 'Solar Power Systems',
    category: 'Environmental',
    shortDescription: ['Supply', 'Installation', '& Maintenance'],
    detailedDescription: 'We manage the Supply of high-quality solar equipment tailored to your energy needs. Our expert Installation ensures optimal system performance and seamless integration with existing infrastructure. Additionally, our Maintenance services focus on regular inspections, performance checks, and repairs, guaranteeing long-term efficiency and reliability.',
    imageUrl: '/assets/17.webp',
    imageAlt: 'Solar Power Systems'
  },
  {
    id: 'waste-projects',
    title: 'Supervising Waste Projects',
    category: 'Environmental',
    shortDescription: ['Recycling', 'Waste Management', 'Landfill Management'],
    detailedDescription: 'FCEC specializes in Supervising Waste Projects with a focus on sustainable practices. Our Recycling initiatives promote the efficient reuse of materials, reducing waste and conserving resources. In Waste Management, we implement strategic solutions for waste collection, segregation, and disposal to minimize environmental impact.',
    imageUrl: '/assets/18.webp',
    imageAlt: 'Waste Management Projects'
  },
  {
    id: 'environmental-implementation',
    title: 'Environmental Implementation',
    category: 'Environmental',
    shortDescription: ['Environmental Contracting', 'Air Quality Consulting'],
    detailedDescription: 'Our Environmental Implementation services are designed to promote sustainable practices and compliance. Through Environmental Contracting, we deliver end-to-end solutions for project execution, ensuring adherence to environmental standards at every phase.',
    imageUrl: '/assets/19.webp',
    imageAlt: 'Environmental Implementation Services'
  },
  
];

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'IT', label: 'Information Technology' },
  { value: 'Environmental', label: 'Environmental Services' }
];

// Filter Controls Component
const FilterControls = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="filter-controls">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          className={`filter-btn ${activeFilter === option.value ? 'active' : ''}`}
          onClick={() => onFilterChange(option.value)}
          aria-pressed={activeFilter === option.value}
          aria-label={`Filter by ${option.label}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service, isActive, isHovered, onClick, onHover }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`service-card ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      aria-label={`${service.title} service card. Click to ${isActive ? 'collapse' : 'expand'} details.`}
    >
      <div className="card-inner">
        <div className="card-front">
          <img
            src={service.imageUrl}
            alt={service.imageAlt}
            loading="lazy"
          />
          <div className="text-overlay">
            <h3>{service.title}</h3>
            <div className="description-list">
              {service.shortDescription.map((desc, index) => (
                <p key={index}>{desc}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="card-back">
          <div className="back-content">
            <h3>{service.title}</h3>
            <p>{service.detailedDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Service Carousel Component
const ServiceCarousel = ({ services, activeCardId, hoveredCardId, onCardClick, onCardHover }) => {
  return (
    <div className="services-carousel" role="grid">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          isActive={activeCardId === service.id}
          isHovered={hoveredCardId === service.id}
          onClick={() => onCardClick(service.id)}
          onHover={(hovered) => onCardHover(hovered ? service.id : null)}
        />
      ))}
    </div>
  );
};

// Main Services Section Component
const ServicesSection = () => {
  const { activeFilter, setActiveFilter, filteredServices } = useServicesFilter(servicesData);
  const { activeCardId, hoveredCardId, handleCardClick, handleCardHover } = useCardInteractions();

  return (
    <section className="services-section" role="main" aria-labelledby="services-title">
      <h2 id="services-title" className="services-title">
        Our Dynamic Services
      </h2>
      <p className="services-intro">
        Explore our diverse range of services designed to help your business grow and succeed.
      </p>

      <FilterControls
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <ServiceCarousel
        services={filteredServices}
        activeCardId={activeCardId}
        hoveredCardId={hoveredCardId}
        onCardClick={handleCardClick}
        onCardHover={handleCardHover}
      />


    </section>
  );
};

export default ServicesSection;