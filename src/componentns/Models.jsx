import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const Models = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);

  const categories = [
    { 
      src: 'https://www.dropbox.com/scl/fi/ikmt3duzgmuxwn4czgyry/DSC05667.JPG?rlkey=e7wuje5dnjn1593gq5t06v07p&st=nfhiz45c&raw=1',
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
     { 
      src: 'https://www.dropbox.com/scl/fi/jq37jmk9ile912uey9l6q/IMG_6169.JPG?rlkey=s64wx11mqrcvwvq2yt205y8eh&st=u8ushhmn&raw=1', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
    { 
      src: 'https://www.dropbox.com/scl/fi/m6hpscxvs95mth4sihau2/DSC05666.JPG?rlkey=athf72n9crnhd06ekqithnp0v&st=5zhmz7n8&raw=1', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
     
    { 
      src: 'https://www.dropbox.com/scl/fi/y3ecyzm68t27xnhtlnskz/IMG_6259.JPG?rlkey=l81v3gv39ynln60d1gr5i6pp8&st=mgp1rvqj&raw=1', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
     { 
      src: 'https://www.dropbox.com/scl/fi/brkb3vgtit7u5hersudjo/IMG_8096.JPG?rlkey=tiv8sim872vmt0fik14vzd3rd&st=fy7c2e1h&raw=1', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
     { 
      src: 'https://www.dropbox.com/scl/fi/brkb3vgtit7u5hersudjo/IMG_8096.JPG?rlkey=tiv8sim872vmt0fik14vzd3rd&st=fy7c2e1h&raw=1', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
    { 
      src: 'https://www.dropbox.com/scl/fi/i0phdvch1nq6si0doyeo9/IMG_6254.JPG?rlkey=631nuiz3j3jy13rmynnuv82jn&st=73wl9kol&raw=1', 
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
    { 
      src: 'https://www.dropbox.com/scl/fi/7bvmn440xszzninpxjfav/IMG_6171.JPG?rlkey=opd5mjn8skbcs7w9mcjqxre0c&st=s4lsg6g7&raw=1',
      title: 'GLASSES',
      bgColor: 'bg-stone-200'
    },
   
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
