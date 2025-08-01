import React, { useState, useEffect } from 'react';
import Header from './Header';

const Blog = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch images from the API
    fetch('https://backend-production-79eb.up.railway.app/api/images')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        const formattedPhotos = data.map(image => ({
          src: `https://backend-2y5w.onrender.com${image.url}`, // Full URL to the image
        }));
        setPhotos(formattedPhotos);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div className="bg-gray-100 py-20 px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-wide text-gray-900 uppercase">
            Вы делаете нас хорошими
          </h2>
        </div>

        {/* Горизонтальная прокрутка */}
        <div className="w-full overflow-x-auto">
          <div className="flex gap-6 pb-4 w-max">
            {photos.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-[260px]">
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img
                    src={item.src}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-[340px] object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;