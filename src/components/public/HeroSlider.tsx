'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, type ReactNode } from 'react';

export default function HeroSlider({
  slides,
  interval = 5000,
  children,
}: {
  slides: string[];
  interval?: number;
  children: ReactNode;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Per-image focal points for mobile cropping
  const positions = [
    'object-[40%_50%] md:object-center',
    'object-[60%_60%] md:object-center',
    'object-[50%_40%] md:object-center',
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <Image
            key={slide}
            src={slide}
            alt={`NAM Construction project ${index + 1}`}
            fill
            className={`object-cover ${positions[index] || 'object-center'} transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            priority={index <= 1}
            loading={index <= 1 ? 'eager' : 'lazy'}
          />
        ))}
        {/* Responsive gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir-950/70 via-noir-950/50 to-noir-950/60 md:bg-gradient-to-r md:from-noir-950/80 md:via-noir-950/50 md:to-noir-950/30" />
      </div>

      {/* Content overlay */}
      <div className="container-wide relative z-10 pt-32 pb-32">
        {children}
      </div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 md:bottom-16 left-0 right-0 z-10 flex justify-center gap-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative flex items-center justify-center w-11 h-11"
              aria-label={`Slide ${index + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white w-6 h-2'
                    : 'bg-white/40 hover:bg-white/60 w-2 h-2'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
