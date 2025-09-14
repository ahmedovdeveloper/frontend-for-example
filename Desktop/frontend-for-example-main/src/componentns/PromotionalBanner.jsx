import React from 'react';
import video from "../assets/bg_video.mp4";
import { Link } from 'react-router-dom';

const PromotionalBanner = () => {
    return (
        <section className="relative w-full h-[90vh] overflow-hidden">
            {/* Фоновое видео (и для desktop, и для mobile) */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
                playsInline
                poster={video} // запасное изображение, если видео не загрузится
            >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Затемнение для читаемости текста */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

            {/* Текст поверх */}
            <div className="relative z-20 flex items-center justify-center h-full text-center px-6">
                <div className="max-w-3xl">
                    <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight">
                        See the World Like Never Before
                    </h1>
                    <p className="text-white mt-6 text-lg md:text-xl font-light">
                        Discover premium eyewear crafted for clarity, comfort, and timeless style.
                    </p>
                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                        <Link 
                            to="/catalog" 
                            className="bg-white text-gray-900 px-6 py-3 text-sm uppercase font-semibold hover:bg-gray-200 transition"
                        >
                            Explore Collection
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromotionalBanner;
