import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold italic">
              R
            </div>
            <span className="font-bold text-xl tracking-tight text-emerald-900 uppercase">Riverview Sports Arena</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Features</a>
            <a href="#slots" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Book a Slot</a>
            <a href="#gallery" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Gallery</a>
            <a href="#reviews" className="text-stone-600 hover:text-emerald-700 font-medium transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#admin" className="hidden md:block text-stone-600 hover:text-emerald-700 font-medium transition-colors">Admin</a>
            <a href="#slots" className="bg-emerald-600 text-white px-4 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors">
              Book Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
