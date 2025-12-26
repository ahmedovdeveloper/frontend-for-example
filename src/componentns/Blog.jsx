// src/components/Blog.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  // Placeholder images for the gallery
  const photos = [
    { src: '/product/rhm3.jpeg', title: 'MWC1 TORTOISE' },
    { src: '/product/rht2.jpeg', title: 'MWC1 CHELSEA' },
    { src: '/product/cbh4.jpeg', title: 'MWC1 CHELSEA' },
    { src: '/product/img2.jpeg', title: 'MWC1 TORTOISE' },
  ];

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesPerView(1);
      } else if (width < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = photos.length;
  const maxIndex = Math.max(0, totalSlides - slidesPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const getTranslateValue = () => {
    const slideWidth = 100 / slidesPerView;
    return currentIndex * slideWidth;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-neutral-900 to-stone-900 py-8 md:py-16 px-4 md:px-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Left Side - Title */}
          <div className="flex-shrink-0 w-full lg:w-[280px] text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-amber-100 mb-6 md:mb-8 tracking-wider leading-none">
              The<br />Collection
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-amber-500 to-transparent mb-4 md:mb-6 mx-auto lg:mx-0"></div>
            <p className="text-amber-200/60 text-xs md:text-sm font-light tracking-wide leading-relaxed max-w-xs mx-auto lg:mx-0">
              Discover our curated selection of premium eyewear, from timeless classics to contemporary designs
            </p>
          </div>

          {/* Right Side - Responsive Swiper Gallery */}
          <div className="flex-1 relative">
            <div className="relative overflow-hidden rounded-2xl">
              {/* Swiper Container */}
              <div
                className="flex transition-transform duration-700 ease-out gap-4 md:gap-6"
                style={{ transform: `translateX(-${getTranslateValue()}%)` }}
              >
                {photos.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full"
                    style={{ width: `${100 / slidesPerView}%` }}
                  >
                    <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                      {/* Golden Frame Border */}
                      <div className="absolute inset-0 pointer-events-none z-10">
                        <div className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 border-t-2 border-l-2 border-amber-600/70"></div>
                        <div className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 border-t-2 border-r-2 border-amber-600/70"></div>
                        <div className="absolute bottom-4 left-4 w-10 h-10 md:w-12 md:h-12 border-b-2 border-l-2 border-amber-600/70"></div>
                        <div className="absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 border-b-2 border-r-2 border-amber-600/70"></div>
                      </div>

                      {/* Image */}
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-[400px] sm:h-[450px] md:h-[520px] object-cover brightness-90 transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                      {/* Title Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-serif tracking-wider text-center px-6 md:px-8">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons - Responsive */}
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`absolute left-2 sm:left-4 md:-left-5 top-1/2 -translate-y-1/2 bg-amber-100/95 hover:bg-amber-50 p-3 md:p-2.5 rounded-full shadow-xl transition-all z-20 border border-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 md:w-5 md:h-5 text-slate-900" />
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className={`absolute right-2 sm:right-4 md:-right-5 top-1/2 -translate-y-1/2 bg-amber-100/95 hover:bg-amber-50 p-3 md:p-2.5 rounded-full shadow-xl transition-all z-20 border border-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed ${currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 md:w-5 md:h-5 text-slate-900" />
              </button>
            </div>

            {/* Dots Navigation - Responsive */}
            <div className="flex justify-center gap-2 mt-6 md:mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 md:h-1.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-10 md:w-8 bg-amber-500'
                      : 'w-2 md:w-1.5 bg-amber-600/30 hover:bg-amber-500/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;