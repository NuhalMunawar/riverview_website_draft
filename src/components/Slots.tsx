import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone } from 'lucide-react';

interface Slot {
  hour: number;
  isBooked: boolean;
  price: number;
  label: string;
}

export default function Slots() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSlots();
  }, [date]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/slots?date=${date}`);
      const bookedData = await res.json();
      const bookedHours = bookedData.map((b: any) => b.time_slot);

      const generatedSlots: Slot[] = [];
      for (let i = 0; i < 24; i++) {
        const isNight = i >= 18 || i < 6;
        const price = isNight ? 1700 : 1200;
        
        const startHour = i % 12 === 0 ? 12 : i % 12;
        const startAmPm = i >= 12 ? 'PM' : 'AM';
        const endHour = (i + 1) % 12 === 0 ? 12 : (i + 1) % 12;
        const endAmPm = (i + 1) >= 12 && (i + 1) < 24 ? 'PM' : 'AM';
        
        generatedSlots.push({
          hour: i,
          isBooked: bookedHours.includes(i),
          price,
          label: `${startHour}:00 ${startAmPm} - ${endHour}:00 ${endAmPm}`
        });
      }
      setSlots(generatedSlots);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <section id="slots" className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 uppercase tracking-tight">Book Your Slot</h2>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Check availability and pricing below. To confirm a booking, please call us at <strong className="text-emerald-700">01805102270</strong>.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-emerald-600" />
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-lg font-medium bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-200"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-stone-200 border border-stone-300"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-stone-500">Loading slots...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {slots.map((slot) => (
                <div 
                  key={slot.hour}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    slot.isBooked 
                      ? 'bg-stone-100 border-stone-200 opacity-70' 
                      : 'bg-emerald-50 border-emerald-200 hover:border-emerald-400'
                  }`}
                >
                  <div className="font-semibold text-stone-900 mb-1">{slot.label}</div>
                  <div className="flex justify-between items-center">
                    <span className={`font-bold ${slot.isBooked ? 'text-stone-500' : 'text-emerald-700'}`}>
                      {slot.price} BDT
                    </span>
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
                      slot.isBooked ? 'bg-stone-200 text-stone-600' : 'bg-emerald-200 text-emerald-800'
                    }`}>
                      {slot.isBooked ? 'Booked' : 'Available'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 bg-emerald-900 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to play?</h3>
            <p className="mb-6 text-emerald-100">Call us to lock in your preferred time slot.</p>
            <a href="tel:01805102270" className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors">
              <Phone size={20} />
              01805102270
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
