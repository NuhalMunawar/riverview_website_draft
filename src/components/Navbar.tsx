import { useState, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const glassStyle = {
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  } as const;

  const smoothScrollTo = (
    event: MouseEvent<HTMLAnchorElement>,
    targetId: string,
    options?: { closeMenu?: boolean; topOffset?: number }
  ) => {
    event.preventDefault();

    if (options?.closeMenu) {
      setIsOpen(false);
    }

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'bottom') {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      window.location.hash = `#${targetId}`;
      return;
    }

    const topOffset = options?.topOffset ?? 84;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - topOffset;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4 pt-3">
      <div
        className="w-[90%] max-w-[1180px] mx-auto relative rounded-xl border border-white/15 bg-stone-950/38 shadow-lg shadow-black/25 overflow-hidden"
        style={glassStyle}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/5 to-transparent pointer-events-none" />
        <div className="absolute inset-x-5 top-0 h-px bg-white/20 pointer-events-none" />

        <div className="relative flex justify-between h-14 items-center px-3 sm:px-5 lg:px-6">
          <a
            href="#home"
            onClick={(event) => smoothScrollTo(event, 'home')}
            className="flex-shrink-0 flex items-center gap-2 min-w-0"
          >
            <div className="w-7 h-7 bg-emerald-700 rounded-full flex items-center justify-center text-white text-sm font-bold italic">
              R
            </div>
            <span className="font-bold text-xs sm:text-base tracking-tight text-white uppercase drop-shadow-sm truncate">Riverview Sports Arena</span>
          </a>

          <div className="hidden md:flex space-x-6">
            <a href="#features" onClick={(event) => smoothScrollTo(event, 'features')} className="text-white hover:text-emerald-300 text-sm font-medium transition-colors drop-shadow-sm">Features</a>
            <a href="#slots" onClick={(event) => smoothScrollTo(event, 'slots')} className="text-white hover:text-emerald-300 text-sm font-medium transition-colors drop-shadow-sm">Book a Slot</a>
            <a href="#gallery" onClick={(event) => smoothScrollTo(event, 'gallery')} className="text-white hover:text-emerald-300 text-sm font-medium transition-colors drop-shadow-sm">Gallery</a>
            <a href="#reviews" onClick={(event) => smoothScrollTo(event, 'reviews')} className="text-white hover:text-emerald-300 text-sm font-medium transition-colors drop-shadow-sm">Reviews</a>
            <a href="#contact" onClick={(event) => smoothScrollTo(event, 'bottom')} className="text-white hover:text-emerald-300 text-sm font-medium transition-colors drop-shadow-sm">Contact</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#admin" className="hidden md:block text-white hover:text-emerald-300 text-sm font-medium transition-colors drop-shadow-sm">Admin</a>
            <a href="#slots" onClick={(event) => smoothScrollTo(event, 'slots')} className="hidden sm:inline-flex bg-emerald-600 text-white px-3.5 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors">
              Book Now
            </a>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden relative px-4 pb-4">
            <div className="rounded-xl border border-white/15 bg-stone-950/45 p-3 space-y-2" style={glassStyle}>
              <a href="#features" onClick={(event) => smoothScrollTo(event, 'features', { closeMenu: true })} className="block px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">Features</a>
              <a href="#slots" onClick={(event) => smoothScrollTo(event, 'slots', { closeMenu: true })} className="block px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">Book a Slot</a>
              <a href="#gallery" onClick={(event) => smoothScrollTo(event, 'gallery', { closeMenu: true })} className="block px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">Gallery</a>
              <a href="#reviews" onClick={(event) => smoothScrollTo(event, 'reviews', { closeMenu: true })} className="block px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">Reviews</a>
              <a href="#contact" onClick={(event) => smoothScrollTo(event, 'bottom', { closeMenu: true })} className="block px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">Contact</a>
              <a href="#admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">Admin</a>
              <a
                href="#slots"
                onClick={(event) => smoothScrollTo(event, 'slots', { closeMenu: true })}
                className="mt-2 inline-flex w-full justify-center bg-emerald-600 text-white px-4 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors"
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
