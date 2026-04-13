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

  return (
    <section className="relative flex flex-col md:block overflow-hidden">
      {/* Image container:
          Mobile  → static with aspect-ratio so the full photo is visible
          Desktop → absolute fill behind the content overlay */}
      <div className="relative aspect-[4/3] md:aspect-auto md:absolute md:inset-0">
        {slides.map((slide, index) => (
          <Image
            key={slide}
            src={slide}
            alt={`NAM Construction project ${index + 1}`}
            fill
            className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            priority={index <= 1}
            loading={index <= 1 ? 'eager' : 'lazy'}
          />
        ))}

        {/* Gradient overlay:
            Mobile  → subtle bottom gradient for indicator visibility
            Desktop → horizontal gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950/40 via-transparent to-transparent md:bg-gradient-to-r md:from-noir-950/80 md:via-noir-950/50 md:to-noir-950/30" />

        {/* Slide indicators — inside image area on mobile only */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 z-10 flex md:hidden justify-center gap-1">
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
      </div>

      {/* Content:
          Mobile  → dark background strip below the image
          Desktop → transparent overlay, full-height, vertically centered */}
      <div className="bg-noir-950 md:bg-transparent md:relative md:z-10 md:min-h-screen md:flex md:items-center">
        <div className="container-wide py-10 md:pt-32 md:pb-32">
          {children}
        </div>
      </div>

      {/* Desktop slide indicators — bottom of full section */}
      {slides.length > 1 && (
        <div className="hidden md:flex absolute bottom-16 left-0 right-0 z-10 justify-center gap-1">
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
