"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { CryptoPrices } from "@/components/CryptoPrices";
import { CurrencyCarousel } from "@/components/CurrencyCarousel";
import { HowItWorks } from "@/components/HowItWorks";
import { XrplSection } from "@/components/XrplSection";
import { Footer } from "@/components/Footer";
import { WaveSeparator } from "@/components/WaveSeperator";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-secondary">
      <Navigation />
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            willChange: "transform",
          }}
        />
        <Hero />
      </div>
      <WaveSeparator />
      <div className="relative">
        <div
          className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            willChange: "transform",
          }}
        />
        <CryptoPrices />
        <CurrencyCarousel />
      </div>
      <WaveSeparator />
      <div className="relative">
        <div
          className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            willChange: "transform",
          }}
        />
      </div>
      <WaveSeparator />
      <HowItWorks />
      <WaveSeparator />
      <XrplSection />
      <WaveSeparator />
      <Footer />
    </div>
  );
};

export default Index;
