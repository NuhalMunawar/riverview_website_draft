import React, { useState, useEffect } from 'react';
import { Calendar, LogOut, Check, X } from 'lucide-react';

interface Slot {
  hour: number;
  isBooked: boolean;
  customer_name?: string;
  label: string;
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSlots();
    }
  }, [date, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/slots?date=${date}`);
      const bookedData = await res.json();
      
      const generatedSlots: Slot[] = [];
      for (let i = 0; i < 24; i++) {
        const startHour = i % 12 === 0 ? 12 : i % 12;
        const startAmPm = i >= 12 ? 'PM' : 'AM';
        const endHour = (i + 1) % 12 === 0 ? 12 : (i + 1) % 12;
        const endAmPm = (i + 1) >= 12 && (i + 1) < 24 ? 'PM' : 'AM';
        
        const booking = bookedData.find((b: any) => b.time_slot === i);
        
        generatedSlots.push({
          hour: i,
          isBooked: !!booking,
          customer_name: booking?.customer_name,
          label: `${startHour}:00 ${startAmPm} - ${endHour}:00 ${endAmPm}`
        });
      }
      setSlots(generatedSlots);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const toggleBooking = async (slot: Slot) => {
    const action = slot.isBooked ? 'unbook' : 'book';
    let customer_name = '';
    
    if (action === 'book') {
      customer_name = prompt('Enter customer name (optional):') || '';
    } else {
      if (!confirm('Are you sure you want to cancel this booking?')) return;
    }

    try {
      const res = await fetch(`/api/admin/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          time_slot: slot.hour,
          customer_name,
          password
        })
      });
      
      if (res.ok) {
        fetchSlots();
      } else {
        alert('Action failed');
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-stone-900">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border border-stone-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button type="submit" className="w-full bg-emerald-600 text-white rounded-lg px-4 py-3 font-bold hover:bg-emerald-700 transition-colors">
              Login
            </button>
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-stone-500 hover:text-stone-800">Return to Website</a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-stone-200">
          <h1 className="text-2xl font-bold text-stone-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <a href="#" className="text-stone-500 hover:text-stone-800 text-sm font-medium">View Site</a>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium text-sm"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
          <div className="flex items-center gap-4 mb-8">
            <Calendar className="text-emerald-600" />
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-lg font-medium bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {loading ? (
            <div className="text-center py-12 text-stone-500">Loading slots...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => (
                <div 
                  key={slot.hour}
                  className={`p-4 rounded-xl border flex justify-between items-center ${
                    slot.isBooked ? 'bg-emerald-50 border-emerald-200' : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-stone-900">{slot.label}</div>
                    <div className="text-sm text-stone-500 mt-1">
                      {slot.isBooked ? (
                        <span className="text-emerald-700 font-medium">Booked {slot.customer_name ? `by ${slot.customer_name}` : ''}</span>
                      ) : 'Available'}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBooking(slot)}
                    className={`p-2 rounded-lg transition-colors ${
                      slot.isBooked 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                    }`}
                    title={slot.isBooked ? "Cancel Booking" : "Mark as Booked"}
                  >
                    {slot.isBooked ? <X size={20} /> : <Check size={20} />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
