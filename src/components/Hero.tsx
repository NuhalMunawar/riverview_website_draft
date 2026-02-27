import { type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, MapPin } from 'lucide-react';
import mainPic from '../assets/main_pic.jpg';

export default function Hero() {
  const scrollToSlotsSlowly = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const target = document.getElementById('slots');
    if (!target) {
      return;
    }

    const navOffset = 84;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navOffset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    const startTime = performance.now();

    const easeInOutCubic = (time: number) => {
      return time < 0.5
        ? 4 * time * time * time
        : 1 - Math.pow(-2 * time + 2, 3) / 2;
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const scrollToFeaturesSlowly = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const target = document.getElementById('features');
    if (!target) {
      return;
    }

    const navOffset = 84;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navOffset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1400;
    const startTime = performance.now();

    const easeInOutCubic = (time: number) => {
      return time < 0.5
        ? 4 * time * time * time
        : 1 - Math.pow(-2 * time + 2, 3) / 2;
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div id="home" className="relative bg-stone-900 overflow-hidden min-h-screen">
      <div className="absolute inset-0">
        <img
          src={mainPic}
          alt="Riverview Sports Arena at Sunset"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-28 lg:pt-32 lg:pb-32 min-h-screen flex flex-col justify-center items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight uppercase italic"
        >
          Riverview <br/>
          <span className="text-emerald-500">Sports Arena</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-xl text-stone-300 max-w-2xl"
        >
          Chittagong's premier 6v6 football turf. Experience top-tier facilities with a view of the Karnafully River.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#slots" onClick={scrollToSlotsSlowly} className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20">
            View Available Slots
          </a>
          <a
            href="https://maps.app.goo.gl/hteb64BMMyDNsLFN6"
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-stone-300 gap-2 hover:text-emerald-300 transition-colors"
          >
            <MapPin size={20} className="text-emerald-500" />
            <span>Bridge Ghat, Firingi Bazar, Chattogram.</span>
          </a>
        </motion.div>
      </div>

      <a
        id="hero-scroll-indicator"
        href="#features"
        onClick={scrollToFeaturesSlowly}
        className="absolute z-30 bottom-14 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/95 hover:text-white transition-colors"
      >
        <motion.span
          animate={{ y: [0, -6, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl leading-none drop-shadow"
        >
          ⚽
        </motion.span>
        <motion.span
          animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-1"
        >
          <ChevronDown size={20} />
        </motion.span>
      </a>
    </div>
  );
}
