"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import "./projects.css";
// Sample project data with enhanced structure
const PROJECTS = [
  {
    id: 1,
    title: "Green Urban Initiative",
    description: "Revamping city planning with AI-driven sustainability analytics and renewable resource integration.",
    image: "/assets/91.webp",
    category: "ongoing",
    status: "In Progress",
    progress: 75,
    details: "Led the digital transformation for Riyadh's green spaces, introducing IoT sensors and real-time data dashboards for city planners.",
    technologies: ["AI/ML", "IoT", "React", "Node.js"],
    duration: "8 months",
    impact: "15% reduction in energy usage"
  },
  {
    id: 2,
    title: "EcoSmart Energy Grid",
    description: "Deploying smart grid infrastructure for optimized energy consumption and monitoring.",
    image: "/assets/92.webp",
    category: "completed",
    status: "Completed",
    progress: 100,
    details: "Successfully reduced peak energy usage by 22% for a major Saudi industrial hub, using predictive analytics and demand response.",
    technologies: ["Python", "TensorFlow", "AWS", "React"],
    duration: "12 months",
    impact: "22% reduction in energy consumption"
  },
  {
    id: 3,
    title: "Vision 2030 Mobility",
    description: "Concept development for sustainable public transportation in the Kingdom of Saudi Arabia.",
    image: "/assets/93.webp",
    category: "concept",
    status: "Under Review",
    progress: 60,
    details: "Proposed multi-modal transit hubs with carbon-neutral solutions, now under pilot review by Ministry of Transport.",
    technologies: ["Flutter", "Firebase", "Google Maps API"],
    duration: "6 months",
    impact: "Pilot phase approved, execution in progress.."
  },
  {
    id: 4,
    title: "Desert Reforestation AI",
    description: "Ongoing project using drones and AI to monitor and optimize desert planting.",
    image: "/assets/94.webp",
    category: "ongoing",
    status: "Active Development",
    progress: 85,
    details: "Implemented machine learning to predict optimal planting zones and watering schedules in extreme climates.",
    technologies: ["Computer Vision", "Drone Tech", "Python"],
    duration: "10 months",
    impact: "40% improvement in survival rates"
  },
  {
    id: 5,
    title: "Digital Water Management",
    description: "Smart water monitoring systems for sustainable use in new Saudi urban developments.",
    image: "/assets/95.webp",
    category: "completed",
    status: "Delivered",
    progress: 100,
    details: "IoT network resulted in 18% water savings in Al Aqiq, with live public dashboards for accountability.",
    technologies: ["IoT", "React", "MongoDB", "Express"],
    duration: "9 months",
    impact: "18% water savings from initiatives"
  },
  {
    id: 6,
    title: "Circular Economy Platform",
    description: "Concept for a digital marketplace for recycled building materials.",
    image: "/assets/96.webp",
    category: "concept",
    status: "Planning",
    progress: 30,
    details: "Enabling construction firms to trade and track eco-materials; pilot launching Q3 2024.",
    technologies: ["Next.js", "PostgreSQL", "Stripe API"],
    duration: "4 months",
    impact: "Quarter 3 2024 launch planned"
  }
];

const FILTERS = [
  { label: "All Projects", value: "all", icon: "📋" },
  { label: "Ongoing", value: "ongoing", icon: "🚀" },
  { label: "Completed", value: "completed", icon: "✅" },
  { label: "Concepts", value: "concept", icon: "💡" }
];

// Custom hook for projects filtering and search
const useProjectsFilter = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = useMemo(() => {
    let filtered = activeFilter === "all" 
      ? PROJECTS 
      : PROJECTS.filter(p => p.category === activeFilter);

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filtered;
  }, [activeFilter, searchTerm]);

  return {
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
    filteredProjects
  };
};

