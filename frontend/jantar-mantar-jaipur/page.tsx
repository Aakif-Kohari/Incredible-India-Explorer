'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Compass, Award, Calendar, Sparkles, Sun, Telescope } from 'lucide-react';

export default function JantarMantarJaipurPage() {
  const instruments = [
    { name: "Samrat Yantra", desc: "The giant sundial standing at 27 meters high, capable of telling local time with an accuracy of two seconds." },
    { name: "Jai Prakash Yantra", desc: "Consists of two hemispherical bowl-like sundials used to map coordinates of celestial bodies and track the sun." },
    { name: "Rama Yantra", desc: "Circular structures with a central pillar used to measure altitude and azimuth of celestial objects." },
    { name: "Disha Yantra", desc: "Determines azimuth and helps locate celestial positions relative to the horizon." },
  ];

  const galleryImages = [
    { title: "The Mighty Samrat Yantra", url: "https://images.unsplash.com/photo-1599661046289-e31898787a56?auto=format&fit=crop&q=80&w=800", caption: "The world's largest stone sundial at Jantar Mantar Jaipur." },
    { title: "Geometric Precision", url: "https://images.unsplash.com/photo-1621351183012-e2f997fb8dd9?auto=format&fit=crop&q=80&w=800", caption: "Architectural alignment of masonry instruments for precise celestial calculation." },
    { title: "Astronomical Structures", url: "https://images.unsplash.com/photo-1609137144813-7e94c924147d?auto=format&fit=crop&q=80&w=800", caption: "Intricate stone scales carved into massive geometric observatories." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation / Back */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Link href="/heritage" className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Heritage Hub
        </Link>
      </div>

      {/* Hero Section */}
      <header className="relative max-w-6xl mx-auto px-6 py-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400">
          <MapPin className="h-3.5 w-3.5" /> Jaipur, Rajasthan, India
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Jantar Mantar <span className="text-amber-500">Jaipur</span>
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
          Discover India's astronomical heritage through a collection of monumental architectural instruments built to track stars, measure time, and study planetary orbits with astonishing precision.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 space-y-16 pb-20">
        {/* History & Sawai Jai Singh II */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Telescope className="h-4 w-4" /> Founder & Visionary
            </div>
            <h2 className="text-2xl font-bold text-white">Maharaja Sawai Jai Singh II</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Constructed in the early 18th century by the Rajput king Maharaja Sawai Jai Singh II—a passionate scholar of mathematics, astronomy, and architecture—Jantar Mantar in Jaipur is the largest and best-preserved of five observatories he built across northern India.
            </p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Purpose of Construction
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The observatories were built to compile astronomical tables and to predict with greater accuracy the times and movements of the sun, moon, and planets against the backdrop of changing political and scientific landscapes.
            </p>
          </div>
        </section>

        {/* Samrat Yantra Focus */}
        <section className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Supreme Instrument
          </span>
          <h2 className="text-2xl font-bold text-white">The Samrat Yantra: The Supreme Sundial</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Standing nearly 27 meters tall, the Samrat Yantra is a colossal equinoctial sundial. Its triangular hypotenuse is angled precisely at 27 degrees (matching Jaipur's latitude). Shadows cast by the sun along its curved quadrants allow visitors and astronomers to read local solar time accurately down to two seconds.
          </p>
        </section>

        {/* Major Astronomical Instruments Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Major Astronomical Instruments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {instruments.map((inst, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
                <h3 className="text-base font-bold text-amber-400">{inst.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{inst.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Science, Architecture & UNESCO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="h-5 w-5 text-amber-400" /> Science and Architecture
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Built primarily out of stone and local marble, each instrument acts as a massive geometric sculpture. Their immovable masonry designs prevent mechanical wear and tear, ensuring long-term precision compared to smaller brass instruments of the era.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" /> UNESCO World Heritage Status
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inscribed as a UNESCO World Heritage site in 2010, Jantar Mantar is recognized as an expression of the astronomical skills and cosmological concepts of the court of a scholarly Mughal-era Rajput prince.
            </p>
          </div>
        </div>

        {/* High-Quality Image Gallery */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Astronomical Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 space-y-2">
                <div className="aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">{img.title}</h4>
                  <p className="text-xs text-slate-400">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
