import { motion } from 'motion/react';
import { CheckCircle, Clock, Coffee, Gamepad2, Baby } from 'lucide-react';
import grassPic from '../assets/grass_pic.png';
import pic1 from '../assets/pic_1.jpg';
import coffeeShopPic from '../assets/coffee_shop_pic.png';

const features = [
  { name: '6v6 Premium Turf', description: 'Approx 6000 sq ft of high-quality artificial grass.', icon: CheckCircle, image: grassPic },
  { name: '24/7 Open', description: 'Play anytime, day or night, with excellent floodlights.', icon: Clock, image: pic1 },
  { name: 'Comfortable Restrooms', description: 'Hygienic washrooms and dedicated changing rooms for a fresh, comfortable match-day experience.', icon: CheckCircle },
  { name: 'Coffee & Juice Corner (Coming Soon)', description: 'Refresh yourself after a tiring match.', icon: Coffee, image: coffeeShopPic },
  { name: 'Gaming Zone (Coming Soon)', description: '3-storied gaming zone with indoor sports.', icon: Gamepad2 },
  { name: 'Kids Zone (Coming Soon)', description: 'Dedicated area for kids to play safely.', icon: Baby },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <h2 className="text-3xl font-bold text-stone-900 uppercase tracking-tight">
              Our Features & Amenities
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
              className="mt-4 text-stone-600"
            >
              Everything you need for the perfect match day experience.
            </motion.p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl border shadow-sm transition-shadow ${feature.image ? 'relative overflow-hidden min-h-[260px] md:min-h-[280px] border-stone-200 hover:shadow-md' : 'bg-stone-50 p-6 border-stone-100 hover:shadow-md'}`}
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
      </div>
    </section>
  );
}