// Enhanced Project Card Component
const ProjectCard = React.memo(({ project, isExpanded, onToggle }) => {
  const cardRef = useRef(null);
  
  const handleImageError = useCallback((e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDI0MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMjAgOTBMMTAwIDcwSDEwMFYxMTBIMTQwVjcwSDEyMEw5MCA5MEwxMjAgOTBaIiBmaWxsPSIjQ0NDIi8+Cjx0ZXh0IHg9IjEyMCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjEyIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPgo=';
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'Completed': '#10B981',
      'Delivered': '#10B981',
      'In Progress': '#F59E0B',
      'Active Development': '#F59E0B',
      'Under Review': '#8B5CF6',
      'Planning': '#6B7280'
    };
    return colors[status] || '#6B7280';
  };

  return (
    <div 
      ref={cardRef}
      className={`project-card ${isExpanded ? 'expanded' : ''}`}
      role="article"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="project-status-badge">
        <span 
          className="status-indicator"
          style={{ backgroundColor: getStatusColor(project.status) }}
        />
        {project.status}
      </div>

      <div 
        className="project-image-container" 
        onClick={() => onToggle(project.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle(project.id)}
        aria-label={`View details for ${project.title}`}
      >
        <img 
          src={project.image} 
          alt={project.title}
          onError={handleImageError}
          loading="lazy"
        />
        <div className="image-overlay">
          <span className="view-details-hint">Click to {isExpanded ? 'collapse' : 'expand'}</span>
        </div>
      </div>

      <div className="project-content">
        <div className="project-header">
          <h3 id={`project-title-${project.id}`} className="project-title">
            {project.title}
          </h3>
          <div className="project-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${project.progress}%`,
                  backgroundColor: getStatusColor(project.status)
                }}
              />
            </div>
            <span className="progress-text">{project.progress}%</span>
          </div>
        </div>

        <p className="project-description">{project.description}</p>

        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-badge">{tech}</span>
          ))}
        </div>

        <div className="project-meta">
          <span className="meta-item">
            <span className="meta-icon">⏱️</span>
            {project.duration}
          </span>
          <span className="meta-item">
            <span className="meta-icon">📊</span>
            {project.impact}
          </span>
        </div>

        <button
          className="details-toggle-btn"
          onClick={() => onToggle(project.id)}
          aria-expanded={isExpanded}
          aria-controls={`project-details-${project.id}`}
        >
          <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
          <span className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>
            ▼
          </span>
        </button>

        <div 
          id={`project-details-${project.id}`}
          className={`project-details ${isExpanded ? 'open' : ''}`}
          aria-hidden={!isExpanded}
        >
          <div className="details-content">
            <p>{project.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Main Projects Component
export default function ProjectsPage() {
  const {
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
    filteredProjects
  } = useProjectsFilter();

  const [expandedId, setExpandedId] = useState(null);
  const searchInputRef = useRef(null);

  const handleToggleExpand = useCallback((projectId) => {
    setExpandedId(current => current === projectId ? null : projectId);
  }, []);

  const handleFilterChange = useCallback((filterValue) => {
    setActiveFilter(filterValue);
    setExpandedId(null); // Collapse any expanded cards when filtering
  }, [setActiveFilter]);

  // Focus management for accessibility
  useEffect(() => {
    if (searchInputRef.current && searchTerm) {
      searchInputRef.current.focus();
    }
  }, [searchTerm]);

  const projectStats = useMemo(() => {
    const total = PROJECTS.length;
    const completed = PROJECTS.filter(p => p.category === 'completed').length;
    const ongoing = PROJECTS.filter(p => p.category === 'ongoing').length;
    const concepts = PROJECTS.filter(p => p.category === 'concept').length;
    
    return { total, completed, ongoing, concepts };
  }, []);

  return (
    <div className="projects-container">
      <section className="projects-section" role="main" aria-labelledby="projects-heading">
        <div className="section-header">
          <h2 id="projects-heading">Our Projects Portfolio</h2>
          <p className="section-description">
            Delivering innovative solutions that drive sustainable transformation across Saudi Arabia. 
            Each project represents our commitment to excellence, sustainability, and cutting-edge technology.
          </p>
          
          <div className="project-stats">
            <div className="stat-card">
              <span className="stat-number">{projectStats.total}</span>
              <span className="stat-label">Total Projects</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{projectStats.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{projectStats.ongoing}</span>
              <span className="stat-label">Ongoing</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{projectStats.concepts}</span>
              <span className="stat-label">Concepts</span>
            </div>
          </div>
        </div>

        <div className="controls-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Search projects"
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="filter-controls" role="tablist" aria-label="Project filters">
            {FILTERS.map(filter => (
              <button
                key={filter.value}
                className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
                onClick={() => handleFilterChange(filter.value)}
                role="tab"
                aria-selected={activeFilter === filter.value}
                aria-controls="projects-grid"
              >
                <span className="filter-icon">{filter.icon}</span>
                {filter.label}
                <span className="filter-count">
                  {filter.value === 'all' ? filteredProjects.length : 
                   filteredProjects.filter(p => p.category === filter.value).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div 
          id="projects-grid"
          className="projects-grid"
          role="tabpanel"
          aria-live="polite"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                isExpanded={expandedId === project.id}
                onToggle={handleToggleExpand}
              />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No projects found</h3>
              <p>
                {searchTerm 
                  ? `No projects match "${searchTerm}". Try different keywords.`
                  : "No projects available for the selected filter."
                }
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="clear-filters-btn"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      </div>
  );

}