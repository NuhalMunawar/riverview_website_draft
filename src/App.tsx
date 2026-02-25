/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Phone, Clock, Facebook, Instagram, CheckCircle, XCircle } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Slots from './components/Slots';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import Admin from './components/Admin';
import RollingBall from './components/RollingBall';

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (route === '#admin') {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans overflow-x-hidden">
      <RollingBall />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Slots />
        <Gallery />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}

