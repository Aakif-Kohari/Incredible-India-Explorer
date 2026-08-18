'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Landmark, Award, Calendar, Sparkles, Compass } from 'lucide-react';

export default function PattadakalPage() {
  const timelineEvents = [
    { year: "7th Century", title: "Early Chalukyan Era", description: "Establishment of regional architectural foundations under early Chalukya rulers in Badami and surrounding valleys." },
    { year: "8th Century", title: "Golden Age of Construction", description: "Queen Lokamahadevi commissions the magnificent Virupaksha Temple to celebrate victory over the Pallavas." },
    { year: "1987", title: "UNESCO World Heritage Status", description: "Recognized globally as a masterpiece of Chalukyan architecture representing a harmonious blend of architectural forms." },
  ];

  const galleryImages = [
    { title: "Virupaksha Temple Facade", url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", caption: "Intricate Dravidian vimana structure of the Virupaksha Temple." },
    { title: "Mallikarjuna Temple", url: "https://images.unsplash.com/photo-1621351183012-e2f997fb8dd9?auto=format&fit=crop&q=80&w=800", caption: "A stellar example of early southern Indian temple design." },
    { title: "Sculptural Reliefs", url: "https://images.unsplash.com/photo-1609137144813-7e94c924147d?auto=format&fit=crop&q=80&w=800", caption: "Detailed stone carvings depicting epic Hindu mythologies." },
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
          <MapPin className="h-3.5 w-3.5" /> Bagalkot District, Karnataka, India
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Group of Monuments at <span className="text-amber-500">Pattadakal</span>
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
          Explore the architectural legacy of the Early Chalukya dynasty—a breathtaking convergence of Northern Nagara and Southern Dravidian temple styles.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 space-y-16 pb-20">
        {/* Chalukya History & Context */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Landmark className="h-4 w-4" /> Historical Background
            </div>
            <h2 className="text-2xl font-bold text-white">The Chalukya Dynasty Legacy</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Pattadakal, meaning 'place of coronation', served as the capital and sacred ceremonial center of the Badami Chalukyas during the 7th and 8th centuries. Kings were crowned here amidst grand architectural patronage, turning the site into an experimental laboratory for Indian temple design.
            </p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Architectural Synthesis
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlike single-style temple clusters, Pattadakal uniquely features side-by-side temples built in both the Northern Indian <strong>Nagara</strong> (rekha-prasada) style and the Southern <strong>Dravidian</strong> (vimana) style, showcasing supreme stone craftsmanship.
            </p>
          </div>
        </section>

        {/* Major Temples: Virupaksha & Mallikarjuna */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Dravidian Masterpiece
            </span>
            <h3 className="text-xl font-bold text-white">Virupaksha Temple</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Commissioned in 740 CE by Queen Lokamahadevi to commemorate her husband Vikramaditya II's victory over the Pallavas. It is the grandest structure at the site, featuring massive pillared halls, intricately carved ceiling panels, and profound Shaivite iconography.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
              Sister Monument
            </span>
            <h3 className="text-xl font-bold text-white">Mallikarjuna Temple</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Built by Queen Trailokyamahadevi around the same period, this smaller yet equally stunning Dravidian temple mirrors the Virupaksha layout with a circular sanctum wall and breathtaking mythological narrative friezes.
            </p>
          </div>
        </section>

        {/* Sculptures and Carvings */}
        <section className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="h-4 w-4" /> Artistry
          </div>
          <h2 className="text-2xl font-bold text-white">Sculptural Traditions & Reliefs</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            The walls of Pattadakal monuments are adorned with deep, dynamic relief sculptures depicting episodes from the Ramayana, Mahabharata, Bhagavata Purana, and various forms of Shiva and Vishnu (such as Nataraja, Trivikrama, and Narasimha), representing the peak of Early Western Chalukya sculptural excellence.
          </p>
        </section>

        {/* UNESCO Heritage & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" /> UNESCO World Heritage Status
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inscribed in 1987, UNESCO designated Pattadakal as a World Heritage site for its sublime representation of eclecticism in architecture and an engineered fusion of northern and southern Indian building traditions.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-400" /> Historical Timeline
            </h3>
            <div className="space-y-3">
              {timelineEvents.map((item, idx) => (
                <div key={idx} className="border-l-2 border-amber-500 pl-3 space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-400">{item.year}</span>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* High-Quality Image Gallery */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Architectural Gallery</h2>
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
