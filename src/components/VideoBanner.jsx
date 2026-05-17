import { motion } from "framer-motion";
import bgVideo from "../assets/bg_video.mp4";

export const VideoBanner = () => {
  return (
    <section className="relative overflow-hidden bg-black py-10">
      <div className="w-full mx-auto  sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <video
            className="w-full h-[600px] object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
};