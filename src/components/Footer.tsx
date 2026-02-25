import { Facebook, MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold italic">
                R
              </div>
              <span className="font-bold text-xl tracking-tight text-white uppercase">Riverview Sports Arena</span>
            </div>
            <p className="text-sm">
              Chittagong's premier football turf. Experience the best facilities and a great environment.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Bridge Ghat, Firingi Bazar, Beside Marine Drive (Naval 2), Chittagong</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>01805102270</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Follow Us</h3>
            <div className="flex flex-col gap-3">
              <a 
                href="https://facebook.com/RIVERVIEWSPORTSARENA" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Facebook size={20} />
                <span>@RIVERVIEW SPORTS ARENA</span>
              </a>
              <a 
                href="https://wa.me/8801736193825" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle size={20} />
                <span>WhatsApp (01736193825)</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-800 text-sm text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Riverview Sports Arena. All rights reserved.</p>
          <a href="#admin" className="text-stone-600 hover:text-stone-300 transition-colors">Admin Login</a>
        </div>
      </div>
    </footer>
  );
}
