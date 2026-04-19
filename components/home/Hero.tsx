'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const defaultSlides = [
  {
    image: '/images/hero_electronics.png',
    title: 'New Season, New Tech',
    subtitle: 'Save up to £300 on selected OLED TVs and Laptops.',
    cta: 'Shop Deals',
    link: '/deals',
  },
  {
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1500',
    title: 'Work From Anywhere',
    subtitle: 'Upgrade your home office with professional grade gear.',
    cta: 'Explore Computers',
    link: '/category/computers',
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<any[]>(defaultSlides);

  useEffect(() => {
    fetch('/api/banners')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setSlides(data);
      })
      .catch(console.error);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[300px] md:h-[500px] overflow-hidden bg-gray-900 group">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image 
            src={slide.image} 
            alt={slide.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="container-custom">
              <div className="max-w-xl text-white">
                <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-none">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-8 font-medium text-gray-200">
                  {slide.subtitle}
                </p>
                <Link 
                  href={slide.link}
                  className="bg-[var(--accent)] text-[#0046be] px-8 py-3 rounded-md font-bold text-lg hover:brightness-110 transition-all inline-block shadow-lg"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-[var(--accent)] w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
