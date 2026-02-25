import { motion } from 'motion/react';
import { CheckCircle, Clock, Coffee, Gamepad2, Baby } from 'lucide-react';

const features = [
  { name: '7v7 Premium Turf', description: 'Approx 6000 sq ft of high-quality artificial grass.', icon: CheckCircle },
  { name: '24/7 Open', description: 'Play anytime, day or night, with excellent floodlights.', icon: Clock },
  { name: 'Coffee & Juice Corner', description: 'Refresh yourself after a tiring match.', icon: Coffee },
  { name: 'Gaming Zone (Coming Soon)', description: '3-storied gaming zone with indoor sports.', icon: Gamepad2 },
  { name: 'Kids Zone (Coming Soon)', description: 'Dedicated area for kids to play safely.', icon: Baby },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-stone-900 uppercase tracking-tight">World-Class Facilities</h2>
          <p className="mt-4 text-stone-600">Everything you need for the perfect match day experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-stone-50 rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-stone-900 mb-2">{feature.name}</h3>
              <p className="text-stone-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
