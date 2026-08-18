'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Landmark, Award, Calendar, ShieldAlert, History, Users } from 'lucide-react';

export default function CellularJailPage() {
  const timelineEvents = [
    { year: "1896 - 1906", title: "Construction Period", description: "Built by the British colonial government in the remote Andaman Islands to isolate political prisoners from the Indian mainland." },
    { year: "1930s", title: "Major Hunger Strikes", description: "Political prisoners stage historic hunger strikes demanding humane treatment and prisoner-of-war status." },
    { year: "1942 - 1945", title: "Japanese Occupation", description: "Andaman and Nicobar Islands are occupied by Japanese forces during WWII; Netaji Subhas Chandra Bose visits the islands." },
    { year: "1969", title: "Declared National Memorial", description: "The surviving wings and central tower are formally converted into a national memorial dedicated to freedom fighters." },
  ];

  const galleryImages = [
    { title: "Central Watchtower & Wings", url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", alt: "Panoramic view of the multi-winged radial architecture of Cellular Jail from the central watchtower" },
    { title: "Solitary Confinement Cells", url: "https://images.unsplash.com/photo-1621351183012-e2f997fb8dd9?auto=format&fit=crop&q=80&w=800", alt: "Narrow individual cells highlighting the oppressive isolation imposed on freedom fighters" },
    { title: "The Memorial Flame", url: "https://images.unsplash.com/photo-1609137144813-7e94c924147d?auto=format&fit=crop&q=80&w=800", alt: "Eternal flame and remembrance plaques honoring martyrs of the Indian independence movement" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-slate-950">
      {/* Navigation / Back */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Link href="/monuments" className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Monuments
        </Link>
      </div>

      {/* Hero Section */}
      <header className="relative max-w-6xl mx-auto px-6 py-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-400">
          <MapPin className="h-3.5 w-3.5" /> Port Blair, Andaman and Nicobar Islands, India
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Cellular <span className="text-rose-500">Jail</span>
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
          Explore the poignant history of 'Kala Pani'—a colonial prison witness to extraordinary courage, brutal isolation, and the unyielding spirit of India's freedom fighters.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 space-y-16 pb-20">
        {/* Historical Background */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <History className="h-4 w-4" /> Colonial History
            </div>
            <h2 className="text-2xl font-bold text-white">Historical Background</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Following the Revolt of 1857, the British colonial administration needed a remote and inescapable location to exile political dissidents and freedom fighters far away from the Indian mainland. The dense jungles and treacherous seas of the Andaman Islands made escape virtually impossible.
            </p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" /> Exile & Isolation
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Infamously referred to as *Kala Pani* (Black Waters), prisoners suffered severe psychological and physical trauma intended to break their resolve and disconnect them completely from the freedom movement back home.
            </p>
          </div>
        </section>

        {/* Cellular Architecture & Individual Cells */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              Unique Design
            </span>
            <h3 className="text-xl font-bold text-white">Cellular Architecture</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Designed on a radial layout, the original building featured seven wings radiating outward from a central watchtower. This panoptic structure allowed a single guard in the tower to monitor all corridors simultaneously.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Solitary Confinement
            </span>
            <h3 className="text-xl font-bold text-white">Why Individual Cells?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every cell was built strictly for a single occupant (measuring 4.5 by 2.7 meters with a high ventilator). The doors faced the back of the neighboring wing, ensuring prisoners could never see or communicate with one another, enforcing total solitary confinement.
            </p>
          </div>
        </section>

        {/* Freedom Movement & Life in the Jail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-rose-400" /> Freedom Movement Connection
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cellular Jail held legendary freedom fighters and revolutionaries including Vinayak Damodar Savarkar, Batukeshwar Dutt, Diwan Singh Kalepani, and Yogendra Shukla, who turned the prison into a crucible of patriotic resistance.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Landmark className="h-5 w-5 text-rose-400" /> Life in the Jail
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inmates endured brutal daily quotas of manual labor, including extracting coconut oil using heavy hand-mills under scorching heat, alongside meager rations and corporal punishment.
            </p>
          </div>
        </div>

        {/* National Memorial & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-rose-400" /> National Memorial
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Today, the surviving wings stand as a solemn national memorial. The Light and Sound Show held every evening recounts the courageous sacrifices of the freedom fighters who suffered behind its thick brick walls.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-rose-400" /> Historical Timeline
            </h3>
            <div className="space-y-3">
              {timelineEvents.map((item, idx) => (
                <div key={idx} className="border-l-2 border-rose-500 pl-3 space-y-0.5">
                  <span className="text-[10px] font-bold text-rose-400">{item.year}</span>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* High-Quality Image Gallery with Descriptive Alt Text */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Image Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 space-y-2">
                <div className="aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">{img.title}</h4>
                  <p className="text-xs text-slate-400">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
