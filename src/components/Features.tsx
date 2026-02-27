import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Clock, Coffee, Gamepad2, Baby, X } from 'lucide-react';
import grassPic from '../assets/grass_pic.png';
import pic1 from '../assets/pic_1.jpg';
import coffeeShopPic from '../assets/coffee_shop_pic.png';
import restroomPic from '../assets/restroom_pic.png';
import gamingZonePic from '../assets/gaming_zone_pic.png';
import kidsZonePic from '../assets/kids_zone_pic.png';

const features = [
  { name: '6v6 Premium Turf', description: 'Approx 6000 sq ft of high-quality artificial grass.', icon: CheckCircle, image: grassPic },
  { name: '24/7 Open', description: 'Play anytime, day or night, with excellent floodlights.', icon: Clock, image: pic1 },
  { name: 'Comfortable Restrooms', description: 'Hygienic washrooms and dedicated changing rooms for a fresh, comfortable match-day experience.', icon: CheckCircle, image: restroomPic },
  { name: 'Coffee & Juice Corner (Coming Soon)', description: 'Refresh yourself after a tiring match.', icon: Coffee, image: coffeeShopPic },
  { name: 'Gaming Zone (Coming Soon)', description: '3-storied gaming zone with indoor sports.', icon: Gamepad2, image: gamingZonePic },
  { name: 'Kids Zone (Coming Soon)', description: 'Dedicated area for kids to play safely.', icon: Baby, image: kidsZonePic },
];

export default function Features() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 38, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            className="text-3xl font-bold text-stone-900 uppercase tracking-tight"
          >
            Our Features & Amenities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
            className="mt-4 text-stone-600"
          >
            Everything you need for the perfect match day experience.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.name}
              id={index === 0 ? 'features-first-photo' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                if (feature.image) {
                  setSelectedImage({ src: feature.image, alt: feature.name });
                }
              }}
              className={`rounded-2xl border shadow-sm transition-shadow ${feature.image ? 'relative overflow-hidden min-h-[260px] md:min-h-[280px] border-stone-200 hover:shadow-md cursor-zoom-in' : 'bg-stone-50 p-6 border-stone-100 hover:shadow-md'}`}
            >
              {feature.image && (
                <>
                  <img
                    src={feature.image}
                    alt={feature.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/10" />
                </>
              )}
              <div className={`relative z-10 ${feature.image ? 'h-full p-6 flex flex-col justify-end' : ''}`}>
                <feature.icon className={`h-10 w-10 mb-4 ${feature.image ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${feature.image ? 'text-white' : 'text-stone-900'}`}>{feature.name}</h3>
                <p className={`${feature.image ? 'text-stone-200' : 'text-stone-600'}`}>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/20 bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              aria-label="Close image preview"
            >
              <X size={18} />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] rounded-xl object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}
