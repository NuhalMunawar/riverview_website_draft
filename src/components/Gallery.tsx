import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import pic1 from '../assets/pic_1.jpg';
import pic2 from '../assets/pic_2.jpg';
import pic3 from '../assets/pic_3.jpg';
import pic4 from '../assets/pic_4.jpg';

const images = [
  pic3,
  pic4,
  pic1,
  pic2,
];

export default function Gallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!scrollerRef.current) {
      return;
    }

    const amount = Math.max(280, Math.floor(scrollerRef.current.clientWidth * 0.8));
    scrollerRef.current.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 uppercase tracking-tight">Gallery</h2>
          <p className="mt-4 text-stone-600">A glimpse of Riverview Sports Arena.</p>
        </div>

        <div className="flex justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={() => scrollGallery('left')}
            className="p-2 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Scroll gallery left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollGallery('right')}
            className="p-2 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Scroll gallery right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
        >
          {images.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="snap-start shrink-0 w-[82vw] sm:w-[60vw] md:w-[46vw] lg:w-[32vw] h-[70vh] max-h-[640px] rounded-xl overflow-hidden bg-stone-100 border border-stone-200"
            >
              <img 
                src={src} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-500" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}