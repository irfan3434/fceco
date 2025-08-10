"use client";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import "./staff.css";

export default function Staff() {
    const Staff_Image = "/assets/3.webp";

    return (
       <section className="staff-section">
        <img src={Staff_Image} alt="Our Staff" className="staff-image" />
       </section>
        
    )
}