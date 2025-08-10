"use client";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, BrainCog, ShieldCheck, Network, Users, Leaf, Trash2, AirVent, Satellite } from "lucide-react";
import "./Header.css";

// --- Config for Services dropdown ---


const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services", hasDropdown: false },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/contact", label: "Contact" }
];

// --- Dropdown Nav Item ---
const NavItem = memo(({ item, isActive, onClick, isMobile }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Hover open/close for desktop, toggle for mobile
  const handleMouseEnter = useCallback(() => {
    if (!isMobile && item.hasDropdown) {
      clearTimeout(timeoutRef.current);
      setIsDropdownOpen(true);
    }
  }, [isMobile, item.hasDropdown]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile && item.hasDropdown) {
      timeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 200);
    }
  }, [isMobile, item.hasDropdown]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleClick = (e) => {
    if (isMobile && item.hasDropdown) {
      e.preventDefault();
      setIsDropdownOpen((open) => !open);
    } else if (!item.hasDropdown) {
      onClick?.();
    }
  };

  // Mobile submenu
  if (isMobile && item.hasDropdown) {
    return (
      <li className="mobile-nav-item has-submenu">
        <button
          className="mobile-nav-link submenu-toggle"
          onClick={handleClick}
          aria-expanded={isDropdownOpen}
        >
          <span>{item.label}</span>
          <ChevronDown className={`submenu-arrow ${isDropdownOpen ? "open" : ""}`} size={20} />
        </button>
        {isDropdownOpen && (
          <ul className="mobile-submenu">
            {SERVICES_CONFIG.map((service) => {
              const Icon = service.icon;
              return (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mobile-submenu-link"
                    style={{ "--service-color": service.color }}
                    onClick={onClick}
                  >
                    <Icon size={18} className="submenu-icon" />
                    <span>{service.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }

  // Desktop navigation
  return (
    <li
      className={`nav-item${item.hasDropdown ? " has-dropdown" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.path}
        className={`nav-link${isActive ? " active" : ""}${isDropdownOpen ? " dropdown-open" : ""}`}
        aria-current={isActive ? "page" : undefined}
        aria-expanded={item.hasDropdown ? isDropdownOpen : undefined}
        aria-haspopup={item.hasDropdown ? "menu" : undefined}
        onClick={handleClick}
        tabIndex={0}
      >
        <span className="nav-link-text">{item.label}</span>
        {item.hasDropdown && (
          <ChevronDown className={`dropdown-arrow${isDropdownOpen ? " open" : ""}`} size={16} />
        )}
        <span className="nav-link-indicator" aria-hidden="true" />
      </Link>
      {/* Dropdown */}
      {item.hasDropdown && (
        <div
          ref={dropdownRef}
          className={`services-dropdown${isDropdownOpen ? " open" : ""} ltr`}
          role="menu"
          aria-label="Services"
        >
          <div className="dropdown-content">
            {SERVICES_CONFIG.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="dropdown-item"
                  style={{ "--service-color": service.color }}
                  onClick={onClick}
                  role="menuitem"
                >
                  <div className="dropdown-item-icon">
                    <Icon size={20} />
                  </div>
                  <span className="dropdown-item-text">{service.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </li>
  );
});
NavItem.displayName = "NavItem";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const pathname = usePathname();

  // Responsive width
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const isActive = useCallback(
    (href) =>
      href === "/"
        ? pathname === "/"
        : href !== "#" && pathname.startsWith(href),
    [pathname]
  );

  const isMobile = windowWidth <= 1024;

  return (
    <>
      <header
        className={[
          "futureCode-header",
          scrolled ? "scrolled" : "",
          "solid"
        ].join(" ")}
      >
        <div className="header-container">
           <Link href="/" className="brand-logo" aria-label="FCECO Home">
             <img src="/assets/fcecologo1.png" alt="FC ECO Logo" className="brand-img" />
           </Link>

          <nav className="header-nav" role="navigation" aria-label="Main navigation">
            {/* Logo */}
           
            {/* Desktop Nav */}
            {!isMobile && (
              <ul className="nav-links desktop-nav">
                {NAV_ITEMS.map((item) => (
                  <NavItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    onClick={() => setMobileOpen(false)}
                    isMobile={false}
                  />
                ))}
              </ul>
            )}
            {/* Mobile Hamburger */}
            <div className="header-actions">
              {isMobile && (
                <button
                  className="mobile-menu-toggle"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                  onClick={() => setMobileOpen((open) => !open)}
                >
                  <span className="menu-icon-wrapper">
                    <span className="menu-icon" style={{
                      display: "block",
                      width: "24px",
                      height: "3px",
                      margin: "5px 0",
                      background: "var(--color-secondary)",
                      borderRadius: "2px",
                      transition: ".3s"
                    }} />
                    <span className="menu-icon" style={{
                      display: "block",
                      width: "24px",
                      height: "3px",
                      margin: "5px 0",
                      background: "var(--color-secondary)",
                      borderRadius: "2px",
                      transition: ".3s"
                    }} />
                    <span className="menu-icon" style={{
                      display: "block",
                      width: "24px",
                      height: "3px",
                      margin: "5px 0",
                      background: "var(--color-secondary)",
                      borderRadius: "2px",
                      transition: ".3s"
                    }} />
                  </span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>
      {/* Mobile Drawer */}
      {isMobile && (
        <>
          <div className={`mobile-menu-backdrop${mobileOpen ? " active" : ""}`} onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <nav className={`mobile-menu${mobileOpen ? " open" : ""} ltr`} aria-label="Mobile navigation">
  <button className="mobile-menu-close" aria-label="Close menu" onClick={() => setMobileOpen(false)} tabIndex={0} type="button">
    ×
  </button>
  <ul className="mobile-nav-links"> {NAV_ITEMS.map((item) => ( <NavItem key={item.path} item={item} isActive={isActive(item.path)} onClick={() => setMobileOpen(false)} isMobile={true}/>
    ))}
  </ul>
</nav>

        </>
      )}
    </>
  );
}
