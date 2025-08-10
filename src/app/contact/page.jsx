// contact.jsx (Advanced Version with Reusable Hooks, Sections, Animations)

"use client";
import React, { useMemo, useEffect, useState } from "react";
import { MapPin, Phone, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import "./contact.css";

const SOCIALS = [
  { href: "https://facebook.com/fceco", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com/fceco", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com/fceco", icon: Instagram, label: "Instagram" },
];

const BRANCHES = [
  {
    name: "Riyadh Branch",
    address: "Prince Mohammed bin Saad bin Abdul Aziz Road, Al Aqiq 13515 Saudi Arabia",
    phone: "+966558808533",
  },
  {
    name: "Jeddah Branch",
    address:
      "Zimas Building, Fourth Floor, Office No. 41, Al Baghdadiyah Al Gharbia - Hail Street - next to Al Sarya Square",
    phone: "+966558389962",
  },
  {
    name: "Dammam Branch",
    address: "Fourth floor, Al-Zuhur, Al-Khaleej Road, Al-Jawhara District, Dammam 32423",
    phone: "+966558808533",
  },
  {
    name: "Jizan Branch",
    address: "King Faisal Road 4426 As-Safa - 8272",
    phone: "+966173206529",
  },
];

// Hook to detect viewport intersection
const useInView = (threshold = 0.2) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setVisible] = useState(false);

  const observer = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
  }, [threshold]);

  useEffect(() => {
    if (!ref || !observer) return;
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, observer]);

  return [setRef, isVisible];
};

export default function ContactPage() {
  const [formRef, formInView] = useInView();
  const [socialRef, socialInView] = useInView();
  const [branchRef, branchInView] = useInView();

  return (
    <div className="contact-page-container">
      <section
        className={`contact-form-section animate-section ${formInView ? "in-view" : ""}`}
        ref={formRef}
      >
        <h2 className="section-heading">Let’s Talk</h2>
        <p className="section-subtext">
          We'd love to hear from you. Fill out the form and we'll get back as soon as possible.
        </p>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Write your name" required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="you@example.com" required />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Write your message..." required />
          </div>
          <button type="submit" className="send-message-btn">
            <Mail size={18} /> Send Message
          </button>
        </form>
      </section>

      <section
        className={`social-media-section animate-section ${socialInView ? "in-view" : ""}`}
        ref={socialRef}
      >
        <h2 className="section-heading">Follow Us</h2>
        <div className="social-links">
          {SOCIALS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${label}`}
              title={label}
              className={`social-btn ${label.toLowerCase()}`}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </section>

      <section
        className={`branches-section animate-section ${branchInView ? "in-view" : ""}`}
        ref={branchRef}
      >
        <h2 className="section-heading">Our Branches</h2>
        <div className="branches-grid">
          {BRANCHES.map((branch) => (
            <div key={branch.name} className="branch-card">
              <h3>{branch.name}</h3>
              <p>
                {branch.address}
              </p>
              <p>
                <Phone size={16} /> {branch.phone}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
