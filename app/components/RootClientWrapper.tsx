"use client";

import React, { useState, useEffect } from "react";
import ContactSlider from "./ContactSlider";

interface ContactData {
  contact_email: string;
  linkedin_url: string;
}

interface RootClientWrapperProps {
  contactData: ContactData; // Removed children prop type tracking
}

export default function RootClientWrapper({ contactData }: RootClientWrapperProps) {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const closeSlider = () => setIsSliderOpen(false);

  useEffect(() => {
    const handleOpen = () => setIsSliderOpen(true);
    window.addEventListener("open-contact-slider", handleOpen);
    return () => window.removeEventListener("open-contact-slider", handleOpen);
  }, []);

  return (
    <ContactSlider 
      isOpen={isSliderOpen} 
      onClose={closeSlider} 
      contactData={contactData} 
    />
  );
}

export function triggerContactSlider() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-contact-slider"));
  }
}