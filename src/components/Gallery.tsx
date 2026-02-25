import { motion } from 'motion/react';

// 1. Import your images from the assets folder.
// Note: Adjust the path '../assets/...' based on where this component file lives. 
// If this file is directly inside 'src', use './assets/your-image-name.jpg'.
import pic1 from '../assets/pic_1.jpg';
import pic2 from '../assets/pic_2.jpg';
import pic3 from '../assets/pic_3.jpg';

// 2. Add the imported variables to your array (do NOT use quotes around them!)
const images = [
  pic1,
  pic2,
  pic3,
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 uppercase tracking-tight">Gallery</h2>
          <p className="mt-4 text-stone-600">A glimpse of Riverview Sports Arena.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-video rounded-xl overflow-hidden bg-stone-200"
            >
              <img 
                src={src} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}