"use client";

import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowUp
} from 'lucide-react';

import "./Footer.css";

// Atomic Components
const FooterLink = ({ href, children, external = false, className = "" }) => (
  <a
    href={href}
    className={`footer-link ${className}`}
    target={external ? "_blank" : "_self"}
    rel={external ? "noopener noreferrer" : undefined}
    aria-label={external ? `${children} (opens in new tab)` : undefined}
  >
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    className="social-icon"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Follow us on ${label}`}
  >
    <Icon size={20} aria-hidden="true" />
  </a>
);

const ContactItem = ({ icon: Icon, children, href, type = "link" }) => (
  <div className="contact-item">
    <Icon size={16} className="contact-icon" aria-hidden="true" />
    {href ? (
      <a 
        href={href} 
        className="contact-link"
        aria-label={type === "email" ? "Send us an email" : type === "phone" ? "Call us" : "View location"}
      >
        {children}
      </a>
    ) : (
      <span>{children}</span>
    )}
  </div>
);

// Main Footer Component
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Footer data - easily configurable
  const footerData = {
    company: {
      name: "FCECO",
      description: "Leading the way in sustainable solutions and innovative technology for a better tomorrow."
    },
    navigation: {
      "Company": [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "News", href: "/news" }
      ],
      "Services": [
        { label: "IT Support", href: "/services/" },
        { label: "Environmental Services", href: "/services/" },
        { label: "Energy", href: "/services/" },
        { label: "CCTV & Networking", href: "/services/" }
      ],
     
    },
    contact: {
      email: "info@fceco.sa",
      phone: "+966112350671",
      address: "Prince Mohammed bin Saad bin Abdul Aziz Road, Al Aqiq 13515 Saudi Arabia"
    },
    social: [
      { platform: "Facebook", href: "https://facebook.com/fceco", icon: Facebook },
      { platform: "Twitter", href: "https://twitter.com/fceco", icon: Twitter },
      { platform: "LinkedIn", href: "https://linkedin.com/company/fceco", icon: Linkedin },
      { platform: "Instagram", href: "https://instagram.com/fceco", icon: Instagram }
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" }
    ]
  };

  return (
    <footer className="footer" role="contentinfo">
      {/* Back to top button */}
      <button 
        className="back-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
        type="button"
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>

      <div className="footer-container">
        {/* Main footer content */}
        <div className="footer-main">
          {/* Company section */}
          <div className="footer-section footer-brand">
            <h2 className="footer-logo">{footerData.company.name}</h2>
            <p className="footer-description">
              {footerData.company.description}
            </p>
            
            {/* Social media links */}
            <div className="social-links">
              <span className="social-label">Follow us:</span>
              <div className="social-icons">
                {footerData.social.map(({ platform, href, icon }) => (
                  <SocialIcon
                    key={platform}
                    href={href}
                    icon={icon}
                    label={platform}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation sections */}
          {Object.entries(footerData.navigation).map(([title, links]) => (
            <div key={title} className="footer-section">
              <h3 className="footer-section-title">{title}</h3>
              <nav className="footer-nav" aria-label={`${title} navigation`}>
                <ul className="footer-nav-list">
                  {links.map(({ label, href }) => (
                    <li key={label} className="footer-nav-item">
                      <FooterLink href={href}>{label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}

          {/* Contact section */}
          <div className="footer-section contact-brand">
            <h3 className="footer-section-title">Contact Us</h3>
            <div className="contact-info">
              <ContactItem 
                icon={Mail} 
                href={`mailto:${footerData.contact.email}`}
                type="email"
              >
                {footerData.contact.email}
              </ContactItem>
              <ContactItem 
                icon={Phone} 
                href={`tel:${footerData.contact.phone.replace(/\D/g, '')}`}
                type="phone"
              >
                {footerData.contact.phone}
              </ContactItem>
              <ContactItem icon={MapPin}>
                {footerData.contact.address}
              </ContactItem>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} {footerData.company.name}. All rights reserved.
            </p>
            
            <nav className="legal-nav" aria-label="Legal navigation">
              <ul className="legal-links">
                {footerData.legal.map(({ label, href }) => (
                  <li key={label}>
                    <FooterLink href={href} className="legal-link">
                      {label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>


    </footer>
  );
}