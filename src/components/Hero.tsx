import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import mainPic from '../assets/main_pic.jpg';

export default function Hero() {
  return (
    <div className="relative bg-stone-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={mainPic}
          alt="Riverview Sports Arena at Sunset"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
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
          Chittagong's premier 7v7 football turf. Experience top-tier facilities with a breathtaking view of the Karnafully River.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#slots" className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20">
            View Available Slots
          </a>
          <div className="flex items-center text-stone-300 gap-2">
            <MapPin size={20} className="text-emerald-500" />
            <span>Bridge Ghat, Firingi Bazar</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
