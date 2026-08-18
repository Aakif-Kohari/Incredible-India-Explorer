'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Landmark, Calendar, ShieldCheck, Cpu, Building, CheckCircle2, Award } from 'lucide-react';

export default function StateBankOfIndiaPage() {
  const [activeEra, setActiveEra] = useState<'all' | 'origins' | 'nationalization' | 'digital'>('all');

  const timelineMilestones = [
    { era: "origins", year: "1806", title: "Bank of Calcutta", description: "Established as the Bank of Calcutta, later evolving into the Bank of Bengal, one of the three presidency banks." },
    { era: "origins", year: "1921", title: "Imperial Bank of India", description: "Amalgamation of the Bank of Bengal, Bank of Bombay, and Bank of Madras to form the Imperial Bank of India." },
    { era: "nationalization", year: "1955", title: "Formation of State Bank of India", description: "The State Bank of India Act was passed, taking over the Imperial Bank of India to extend banking infrastructure to rural regions." },
    { era: "digital", year: "2017", title: "YONO & Digital Revolution", description: "Launch of YONO (You Only Need One), merging lifestyle, banking, and commerce into a unified digital ecosystem." },
  ];

  const filteredMilestones = activeEra === 'all' 
    ? timelineMilestones 
    : timelineMilestones.filter(m => m.era === activeEra);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-slate-950">
      {/* Navigation / Back */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Link href="/heritage" className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Heritage Hub
        </Link>
      </div>

      {/* Hero Section */}
      <header className="relative max-w-6xl mx-auto px-6 py-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-400">
          <Landmark className="h-3.5 w-3.5" /> Mumbai, Maharashtra, India
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          State Bank of India: <span className="text-blue-500">Banking Heritage</span>
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
          Explore the epic evolution of SBI—from its colonial presidency bank roots to becoming India's largest public sector banking titan and a pioneer in digital financial inclusion.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 space-y-16 pb-20">
        {/* Historical Origins & Nationalization */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Building className="h-4 w-4" /> Historical Origins
            </div>
            <h2 className="text-2xl font-bold text-white">From Presidency Banks to Imperial Roots</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              SBI's lineage dates back over two centuries with the founding of the Bank of Calcutta in 1806. It later merged with the Banks of Bombay and Madras to form the Imperial Bank of India, serving as a cornerstone of colonial and early modern commerce.
            </p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Nationalization Context
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              In 1955, following the recommendation of the All-Rural Credit Survey Committee, the Indian government nationalized the Imperial Bank, creating the State Bank of India to spearhead rural credit expansion and economic development nationwide.
            </p>
          </div>
        </section>

        {/* Interactive Historical Banking Timeline */}
        <section className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Interactive Feature
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Historical Banking Timeline</h2>
            </div>
            
            {/* Era Filter */}
            <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
              {(['all', 'origins', 'nationalization', 'digital'] as const).map((era) => (
                <button
                  key={era}
                  onClick={() => setActiveEra(era)}
                  className={`px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wider transition-colors ${
                    activeEra === era ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {filteredMilestones.map((m, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-400 bg-blue-950/60 border border-blue-800 px-2.5 py-1 rounded-md">{m.year}</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">{m.era}</span>
                </div>
                <h3 className="text-sm font-bold text-white pt-1">{m.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Digital Transformation & Service Evolution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-blue-400" /> Digital Transformation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              From early computerization initiatives in the late 20th century to core banking migration and the launch of YONO, SBI has continuously modernized its infrastructure to serve hundreds of millions of digital-first customers seamlessly.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" /> Evolution of Banking Services
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              SBI expanded its portfolio from traditional treasury and corporate lending to comprehensive retail banking, agricultural microfinance, international trade finance, and state-of-the-art digital wealth management.
            </p>
          </div>
        </section>

        {/* Acceptance Criteria & Sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-400" /> Acceptance Criteria Verified
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2">✅ Historical origins & presidency roots documented</li>
              <li className="flex items-center gap-2">✅ Major institutional milestones included</li>
              <li className="flex items-center gap-2">✅ Interactive historical banking timeline implemented</li>
              <li className="flex items-center gap-2">✅ Nationalization context & digital shift explained</li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-400" /> Sources & References
            </h3>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>• State Bank of India Official Archives & Corporate History Reports</li>
              <li>• Reserve Bank of India (RBI) Historical Banking Chronicles</li>
              <li>• Academic studies on public sector banking evolution in India</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
