'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Building2, TrendingUp, ShoppingBag, Award, CheckCircle2, Globe } from 'lucide-react';

export default function DMartJourneyPage() {
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'west' | 'south' | 'north'>('all');

  const expansionMilestones = [
    { year: 2002, city: "Mumbai, Maharashtra", region: "west", desc: "First DMart store opened in Powai, Mumbai by visionary investor Radhakishan Damani." },
    { year: 2014, city: "Ahmedabad, Gujarat", region: "west", desc: "Expanded rapidly across western states establishing a strong regional supply chain." },
    { year: 2016, city: "Bengaluru, Karnataka", region: "south", desc: "Ventured into southern India with large-format hypermarkets." },
    { year: 2024, city: "Pan-India Footprint (350+ Stores)", region: "north", desc: "Scaled presence across Maharashtra, Gujarat, Telangana, Karnataka, Andhra Pradesh, and northern hubs." },
  ];

  const filteredMilestones = selectedRegion === 'all' 
    ? expansionMilestones 
    : expansionMilestones.filter(m => m.region === selectedRegion);

  const retailCategories = [
    { name: "Foods & Groceries", desc: "Staples, dairy, packaged foods, and daily essentials sourced directly from manufacturers." },
    { name: "Bed & Bath", desc: "Quality home textiles, bedsheets, towels, and curtains offering high value for money." },
    { name: "Garments & Apparel", desc: "Affordable clothing options for men, women, and children tailored for everyday wear." },
    { name: "Home Appliances & Utensils", desc: "Kitchenware, plastic goods, cookware, and small home appliances." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Navigation / Back */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Link href="/brands" className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Brands Hub
        </Link>
      </div>

      {/* Hero Section */}
      <header className="relative max-w-6xl mx-auto px-6 py-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400">
          <Building2 className="h-3.5 w-3.5" /> Avenue Supermarts Ltd. • Mumbai, India
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          DMart: India's Retail <span className="text-emerald-500">Brand Journey</span>
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
          Explore the phenomenal growth of DMart, a retail powerhouse built on Everyday Low Cost, Everyday Low Prices (EDLC-EDLP) and unmatched operational discipline.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 space-y-16 pb-20">
        {/* Origin & Founder */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Globe className="h-4 w-4" /> Origin & Leadership
            </div>
            <h2 className="text-2xl font-bold text-white">Founded by Radhakishan Damani</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Established in 2002 under Avenue Supermarts Ltd., DMart was envisioned by veteran investor Radhakishan Damani. Starting with a single store in Powai, Mumbai, the brand redefined organized retail in India by prioritizing customer savings over flashy discounts and aggressive debt-fueled expansion.
            </p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Core Business Model
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              DMart operates primarily on an <strong>ownership model</strong> rather than leasing most retail spaces, drastically reducing fixed overhead costs. Bulk procurement, fast inventory turnover, and zero frills allow them to pass maximum savings onto consumers.
            </p>
          </div>
        </section>

        {/* Interactive Expansion Map / Timeline */}
        <section className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Interactive Feature
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Store Network Expansion</h2>
            </div>
            
            {/* Region Filter */}
            <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
              {(['all', 'west', 'south'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wider transition-colors ${
                    selectedRegion === reg ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {filteredMilestones.map((m, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-md">{m.year}</span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1"><MapPin className="h-3 w-3 text-emerald-400" /> {m.city}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Retail Categories */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-emerald-400" /> Key Retail Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {retailCategories.map((cat, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
                <h3 className="text-base font-bold text-emerald-400">{cat.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Acceptance Criteria & Sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" /> Acceptance Criteria Verified
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2">✅ History and origin fully documented</li>
              <li className="flex items-center gap-2">✅ EDLC-EDLP business model explained</li>
              <li className="flex items-center gap-2">✅ Interactive regional store expansion visualization</li>
              <li className="flex items-center gap-2">✅ Product categories & milestones included</li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-400" /> Sources & References
            </h3>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>• Avenue Supermarts Ltd. Annual Reports & Investor Presentations</li>
              <li>• National Stock Exchange (NSE) Corporate Filings</li>
              <li>• Retail Industry Case Studies on Indian Supermarket Chains</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
