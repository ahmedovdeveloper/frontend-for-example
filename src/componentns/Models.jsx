import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const Models = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);

  const categories = [
    { 
      src: '/collection/1.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
    { 
      src: '/collection/9.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
     { 
      src: '/collection/10.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
     { 
      src: '/collection/11.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
    { 
      src: '/collection/4.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
    { 
      src: '/collection/5.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
    { 
      src: '/collection/6.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
     { 
      src: '/collection/3.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
    { 
      src: '/collection/7.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
    { 
      src: '/collection/8.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
     { 
      src: '/collection/2.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
    { 
      src: '/collection/9.jpg', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    }
  ];

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTranslateValue = () => {
    const slideWidth = 100 / slidesPerView;
    return currentIndex * slideWidth;
  };

  const nextSlide = () => {
    if (currentIndex < categories.length - slidesPerView) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="bg-white py-12 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="relative">
          {/* Swiper Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out gap-3 md:gap-4"
              style={{ transform: `translateX(-${getTranslateValue()}%)` }}
            >
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0"
                  style={{ 
                    width: slidesPerView === 1 
                      ? 'calc(100% - 12px)' 
                      : slidesPerView === 2 
                      ? 'calc(50% - 12px)' 
                      : slidesPerView === 3
                      ? 'calc(33.333% - 14px)'
                      : 'calc(25% - 14px)' 
                  }}
                >
                  <div className="group cursor-pointer">
                    {/* Image Container */}
                    <div className={`${category.bgColor} overflow-hidden mb-4`}>
                      <img
                        src={category.src}
                        alt={category.title}
                        className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Title */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs md:text-sm font-semibold tracking-wider text-gray-900 uppercase">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Button - Right Only */}
          {currentIndex < categories.length - slidesPerView && (
            <button
              onClick={nextSlide}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-3 md:p-4 rounded-full shadow-lg transition-all z-50 border border-gray-200"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-full bg-gray-200 h-0.5">
          <div 
            className="bg-gray-900 h-full transition-all duration-500"
            style={{ 
              width: `${((currentIndex + slidesPerView) / categories.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Models;