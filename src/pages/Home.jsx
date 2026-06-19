import { Hero } from '../components/Hero';
import { VideoBanner } from '../components/VideoBanner';
import { BestSellers } from '../components/BestSellers';
import { BrandStory } from '../components/BrandStory';
import { ModelsSection } from '../components/ModelsSection';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const Home = () => {
  const testimonials = [
    {
      name: 'Сара Джонсон',
      role: 'Fashion Influencer',
      text: 'Солнцезащитные очки HAM абсолютно потрясающие. Они стали моим любимым аксессуаром для любого случая.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      name: 'Майкл Чен',
      role: 'Предприниматель',
      text: 'Качество исключительное. Это инвестиционные изделия, которые прослужат годами.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    },
    {
      name: 'Эмма Дэвис',
      role: 'Художник',
      text: 'Дизайн такой элегантный и минималистичный. Идеально подходит для моего образа жизни и эстетики.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    },
  ];

  return (
    <div className="bg-black pt-[100px]">
      <Hero />
      <VideoBanner />
      <BestSellers />
      <BrandStory />
      <ModelsSection />

      {/* Testimonials Section */}
     
      {/* Features Section */}
   
    </div>
  );
};
