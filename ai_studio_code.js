"use client";
import { useState } from 'react';
import { Sparkles, MapPin, Plus } from 'lucide-react';

export default function Home() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/plan', {
      method: 'POST',
      body: JSON.stringify({ destination: e.target.dest.value, days: e.target.days.value }),
    });
    const data = await res.json();
    setTrip(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 font-sans">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2 italic">
        <Sparkles fill="#2563eb"/> VIAJE IA
      </h1>
      
      {!trip ? (
        <form onSubmit={generate} className="space-y-4 bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-100">
          <input name="dest" placeholder="¿Destino?" className="w-full p-4 border rounded-2xl bg-slate-50" required />
          <input name="days" type="number" placeholder="¿Cuántos días?" className="w-full p-4 border rounded-2xl bg-slate-50" required />
          <button className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold">
            {loading ? "Creando..." : "Planear Viaje"}
          </button>
        </form>
      ) : (
        <div className="space-y-4 pb-20">
          <button onClick={() => setTrip(null)} className="text-blue-600 font-bold mb-4">← Nuevo</button>
          <h2 className="text-3xl font-black">{trip.destination}</h2>
          {trip.itinerary.map(d => (
            <div key={d.day} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-blue-500 font-bold text-xs">DÍA {d.day}</p>
              <h3 className="text-lg font-bold">{d.title}</h3>
              <p className="text-slate-600 text-sm mb-3">{d.activity}</p>
              <a href={`https://www.google.com/maps/search/?api=1&query=${d.location}`} target="_blank" className="text-blue-600 flex items-center gap-1 text-sm font-bold"><MapPin size={14}/> MAPA</a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}